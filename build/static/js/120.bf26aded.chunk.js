"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[120],{6120:function(e,r,n){n.r(r),n.d(r,{default:function(){return k}});var a=n(2791),s=n(1413),i=n(4165),l=n(5861),o=n(2966),t=n(6871),d=n(9731),u=n(32),m=n(8735),c=n(3393),p=n(5798),v=n(2504),x=n(456),h=n(776),g=h.Ry().shape({name:h.Z_().required("Enter name").max(16),email:h.Z_().email().required("Email is invalid").max(20),password:h.Z_().required("Password have to be from 6 to 16 characters").min(6).max(16)}),f=n(1265),w=n(9195),I=n(184),j=(0,u.Pi)((function(){var e,r,n,u,h,j,y,Z,k,b=(0,a.useContext)(o._).user,_=(0,t.s0)(),S=(0,w.cI)({resolver:(0,f.X)(g)}),A=S.register,C=S.handleSubmit,N=S.formState.errors,P=function(){var e=(0,l.Z)((0,i.Z)().mark((function e(r){var n,a,s,l,o;return(0,i.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=r.name,a=r.email,s=r.password,e.next=3,d.Z.post("user/registration",{name:n,email:a,password:s});case 3:200===(l=e.sent).status&&(o=(0,x.Z)(l.data.token),b.setUser({id:o.id,name:o.name,email:o.email,role:o.role}),"admin"===b.user.role&&b.setIsAdmin(!0),b.setIsAuth(!0),localStorage.setItem("Token","Bearer "+l.data.token),_("/")),window.location.reload();case 7:case"end":return e.stop()}}),e)})));return function(r){return e.apply(this,arguments)}}();return(0,I.jsxs)(m.xu,{w:"500px",bg:"gray.100",rounded:10,p:"20px",display:"flex",flexDirection:"column",alignItems:"center",children:[(0,I.jsx)(m.X6,{my:"20px",children:"\u0420\u0435\u0454\u0441\u0442\u0440\u0430\u0446\u0456\u044f"}),(0,I.jsxs)(c.NI,{my:"10px",px:"40px",isInvalid:!(null===N||void 0===N||null===(e=N.name)||void 0===e||!e.message),errortext:null===N||void 0===N||null===(r=N.name)||void 0===r?void 0:r.message,children:[(0,I.jsx)(p.II,(0,s.Z)({bg:"gray.100",placeholder:"Name"},A("name"))),(0,I.jsx)(c.J1,{children:null===N||void 0===N||null===(n=N.name)||void 0===n?void 0:n.message})]}),(0,I.jsxs)(c.NI,{my:"10px",px:"40px",isInvalid:!(null===N||void 0===N||null===(u=N.email)||void 0===u||!u.message),errortext:null===N||void 0===N||null===(h=N.email)||void 0===h?void 0:h.message,children:[(0,I.jsx)(p.II,(0,s.Z)({bg:"gray.100",type:"email",placeholder:"Email"},A("email"))),(0,I.jsx)(c.J1,{children:null===N||void 0===N||null===(j=N.email)||void 0===j?void 0:j.message})]}),(0,I.jsxs)(c.NI,{my:"10px",px:"40px",isInvalid:!(null===N||void 0===N||null===(y=N.password)||void 0===y||!y.message),errortext:null===N||void 0===N||null===(Z=N.password)||void 0===Z?void 0:Z.message,children:[(0,I.jsx)(p.II,(0,s.Z)({bg:"gray.100",type:"password",placeholder:"\u041f\u0430\u0440\u043e\u043b\u044c"},A("password"))),(0,I.jsx)(c.J1,{children:null===N||void 0===N||null===(k=N.password)||void 0===k?void 0:k.message})]}),(0,I.jsx)(v.zx,{w:"80%",my:"10px",colorScheme:"teal",onClick:C(P),children:"\u0423\u0432\u0456\u0439\u0442\u0438"})]})})),y=j,Z=n(7503),k=(0,u.Pi)((function(){return(0,I.jsx)("div",{id:Z.Z.wrapper,children:(0,I.jsx)(y,{})})}))},9731:function(e,r,n){var a,s=n(4569),i=n.n(s)().create({baseURL:"https://mydiplomlevas.herokuapp.com/api/",headers:{Authorization:null!==(a=localStorage.getItem("Token"))&&void 0!==a?a:""}});i.interceptors.response.use((function(e){return e}),(function(e){return 401===e.response.status&&localStorage.removeItem("Token"),Promise.reject(e)})),r.Z=i},7503:function(e,r){r.Z={wrapper:"Auth_wrapper__Od48h"}}}]);
//# sourceMappingURL=120.bf26aded.chunk.js.map