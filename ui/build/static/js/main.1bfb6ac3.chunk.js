(this.webpackJsonpthrowback_thursday=this.webpackJsonpthrowback_thursday||[]).push([[0],{29:function(e,t,a){e.exports=a.p+"static/media/logo.9419036f.png"},33:function(e,t,a){e.exports=a(68)},38:function(e,t,a){},39:function(e,t,a){},40:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(0),l=a.n(n),r=a(28),o=a.n(r),c=(a(38),a(9)),u=a(6),i=(a(39),a(29)),m=a.n(i);a(40);function s(){return l.a.createElement("header",null,l.a.createElement(c.b,{to:"/"},l.a.createElement("img",{src:m.a,alt:"throwback thursday logo"})),l.a.createElement("ul",null,l.a.createElement("li",null,l.a.createElement(c.b,{to:"/gallery"},"Gallery")),l.a.createElement("li",null,"Vote"),l.a.createElement("li",null,l.a.createElement(c.b,{to:"/upload"},"Upload"))))}var d=a(11),p=a(12);function g(){var e=Object(p.a)({baseURL:"http://localhost:5000",url:"/allImages",method:"get"}),t=Object(d.a)(e,1)[0],a=t.data,n=t.loading,r=t.error;return n?l.a.createElement("p",null,"Loading..."):r?l.a.createElement("p",null,"Error!"):a?l.a.createElement("div",null,(console.log("data",a),a.map((function(e,t){return l.a.createElement("img",{key:t,src:e})}))),"Thanks for submitting your image! ",JSON.stringify(a)):void 0}function E(){var e=Object(n.useState)(null),t=Object(d.a)(e,2),a=t[0],r=t[1],o=Object(p.a)({url:"/uploadImage",method:"post"},{manual:!0}),c=Object(d.a)(o,2),u=c[0],i=u.data,m=u.loading,s=u.error,g=c[1];return m?l.a.createElement("p",null,"Loading..."):s?l.a.createElement("p",null,"Error!"):i?l.a.createElement("p",null," Thanks for submitting your image!"):l.a.createElement("div",null,l.a.createElement("h1",null,"Upload a picture"),l.a.createElement("form",{"data-testid":"form",onSubmit:function(e){if(e.preventDefault(),a){var t=new FormData;t.append("image",a),g({data:t,headers:{"Content-Type":"multipart/form-data"}}).catch((function(e){console.log("Error Uploading Image: ",e)}))}}},l.a.createElement("input",{"data-testid":"upload-image",onChange:function(e){var t=e.target.files;t&&(null===t||void 0===t?void 0:t.length)>1?console.log("too many images selected"):t&&r(t[0])},type:"file",required:!0}),l.a.createElement("label",null,"Upload your best baby picture"),l.a.createElement("input",{type:"submit",alt:"submit",value:"Submit"})))}var h=function(){return l.a.createElement(c.a,null,l.a.createElement(s,null),l.a.createElement(u.c,null,l.a.createElement(u.a,{path:"/gallery"},l.a.createElement(g,null)),l.a.createElement(u.a,{path:"/upload"},l.a.createElement(E,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(l.a.createElement(h,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[33,1,2]]]);
//# sourceMappingURL=main.1bfb6ac3.chunk.js.map