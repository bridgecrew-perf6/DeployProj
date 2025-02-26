const { v4 } = require("uuid")
const stripe = require("stripe")(process.env.stripe_private)
const user = require("../models/userModel")
const { article, order, goods } = require("../models/goodsModel")
const err = require("../errors/err")
const { createHash, compareHash } = require("../service/bcrypt")
const generateToken = require("../service/jwt")
const mailer = require("../service/nodemailer")


class userController {
    async registration(req, res, next) {
        try {
            if (!req.body.email || !req.body.password || !req.body.name) {
                return next(err.badRequest("No password or email entered"))
            }
            const candidate = await user.findOne({ "email": req.body.email }).exec()

            if (candidate) {
                return next(err.badRequest('User with this email already exist'))
            }
            let _password = await createHash(req.body.password)
            const myuser = new user({
                id: v4().toString(),
                name: req.body.name,
                email: req.body.email,
                password: _password,
            })
            await myuser.save()
            const token = generateToken(myuser.id, myuser.email, myuser.name, myuser.role)
            return res.json({ token })
        } catch (error) {
            return res.send(error)
        }

    }

    async login(req, res, next) {
        try {
            if (!req.body.email || !req.body.password) {
                return next(err.badRequest("No password or email entered"))
            }
            const candidate = await user.findOne({ "email": req.body.email }).exec()
            if (!candidate) {
                return next(err.internal('User with this email donesn\'t exist'))
            }
            let passwordCheck = await compareHash(req.body.password, candidate.password)
            if (!passwordCheck) {
                return next(err.internal('Wrong password'))
            }
            const token = generateToken(candidate.id, candidate.email, candidate.name, candidate.role)
            return res.json({ token })
        } catch (error) {
            return res.send(error)
        }
    }

    async setRole(req, res, next) {
        try {
            const { id } = req.params;
            const { role } = req.body;
            const candidate = await user.findOne({ id }).exec();
            if (!candidate) return next(err.badRequest("Cannot set role"));
            candidate.role = role;
            candidate.save();
            res.send("");
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot set role"));
        }
    }

    async deleteUser(req, res, next) {
        try {
            const { id } = req.params;
            const candidate = await user.deleteOne({ id }).exec();
            res.send("");
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot delete user"));
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const users = await user.find({}).exec();
            res.send(users);
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot create article"));
        }
    }

    async createArticle(req, res, next) {
        try {
            const { header, text } = req.body;
            console.log(header, text);
            const candidate = new article({ id: v4().toString(), header, text });
            console.log(candidate)
            if (!candidate) return next(err.badRequest("Cannot create article"));
            await candidate.save();
            res.send(candidate);
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot create article"));
        }
    }

    async deleteArticle(req, res, next) {
        try {
            const id = req.params.id;
            const candidate = await article.deleteOne({ id });
            if (!candidate) return next(err.badRequest("Cannot delete article"));
            res.send(candidate);
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot delete article"));
        }
    }

    async getArticle(req, res, next) {
        try {
            const id = req.params.id;
            const candidate = await article.findOne({ id });
            if (!candidate) return next(err.badRequest("Cannot get article"));
            res.send(candidate);
        } catch (e) {
            console.log(e);
            return next(err.badRequest('Cannot get article'));
        }
    }

    async getArticles(req, res, next) {
        try {
            const articles = await article.find({}).exec();
            res.send(articles);
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot get articles"));
        }
    }

    async editArticle(req, res, next) {
        try {
            const { text, header } = req.body
            const id = req.params.id
            const candidate = await article.updateOne({ id }, { header: header, text: text, time: Date.now() });
            if (!candidate) {
                return next(err.badRequest('Something went wrong'))
            }
            res.send("Successfully edited article")
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot edit article"));
        }
    }
    async createOrder(req, res) {
        try {
            const { userId, basket, price, } = req.body;
            const candidate = await user.findOne({ id: userId }).exec()
            const myorder = new order({
                id: v4().toString(),
                price: price,
            })

            for (let i of basket) {
                myorder.basket.push({
                    id: i.id,
                    count: i.count
                })
            }
            let ordermessage = "";
            let temp
            for (let i of basket) {
                temp = await goods.findOne({ id: i.id }).exec()
                ordermessage += `/${temp.name} ${i.count}шт/     `
            }
            await myorder.save();
            candidate.basket = [];
            candidate.orders.push(myorder.id)
            await candidate.save()
            const message = {
                to: "myshoplevas@gmail.com",
                subject: 'Було здійснено покупку на сайті',
                html: `
                <i>Список товарів:</i>
                <ul>
                    <li>Унікальний код замовлення: ${myorder.id} </li>
                    <li>Ім'я покупця: ${candidate.name} </li>
                    <li>Почта покупця: ${candidate.email} </li>
                    <li>Корзина: ${ordermessage} </li>
                </ul>
                <p>Дане повідомлення не потребує відповіді.<p>`
            }
            mailer(message)
            res.send();

        } catch (e) {
            console.log(e);
        }
    }

    async getOrders(req, res) {
        try {
            const { user } = req;
            const orders = await order.find({ id: { $in: user.orders } }).exec()

            const result = await Promise.all(orders.map(async (orderItem) => {
                let basket = await Promise.all(orderItem.basket.map(async (item) => {
                    const product = await goods.findOne({ id: item.id }).exec();
                    if (product) return { ...product._doc, count: item.count };
                }));
                Promise.all(basket)
                basket = basket.filter(item => item);
                return { ...orderItem._doc, basket }
            }));

            res.send(result);
        } catch (e) {
            console.log(e);
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await order.find({}).exec()
            res.send(orders)
        } catch (e) {
            console.log(e);
        }
    }

    async setOrderState(req, res) {
        try {
            const { id } = req.params;
            const { state } = req.body;
            const candidate = await order.findOne({ id }).exec();
            if (!candidate) return next(err.badRequest("Cannot set state"));
            candidate.state = state;
            candidate.save();
            res.send("");
        } catch (e) {
            console.log(e);
            return next(err.badRequest("Cannot set state"));
        }
    }

}

module.exports = new userController()