(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{34:function(e,t,n){e.exports=n.p+"static/media/logo.5794a35e.png"},40:function(e,t,n){e.exports=n(91)},45:function(e,t,n){},90:function(e,t,n){},91:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),i=n(9),r=n.n(i),c=(n(45),n(33)),l=n(34),m=n.n(l),s=[{label:"Dashboard",icon:"pi pi-fw pi-shopping-cart",command:function(){window.location="/"}},{label:"API Test",icon:"pi pi-fw pi-cloud",command:function(){window.location="/apitest"}}],u=function(){var e=o.a.createElement("a",{href:"/",style:{margin:"0 7rem 0 0"}},o.a.createElement("img",{alt:"logo",src:m.a,height:"40",className:"p-mr-2"}),o.a.createElement("span",{style:{position:"absolute",top:14,fontSize:"1.5rem",color:"white"}},"MediApp"));return o.a.createElement("div",null,o.a.createElement(c.Menubar,{style:{backgroundColor:"#313131",fontWeight:"bold",border:"none",borderRadius:0},model:s,start:e}))},d=n(17),p=n(13),h=n(14),f=n(21),b=n(15),v=n(16),E=n(35),g=n(36),y=function(e){var t,n=Object(a.useState)(""),i=Object(p.a)(n,2),r=i[0],c=i[1],l=Object(a.useState)([]),m=Object(p.a)(l,2),s=m[0],u=m[1],d=Object(a.useState)(!1),y=Object(p.a)(d,2),x=y[0],w=y[1],j=e.data;return o.a.createElement("div",{style:{marginBottom:"30px"}},o.a.createElement(E.Toast,{style:{maxWidth:"90vw"},ref:function(e){return t=e}}),o.a.createElement(g.Dialog,{header:"Max Prices",visible:x,style:{maxWidth:"90vw",width:"800px"},onHide:function(){return w(!1)}},o.a.createElement(f.DataTable,{value:s},o.a.createElement(b.Column,{field:"name",header:"Name"}),o.a.createElement(b.Column,{field:"cost",header:"Max Price",body:function(e){return o.a.createElement("div",null,"$".concat(e.cost))}}))),o.a.createElement("div",{className:"p-grid",style:{maxWidth:"700px"}},o.a.createElement("div",{className:"p-col-12 p-sm-6 p-md-3"},o.a.createElement(h.InputText,{placeholder:"Enter a name",value:r,onChange:function(e){return c(e.target.value)}})),o.a.createElement("div",{className:"p-col-6 p-sm-3"},o.a.createElement(v.Button,{className:"p-button-rounded",style:{backgroundColor:"#009a6e"},label:"Get Max Price",type:"submit",onClick:function(){j.some((function(e){return e.name.toLowerCase()===r.toLowerCase()}))?fetch("/api/items/maxitemprice/".concat(r)).then((function(e){return e.json()})).then((function(e){return t.show({severity:"info",summary:"Max Price",detail:"$".concat(e," is the maximum price for ").concat(r)})})).catch((function(e){return console.log(e)})):t.show({severity:"error",summary:"Cannot find ".concat(r),detail:0===r.length?"Enter a name.":"No item called ".concat(r," exists in the database. Please try again.")})}})),o.a.createElement("div",{className:"p-col-6 p-sm-3"},o.a.createElement(v.Button,{className:"p-button-rounded",style:{backgroundColor:"#009a6e"},label:"All Max Prices",type:"submit",onClick:function(){fetch("/api/items/maxprices").then((function(e){return e.json()})).then((function(e){u(Object.keys(e).map((function(t){return{name:t,cost:e[t]}}))),w(!0)})).catch((function(e){return console.log(e)}))}}))))},x=n(25),w=n(26),j=function(){var e=Object(a.useState)([]),t=Object(p.a)(e,2),n=t[0],i=t[1],r=Object(a.useState)(""),c=Object(p.a)(r,2),l=c[0],m=c[1],s=Object(a.useState)(0),u=Object(p.a)(s,2),E=u[0],g=u[1],j=Object(a.useState)(!0),C=Object(p.a)(j,2),N=C[0],k=C[1],O=function(){k(!0),fetch("/api/items").then((function(e){return e.json()})).then((function(e){i(e),k(!0)})).catch((function(e){return console.log(e)})).finally((function(){return k(!1)}))};Object(a.useEffect)((function(){O()}),[]);return o.a.createElement("div",{style:{padding:"5vh 5vw 5vh 5vw",margin:0}},o.a.createElement(y,{data:n}),o.a.createElement("form",{className:"p-formgroup-inline",onSubmit:function(e){e.preventDefault(),fetch("/api/items",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:8,name:l,cost:E})}).then((function(e){e.json()})).catch((function(e){return console.log(e)})).finally((function(){O()}))}},o.a.createElement("div",{className:"p-field"},o.a.createElement(h.InputText,{value:l,onChange:function(e){return m(e.target.value)},placeholder:"Enter a name"})),o.a.createElement("div",{className:"p-field"},o.a.createElement(x.InputNumber,{value:E,onChange:function(e){return g(e.value)},mode:"currency",currency:"USD",locale:"en-US"})),o.a.createElement(v.Button,{label:"Add Item",type:"submit"})),N?o.a.createElement(w.ProgressSpinner,{strokeWidth:"2",style:{height:"20vw",width:"20vw",postition:"absolute",left:"35vw",top:"20vh"}}):o.a.createElement(f.DataTable,{value:n,rowHover:!0,style:{maxWidth:"700px",marginBottom:"20vh"}},o.a.createElement(b.Column,{header:"Name",sortable:!0,filter:!0,filterPlaceholder:"Search by name",body:function(e){var t=n.find((function(t){return t._id===e._id}));return o.a.createElement(h.InputText,{value:null===t||void 0===t?void 0:t.name,onChange:function(e){t.name=e.target.value,t.edited=!0,i(Object(d.a)(n))}})},style:{width:"30vw",maxWidth:"300px"}}),o.a.createElement(b.Column,{header:"Cost",sortable:!0,body:function(e){var t=n.find((function(t){return t._id===e._id}));return o.a.createElement(x.InputNumber,{id:"currency-us",value:null===t||void 0===t?void 0:t.cost,onChange:function(e){t.cost=e.value,t.edited=!0,i(Object(d.a)(n))},mode:"currency",currency:"USD",locale:"en-US"})},style:{width:"300px",maxWidth:"30vw"}}),o.a.createElement(b.Column,{header:"",body:function(e){var t=n.find((function(t){return t._id===e._id}));return t.save=function(){t.loading=!0,i(Object(d.a)(n)),fetch("/api/items/".concat(t._id),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.name,cost:t.cost})}).then((function(e){return e.json()})).then((function(){t.loading=!1,t.edited=!1,i(Object(d.a)(n))}))},o.a.createElement("span",null,t.loading?o.a.createElement(w.ProgressSpinner,{strokeWidth:"5",style:{height:"40px",width:"40px",margin:"0 0 -5px 0"}}):o.a.createElement(v.Button,{icon:"pi pi-save",className:"p-button-rounded",disabled:!t.edited,onClick:function(){return t.save()},style:{height:"40px",width:"40px"}}),o.a.createElement(v.Button,{icon:"pi pi-times",className:"p-button-rounded p-button-danger",onClick:function(){i(Object(d.a)(n)),fetch("/api/items/".concat(t._id),{method:"DELETE",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:t.name,cost:t.cost})}).then((function(e){return e.json()})).then((function(){t.edited=!1,i(Object(d.a)(n.filter((function(e){return e._id!==t._id}))))}))},style:{height:"40px",width:"40px",margin:"0 0 0 10px"}}))},style:{width:"200px",maxWidth:"30vw"}})))},C=function(){return o.a.createElement("div",null,o.a.createElement("div",{className:"p-field p-grid",style:{margin:0}},o.a.createElement("label",{htmlFor:"firstname3",className:"p-col-fixed",style:{width:"100px"}},"Firstname"),o.a.createElement("div",{className:"p-col"},o.a.createElement(h.InputText,{style:{width:"100px"},id:"firstname3",type:"text"}))),o.a.createElement("div",{className:"p-field p-grid",style:{margin:0}},o.a.createElement("label",{htmlFor:"lastname3",className:"p-col-fixed",style:{width:"100px"}},"Lastname"),o.a.createElement("div",{className:"p-col"},o.a.createElement(h.InputText,{style:{width:"100px"},id:"lastname3",type:"text"}))))},N=n(37),k=n(5),O=function(){return o.a.createElement("div",null,o.a.createElement(N.a,null,o.a.createElement(k.d,null,o.a.createElement(k.b,{exact:!0,path:"/",render:function(){return o.a.createElement(k.a,{to:"/dashboard"})}}),o.a.createElement(k.b,{path:"/dashboard"},o.a.createElement(j,null)),o.a.createElement(k.b,{path:"/apitest"},o.a.createElement(C,null)))))},S=function(){return o.a.createElement("div",{className:"p-grid",style:{textAlign:"left",backgroundColor:"#6b6b6b",margin:0,padding:"0 5vw 2vh 5vw",fontSize:".9rem",position:"absolute",bottom:0,width:"100vw"}},[{name:"Code Source",link:"https://github.com/zeepk/medikeeper-app"},{name:"Copyright Info",link:"/"},{name:"Contact Us",link:"/"},{name:"Copyright Info",link:"/"},{name:"Contact Us",link:"/"}].map((function(e){return o.a.createElement("div",{key:e,className:"p-md-2 p-col-12"},o.a.createElement("a",{href:e.link,className:"footer-link",style:{color:"white"}},e.name))})),o.a.createElement("div",{className:"p-col"}))};n(86),n(87),n(88),n(89),n(90);var T=function(){return o.a.createElement("div",{className:"App",style:{position:"relative",minHeight:"100vh",backgroundColor:"var(--bg-color)",paddingBottom:"10vh"}},o.a.createElement(u,null),o.a.createElement(O,null),o.a.createElement(S,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(o.a.createElement(o.a.StrictMode,null,o.a.createElement(T,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[40,1,2]]]);
//# sourceMappingURL=main.90e3d761.chunk.js.map