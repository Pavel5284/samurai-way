"use strict";(self.webpackChunksamurai_way=self.webpackChunksamurai_way||[]).push([[818],{4818:function(e,r,n){n.r(r),n.d(r,{default:function(){return h}});var t=n(9439);var s=n(5982),u=n(2791),i=n(3923),c=n(4399),a=n(184),o=function(){var e=(0,i.TL)(),r=(0,i.CG)((function(e){return e.chat.status}));return(0,u.useEffect)((function(){return e((0,c.WE)()),function(){e((0,c.R7)())}}),[]),(0,a.jsxs)("div",{children:["error"===r&&(0,a.jsx)("div",{children:"Some error occured. Please refresh page"}),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(l,{}),(0,a.jsx)(f,{})]})]})},l=function(e){!function(e){if(null==e)throw new TypeError("Cannot destructure undefined")}(e);var r=(0,i.CG)((function(e){return e.chat.messages})),n=(0,u.useRef)(null),s=(0,u.useState)(!0),c=(0,t.Z)(s,2),o=c[0],l=c[1];return(0,u.useEffect)((function(){var e;o&&(null===(e=n.current)||void 0===e||e.scrollIntoView({behavior:"smooth"}))}),[r]),(0,a.jsxs)("div",{style:{height:"400px",overflowY:"auto"},onScroll:function(e){var r=e.currentTarget;Math.abs(r.scrollHeight-r.scrollTop-r.clientHeight)<300?!o&&l(!0):o&&l(!1)},children:[r.map((function(e,r){return(0,a.jsx)(d,{message:e},e.id)})),(0,a.jsx)("div",{ref:n})]})},d=u.memo((function(e){var r=e.message;return(0,a.jsxs)("div",{children:[(0,a.jsx)("img",{src:r.photo,style:{width:"30px"},alt:""})," ",(0,a.jsx)("b",{children:r.userName}),(0,a.jsx)("br",{}),r.message,(0,a.jsx)("hr",{})]})})),f=function(){var e=(0,u.useState)(""),r=(0,t.Z)(e,2),n=r[0],o=r[1],l=(0,i.TL)(),d=(0,i.CG)((function(e){return e.chat.status}));return(0,a.jsxs)("div",{children:[(0,a.jsx)("div",{children:(0,a.jsx)("textarea",{onChange:function(e){return o(e.currentTarget.value)},value:n})}),(0,a.jsx)("div",{children:(0,a.jsx)(s.ZP,{disabled:"ready"!==d,onClick:function(){n&&(l((0,c.bG)(n)),o(""))},children:"Send"})})]})},h=function(){return(0,a.jsx)("div",{children:(0,a.jsx)(o,{})})}}}]);
//# sourceMappingURL=818.0d90fe75.chunk.js.map