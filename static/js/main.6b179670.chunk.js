(this["webpackJsonpchangeset-checker-app"]=this["webpackJsonpchangeset-checker-app"]||[]).push([[0],{31:function(e,t,n){},36:function(e,t){},38:function(e,t){},50:function(e,t,n){},52:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n.n(r),c=n(25),a=n.n(c),i=(n(31),n(9)),s=n(26),l=n.n(s),u=(n(50),n(0));function d(){var e,t=Object(r.useState)(""),n=Object(i.a)(t,2),o=n[0],c=n[1],a=Object(r.useState)(""),s=Object(i.a)(a,2),d=s[0],m=s[1],g=Object(r.useState)(null),h=Object(i.a)(g,2),p=h[0],f=h[1],j=function(){var t=e.result;if(!t)return alert("File Upload failed : Check Console For More Info"),void console.log("File Upload failed",{content:t});m(t.toString())};return Object(u.jsxs)("div",{className:"App-header",children:[Object(u.jsx)("h1",{children:"Salesforce Changeset Checker"}),Object(u.jsxs)("form",{onSubmit:function(e){e.preventDefault(),f([]);try{if(!o||!d||0===o.trim().length||0===d.trim().length)return console.log("Search Query or File Content is null",{searchQuery:o,fileContent:d}),void alert("Search Query or File Content is null : Check Console For More Info");var t=l.a.xml2json(d,{compact:!0,spaces:4}),n=JSON.parse(t);console.log("Before Processing: ",{searchQuery:o,parsedJSON:n});var r=n.Package.fullName._text,a=n.Package.types,i=[];i=a.map((function(e){if(e.members._text){var t=[];return t.push(e.members._text),{key:e.name._text,value:t}}return{key:e.name._text,value:e.members.map((function(e){return e._text}))}}));var s=o.split(","),u=(s=s.map((function(e){return e.trim()}))).map((function(e){var t=i.find((function(t){return t.value.find((function(t){return t===e}))}));return{token:e,isFound:void 0!==t,place:void 0===t?"":t.key}}));f(u),c(""),console.log("After Processing: ",{items:i,changeSetName:r,results:u})}catch(m){console.log(m)}},style:{margin:"2rem"},children:[Object(u.jsx)("div",{style:{margin:"0.5rem 0"},children:"Enter comma-separated file names"}),Object(u.jsx)("div",{style:{margin:"0.5rem 0"},children:Object(u.jsx)("textarea",{cols:35,rows:6,value:o,onChange:function(e){return c(e.target.value)}})}),Object(u.jsx)("div",{style:{margin:"0.5rem 0"},children:"Upload package.xml"}),Object(u.jsx)("div",{style:{margin:"0.5rem 0"},children:Object(u.jsx)("input",{type:"file",onChange:function(t){var n;(n=t.target.files)&&((e=new FileReader).onloadend=j,e.readAsText(n[0]))}})}),Object(u.jsx)("div",{style:{margin:"0.5rem 0"},children:Object(u.jsx)("button",{type:"submit",children:"Check"})})]}),p&&p.length>0&&p.map((function(e){return Object(u.jsxs)("div",{className:"App-alert",style:{margin:"0.5rem 0",color:e.isFound?"green":"red",border:"solid 3px",borderColor:e.isFound?"green":"red",backgroundColor:e.isFound?"lightgreen":"pink"},children:[e.isFound&&"".concat(e.token," is present in ").concat(e.place),!e.isFound&&"".concat(e.token," is not present")]},e.token)}))]})}var m=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,53)).then((function(t){var n=t.getCLS,r=t.getFID,o=t.getFCP,c=t.getLCP,a=t.getTTFB;n(e),r(e),o(e),c(e),a(e)}))};a.a.render(Object(u.jsx)(o.a.StrictMode,{children:Object(u.jsx)(d,{})}),document.getElementById("root")),m()}},[[52,1,2]]]);
//# sourceMappingURL=main.6b179670.chunk.js.map