(this["webpackJsonpobs-controller"]=this["webpackJsonpobs-controller"]||[]).push([[0],{22:function(e,t,n){e.exports=n(60)},23:function(e,t,n){},24:function(e,t,n){},25:function(e,t,n){},60:function(e,t,n){"use strict";n.r(t);n(23),n(24),n(25);var a,o,c=n(0),r=n.n(c),s=n(18),u=n.n(s),i=n(5),l=n(20),d=n(21),m=n(1),p=n(2),h=r.a.createContext({}),v=r.a.createContext({}),b={address:"localhost",port:4444,buttons:8,buttonWidth:100},f=function(){var e=localStorage.getItem("setup");return e?JSON.parse(e):b}(),g=function(e,t){switch(t.type){case"setup":return E(Object(m.a)({},t.payload)),Object(m.a)({},e,{},t.payload);case"status":return Object(m.a)({},e,{status:t.payload});case"scenes":return Object(m.a)({},e,{scenes:t.payload});default:throw new Error("Unhandled action type: ".concat(t.type))}},E=function(e){localStorage.setItem("setup",JSON.stringify(e))},w=function(e){var t=e.children,n=r.a.useReducer(g,f),a=Object(p.a)(n,2),o=a[0],c=a[1];return r.a.createElement(h.Provider,{value:o},r.a.createElement(v.Provider,{value:c},t))},y=function(){var e=r.a.useContext(h);if(void 0===e)throw new Error("useObsState must be used within a CountProvider");return e},C=function(e){var t=e.status,n=e.toogleSetup;return r.a.createElement("div",{className:"status-line"},r.a.createElement("div",{style:{flex:1}},"Status: ",t),r.a.createElement("div",{style:{float:"right"}},r.a.createElement("button",{className:"btn-setup",onClick:n},"SETUP")))},S=function(e){var t=e.status,n=e.setupData,a=e.toogleSetup,o=e.handleSetupChange;return r.a.createElement("div",{className:"container"},r.a.createElement(C,{status:t,toogleSetup:a}),r.a.createElement("form",null,r.a.createElement("div",{id:"setupArea"},r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",null,"Hostname"),r.a.createElement("input",{name:"address",value:n.address,onChange:o,type:"text"})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",null,"Port"),r.a.createElement("input",{name:"port",value:n.port,onChange:o,type:"text"})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",null,"Password"),r.a.createElement("input",{name:"password",value:n.password,onChange:o,type:"password",autoComplete:"none"})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",null,"Button width"),r.a.createElement("input",{name:"buttonWidth",value:n.buttonWidth,onChange:o,type:"number",step:15,autoComplete:"none"})),r.a.createElement("div",{className:"formGroup"},r.a.createElement("label",null,"Buttons"),r.a.createElement("div",{style:{display:"block"}},r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:2,onChange:o,name:"buttons",checked:2===n.buttons}),"2"),r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:4,onChange:o,name:"buttons",checked:4===n.buttons}),"4"),r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:6,onChange:o,name:"buttons",checked:6===n.buttons}),"6")),r.a.createElement("div",{style:{display:"block"}},r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:8,onChange:o,name:"buttons",checked:8===n.buttons}),"8"),r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:10,onChange:o,name:"buttons",checked:10===n.buttons}),"10"),r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:12,onChange:o,name:"buttons",checked:12===n.buttons}),"12")),r.a.createElement("div",{style:{display:"block"}},r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:14,onChange:o,name:"buttons",checked:14===n.buttons}),"14"),r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:16,onChange:o,name:"buttons",checked:16===n.buttons}),"16"),r.a.createElement("div",{className:"optButton"},r.a.createElement("input",{type:"radio",value:18,onChange:o,name:"buttons",checked:18===n.buttons}),"18"))))))};!function(e){e[e.None=0]="None",e[e.Preview=1]="Preview",e[e.Program=2]="Program"}(a||(a={})),function(e){e.Connected="Connected",e.Disconnected="Disconnected"}(o||(o={}));var k=n(3),O=n.n(k),N=n(7),j=n(19),P=new(n.n(j).a),W=function(){var e=Object(N.a)(O.a.mark((function e(t){var n,a;return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=[],a=0;case 2:if(!(a<t.length)){e.next=11;break}return e.t0=n,e.next=6,A(t[a]);case 6:e.t1=e.sent,e.t0.push.call(e.t0,e.t1);case 8:a++,e.next=2;break;case 11:return e.abrupt("return",n);case 12:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),A=function(){var e=Object(N.a)(O.a.mark((function e(t){return O.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.name){e.next=2;break}return e.abrupt("return",t);case 2:return e.next=4,P.send("TakeSourceScreenshot",{embedPictureFormat:"png",sourceName:t.name,width:t.thumbnailWidth&&2*t.thumbnailWidth}).then((function(e){return Object(m.a)({},t,{thumbnail:e.img})})).catch((function(e){return console.error(e),t}));case 4:return e.abrupt("return",e.sent);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),x={connect:function(e){var t=e.address,n=void 0===t?"localhost":t,a=e.port,o=void 0===a?4444:a,c=e.password,r=void 0===c?"":c;return P.connect({address:"".concat(n,":").concat(o),password:r})},getScenes:function(){return P.send("GetSceneList")},getPreview:function(){return P.send("GetPreviewScene")},getThumbs:W,on:function(e,t){P&&(P.on("ConnectionOpened",(function(){console.log("event: ConnectionOpened")})),P.on("ConnectionClosed",(function(e){console.log(e),console.log("event: ConnectionClosed")})),P.on("AuthenticationSuccess",(function(){console.log("event: AuthenticationSuccess")})),P.on("AuthenticationFailure",(function(e){console.log(e),console.log("event: AuthenticationFailure")})),P.on("SwitchScenes",(function(n){console.log("event: SwitchScenes"),"SwitchScenes"===e&&t(n)})))},setCurrentScene:function(e){P.send("SetCurrentScene",{"scene-name":e})}},B=function(){var e=Object(c.useState)(),t=Object(p.a)(e,2),n=t[0],o=t[1],s=Object(c.useState)([]),u=Object(p.a)(s,2),h=u[0],b=u[1],f=Object(c.useRef)(!1),g=function(){var e=r.a.useContext(v);if(void 0===e)throw new Error("useObsDispatch must be used within a CountProvider");return e}(),E=y(),w=y(),k=w.address,O=w.port,N=w.password,j=Object(c.useCallback)((function(e){x.getPreview().then((function(t){var n=e.map((function(e){return e.name===t.name?Object(m.a)({},e,{status:a.Preview}):e}));g({type:"scenes",payload:n}),o(n)}))}),[g]),P=Object(c.useCallback)((function(e){x.getThumbs(e).then((function(e){g({type:"scenes",payload:e}),console.log("Thumbs loaded"),j(e)}))}),[g,j]),W=Object(c.useCallback)((function(){x.getScenes().then((function(e){var t=e.scenes,n=Object(d.a)(e,["scenes"])["current-scene"],o=t.map((function(e){return e.name===n?{name:e.name,thumbnailWidth:E.buttonWidth,status:a.Program}:{name:e.name,thumbnailWidth:E.buttonWidth}}));g({type:"scenes",payload:o}),console.log("Scenes loaded"),P(o)}))}),[g,P,E.buttonWidth]),A=Object(c.useCallback)((function(){f.current||(f.current=!0,x.on("SwitchScenes",(function(){W()})))}),[W]);Object(c.useEffect)((function(){return A()}),[A]),Object(c.useEffect)((function(){x.connect({address:k,port:O,password:N}).then((function(){console.log("OBS connected!"),g({type:"status",payload:"Connected"}),W()})).catch((function(e){console.log(e),b([].concat(Object(l.a)(h),["".concat(e.error," Address: ws://").concat(k,":").concat(O)]).filter((function(e,t,n){return n.indexOf(e)===t})))}))}),[k,g,h,N,O,W]);var B=Object(c.useState)(!1),R=Object(p.a)(B,2),T=R[0],G=R[1],I=Object(c.useState)(Object(m.a)({},E)),U=Object(p.a)(I,2),D=U[0],L=U[1],q=function(){T&&g({type:"setup",payload:D}),G(!T)};return T?r.a.createElement(S,{status:E.status,setupData:D,handleSetupChange:function(e){var t=e.target.name,n=e.target.value;"port"===t&&(n=parseInt(n)),"buttons"===t&&(n=parseInt(n)),"buttonWidth"===t&&(n=parseInt(n)),L(Object(m.a)({},D,Object(i.a)({},t,n)))},toogleSetup:q}):r.a.createElement("div",{className:"container",unselectable:"on"},r.a.createElement(C,{status:E.status,toogleSetup:q}),!!h.length&&r.a.createElement("div",{className:"error-message"},h.map((function(e,t){return r.a.createElement("div",{key:t},e)})),r.a.createElement("button",{className:"btn-refresh",type:"button",onClick:function(){return window.location.reload()}},"Clique aqui para ATUALIZAR")),!h.length&&!(null===n||void 0===n?void 0:n.length)&&r.a.createElement("div",{className:"info-message"},r.a.createElement("div",null,"CARREGANDO..."),r.a.createElement("button",{className:"btn-refresh",type:"button",onClick:function(){return window.location.reload()}},"Clique aqui para ATUALIZAR")),r.a.createElement("div",{className:"action-line"},null===n||void 0===n?void 0:n.map((function(e,t){return t<(E.buttons||8)&&r.a.createElement("div",{key:t,className:"action-btn ".concat(e.status===a.Program?"program":e.status===a.Preview?"preview":""),style:{minWidth:E.buttonWidth},onClick:function(){return function(e){e&&x.setCurrentScene(e)}(null===e||void 0===e?void 0:e.name)}},r.a.createElement("div",{className:"action-name"},e.name),r.a.createElement("img",{src:e.thumbnail,width:"70",alt:""}))}))))},R=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function T(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}u.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(w,null,r.a.createElement(B,null))),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");R?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):T(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):T(t,e)}))}}()}},[[22,1,2]]]);
//# sourceMappingURL=main.c0370bdd.chunk.js.map