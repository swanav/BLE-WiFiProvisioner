(this["webpackJsonpble-wifi-provisioner"]=this["webpackJsonpble-wifi-provisioner"]||[]).push([[0],{137:function(e,t,n){e.exports=n(267)},142:function(e,t,n){},145:function(e,t,n){},267:function(e,t,n){"use strict";n.r(t);var r,a=n(0),i=n.n(a),c=n(31),s=n.n(c),o=(n(142),n(6)),u=n.n(o),l=n(17),v=n(18),h=n(36),d=n(37),f=n(20),p=n(38),b=n(32),w=n(268),g=n(281),S=n(279),N=n(276),m=n(282),E=n(278),k=n(277),y=function(){function e(t){Object(l.a)(this,e),this.device=void 0,this.device=t}return Object(v.a)(e,[{key:"init",value:function(){return u.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("====="),e.next=3,u.a.awrap(this.device.initialiseGattServer());case 3:return e.next=5,u.a.awrap(this.device.initialiseServices());case 5:console.log("=====");case 6:case"end":return e.stop()}}),null,this)}},{key:"getScanList",value:function(){var e,t,n,r;return u.a.async((function(a){for(;;)switch(a.prev=a.next){case 0:if(a.prev=0,this.device){a.next=3;break}throw Error("Could not find device");case 3:return a.next=5,u.a.awrap(this.device.initialiseGattServer());case 5:return a.next=7,u.a.awrap(this.device.initialiseServices());case 7:return a.next=9,u.a.awrap(null===(e=this.device.scannerService)||void 0===e?void 0:e.init());case 9:r=null===(t=this.device.scannerService)||void 0===t?void 0:null===(n=t.status)||void 0===n?void 0:n.getStatus(),console.log(r),a.next=16;break;case 13:a.prev=13,a.t0=a.catch(0),console.error(a.t0);case 16:return a.abrupt("return",["Tesesract","Poseidon"]);case 17:case"end":return a.stop()}}),null,this,[[0,13]])}},{key:"setWifiConfig",value:function(e,t){return u.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:case"end":return e.stop()}}))}}]),e}(),O=(n(144),n(145),n(84)),C=n(85),x=function(){function e(t){Object(l.a)(this,e),this._device=void 0,this._server=void 0,this.configurationService=void 0,this.scannerService=void 0,this._device=t}return Object(v.a)(e,[{key:"initialiseGattServer",value:function(){var e;return u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,u.a.awrap(null===(e=this._device.gatt)||void 0===e?void 0:e.connect());case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),null,this)}},{key:"initialiseServices",value:function(){return u.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:if(this._server){e.next=2;break}return e.abrupt("return");case 2:return this.configurationService=new O.a(this._server),this.scannerService=new C.a(this._server),console.log("Device Services initing..."),e.next=7,u.a.awrap(Promise.all([this.configurationService.init(),this.scannerService.init()]));case 7:return console.log("Device Services init"),e.abrupt("return");case 9:case"end":return e.stop()}}),null,this)}}],[{key:"searchDevice",value:function(){return u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return t.t0=e,t.next=3,u.a.awrap(navigator.bluetooth.requestDevice({acceptAllDevices:!0,optionalServices:[6157,O.a.uuid,C.a.uuid]}));case 3:return t.t1=t.sent,t.abrupt("return",new t.t0(t.t1));case 5:case"end":return t.stop()}}))}}]),e}();!function(e){e[e.CONNECT=0]="CONNECT",e[e.SCAN_LIST=1]="SCAN_LIST",e[e.PASSWORD_INPUT=2]="PASSWORD_INPUT",e[e.CONFIGURED=3]="CONFIGURED"}(r||(r={}));var I=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(h.a)(this,Object(d.a)(t).call(this,e))).provisioner=void 0,n.state={deviceName:void 0,networkList:[],ssid:void 0,page:r.CONNECT,connected:!1,password:void 0,provisioner:void 0,loading:!1},n.scanDevice=n.scanDevice.bind(Object(f.a)(n)),n.collectPassword=n.collectPassword.bind(Object(f.a)(n)),n.updatePassword=n.updatePassword.bind(Object(f.a)(n)),n.handleBackButton=n.handleBackButton.bind(Object(f.a)(n)),n.setLoading=n.setLoading.bind(Object(f.a)(n)),n}return Object(p.a)(t,e),Object(v.a)(t,[{key:"scanDevice",value:function(e){var t,n;return u.a.async((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,this.setLoading(!0),e.t0=y,e.next=5,u.a.awrap(x.searchDevice());case 5:return e.t1=e.sent,t=new e.t0(e.t1),this.setLoading(!1),console.log("Provisioner",t),this.setState({provisioner:t}),this.setLoading(!0),e.next=13,u.a.awrap(t.getScanList());case 13:(n=e.sent)&&this.setState({networkList:n,page:r.SCAN_LIST}),this.setLoading(!1),e.next=21;break;case 18:e.prev=18,e.t2=e.catch(0),console.error("ERROR",e.t2);case 21:case"end":return e.stop()}}),null,this,[[0,18]])}},{key:"collectPassword",value:function(e){return u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("collectPassword"),this.setLoading(!0),this.setState({ssid:e,page:r.PASSWORD_INPUT}),this.setLoading(!1);case 4:case"end":return t.stop()}}),null,this)}},{key:"updatePassword",value:function(e,t){console.log("updatePassword",t.value),this.setState({password:t.value})}},{key:"setLoading",value:function(e){this.setState({loading:e})}},{key:"configureNetwork",value:function(e){return u.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:console.log("configureNetwork"),this.setLoading(!0),this.setState({password:e,page:r.CONFIGURED}),this.setLoading(!1);case 4:case"end":return t.stop()}}),null,this)}},{key:"handleBackButton",value:function(){var e=this.state.page;if(e!==r.CONNECT){var t=e-1;this.setState({page:t})}}},{key:"render",value:function(){var e=this,t=this.state,n=t.deviceName,a=t.page,c=t.loading,s=t.networkList,o=t.ssid,u=t.password;return i.a.createElement("div",{className:"App"},a===r.CONNECT?i.a.createElement("header",{className:"App-header"},i.a.createElement(b.a,{name:"wifi",className:"App-logo",alt:"logo",size:"huge"}),i.a.createElement("p",null,"Pair with a HIFE Hub to get started."),i.a.createElement(w.a,{onClick:this.scanDevice},"Scan")):"",a===r.SCAN_LIST?i.a.createElement(g.a,{inverted:!0,className:"App scan_list"},i.a.createElement(S.a,{active:c},i.a.createElement(N.a,null,"Connecting to ",null!==n&&void 0!==n?n:"Smart Hub")),i.a.createElement(b.a,{name:"arrow circle left",onClick:this.handleBackButton,color:"yellow",size:"large"}),i.a.createElement(m.a,null,null!==n&&void 0!==n?n:"Havells"),i.a.createElement(E.a,{inverted:!0},i.a.createElement(E.a.Body,null,s.map((function(t,n){return i.a.createElement(E.a.Row,{key:n},i.a.createElement(E.a.Cell,{onClick:function(){e.collectPassword(t)}},t))}))))):"",a===r.PASSWORD_INPUT?i.a.createElement(g.a,{inverted:!0,className:"App password_input"},i.a.createElement(b.a,{name:"arrow circle left",onClick:this.handleBackButton,color:"yellow"}),i.a.createElement(b.a,{name:"wifi",size:"huge",color:"blue"}),i.a.createElement(m.a,{size:"medium"},o),i.a.createElement(k.a,{placeholder:"Password",size:"large",onChange:this.updatePassword}),i.a.createElement(w.a,{onClick:function(){e.configureNetwork(u)}},"Connect")):"",a===r.CONFIGURED?i.a.createElement(g.a,{inverted:!0,className:"App configured"},i.a.createElement(S.a,{active:c},i.a.createElement(N.a,null,"Connecting ",null!==n&&void 0!==n?n:"Smart Hub"," to ",null!==o&&void 0!==o?o:"Smart Hub")),i.a.createElement(b.a,{name:"arrow circle left",onClick:this.handleBackButton,color:"yellow"}),i.a.createElement(b.a,{name:"check circle",size:"massive",color:"green"}),i.a.createElement("div",null,"Your Smart Hub has been connected to WiFi successfully")):"")}}]),t}(i.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},84:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return o}));var r,a=n(6),i=n.n(a),c=n(17),s=n(18),o=function(){function e(t){Object(c.a)(this,e),this.server=void 0,this.service=null,this.server=t}return Object(s.a)(e,[{key:"init",value:function(){var t=this;return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,i.a.awrap(this.server.getPrimaryService(e.uuid).then((function(e){return t.service=e})));case 2:return n.abrupt("return",n.sent);case 3:case"end":return n.stop()}}),null,this)}},{key:"initialiseCharacteristics",value:function(){this.service?new u(this.service):console.error("No Service found")}}]),e}();o.uuid="2b42180d-0000-1000-9900-00805f9b5ab3",function(e){e[e.IDLE=0]="IDLE",e[e.SAVE=1]="SAVE",e[e.SAVING=2]="SAVING",e[e.SAVED=3]="SAVED",e[e.JOIN=4]="JOIN",e[e.JOINING=5]="JOINING",e[e.JOINED=6]="JOINED",e[e.ERROR=7]="ERROR"}(r||(r={}));var u=function(){function t(e){var n=this;Object(c.a)(this,t),this.characteristic=null,e.getCharacteristic(t.uuid).then((function(e){n.characteristic=e,n.characteristic.addEventListener("characteristicvaluechanged",(function(e){}))}))}return Object(s.a)(t,[{key:"getStatus",value:function(){var e;return i.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.characteristic){t.next=3;break}return console.error("No Characteristic found"),t.abrupt("return");case 3:return t.next=5,i.a.awrap(this.characteristic.readValue());case 5:if(!((e=t.sent).buffer.byteLength<1||e.buffer.byteLength>1)){t.next=8;break}return t.abrupt("return",r[e.getInt8(0)]);case 8:return t.abrupt("return",r.ERROR);case 9:case"end":return t.stop()}}),null,this)}},{key:"setStatus",value:function(t){return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(this.characteristic){n.next=3;break}return console.error("No Characteristic found"),n.abrupt("return");case 3:if(t===r.SAVE||t===r.JOIN){n.next=5;break}return n.abrupt("return");case 5:return n.next=7,i.a.awrap(this.characteristic.writeValue(e.from([t])));case 7:return n.abrupt("return",n.sent);case 8:case"end":return n.stop()}}),null,this)}}]),t}();u.uuid="0000180d-0000-1000-9901-00805f9b34fb"}).call(this,n(92).Buffer)},85:function(e,t,n){"use strict";(function(e){n.d(t,"a",(function(){return o}));var r,a=n(6),i=n.n(a),c=n(17),s=n(18),o=function(){function e(t){Object(c.a)(this,e),this.service=null,this.server=void 0,this.status=null,this.server=t}return Object(s.a)(e,[{key:"init",value:function(){return i.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:return console.log("init"),t.prev=1,t.next=4,i.a.awrap(this.server.getPrimaryService(e.uuid));case 4:this.service=t.sent,console.log("WifiScannerService",this.service,"isAvailable"),t.next=11;break;case 8:t.prev=8,t.t0=t.catch(1),console.error(t.t0);case 11:return t.abrupt("return");case 12:case"end":return t.stop()}}),null,this,[[1,8]])}},{key:"initialiseCharacteristics",value:function(){this.service?this.status=new u(this.service):console.error("No Service found")}}]),e}();o.uuid="2b42180d-0000-1000-7700-00805f9b5ab3",function(e){e[e.IDLE=0]="IDLE",e[e.SCAN=1]="SCAN",e[e.SCANNING=2]="SCANNING",e[e.SCANNED=3]="SCANNED",e[e.ERROR=4]="ERROR"}(r||(r={}));var u=function(){function t(e){var n=this;Object(c.a)(this,t),this.characteristic=null,e.getCharacteristic(t.uuid).then((function(e){n.characteristic=e,n.characteristic.addEventListener("characteristicvaluechanged",(function(e){}))}))}return Object(s.a)(t,[{key:"getStatus",value:function(){var e;return i.a.async((function(t){for(;;)switch(t.prev=t.next){case 0:if(this.characteristic){t.next=3;break}return console.error("No Characteristic found"),t.abrupt("return");case 3:return t.next=5,i.a.awrap(this.characteristic.readValue());case 5:if(!((e=t.sent).buffer.byteLength<1||e.buffer.byteLength>1)){t.next=8;break}return t.abrupt("return",r[e.getInt8(0)]);case 8:return t.abrupt("return",r.ERROR);case 9:case"end":return t.stop()}}),null,this)}},{key:"setStatus",value:function(t){return i.a.async((function(n){for(;;)switch(n.prev=n.next){case 0:if(this.characteristic){n.next=3;break}return console.error("No Characteristic found"),n.abrupt("return");case 3:if(t===r.SCAN){n.next=5;break}return n.abrupt("return");case 5:return n.next=7,i.a.awrap(this.characteristic.writeValue(e.from([t])));case 7:return n.abrupt("return",n.sent);case 8:case"end":return n.stop()}}),null,this)}}]),t}();u.uuid="2b42180d-0000-1000-7701-00805f9b5ab3"}).call(this,n(92).Buffer)}},[[137,1,2]]]);
//# sourceMappingURL=main.3a44dcf4.chunk.js.map