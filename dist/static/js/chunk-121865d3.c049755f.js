(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-121865d3"],{"752e":function(e,t,r){},"90db":function(e,t,r){"use strict";r("752e")},"99af":function(e,t,r){"use strict";var n=r("23e7"),o=r("d039"),i=r("e8b5"),s=r("861d"),a=r("7b0b"),l=r("50c4"),c=r("8418"),u=r("65f0"),d=r("1dde"),m=r("b622"),g=r("2d00"),f=m("isConcatSpreadable"),p=9007199254740991,h="Maximum allowed index exceeded",w=g>=51||!o((function(){var e=[];return e[f]=!1,e.concat()[0]!==e})),b=d("concat"),v=function(e){if(!s(e))return!1;var t=e[f];return void 0!==t?!!t:i(e)},k=!w||!b;n({target:"Array",proto:!0,forced:k},{concat:function(e){var t,r,n,o,i,s=a(this),d=u(s,0),m=0;for(t=-1,n=arguments.length;t<n;t++)if(i=-1===t?s:arguments[t],v(i)){if(o=l(i.length),m+o>p)throw TypeError(h);for(r=0;r<o;r++,m++)r in i&&c(d,m,i[r])}else{if(m>=p)throw TypeError(h);c(d,m++,i)}return d.length=m,d}})},"9ed6":function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"login-container"},[r("div",{staticClass:"login-box"},[r("div",{staticClass:"login-logo"}),r("div",[r("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{model:e.loginForm,rules:e.loginRules,"hide-required-asterisk":!0,"auto-complete":"on"}},[r("h2",{staticClass:"title"},[e._v(e._s(e.title))]),r("el-form-item",{attrs:{prop:"userName",label:"用户名"}},[r("el-input",{ref:"username",attrs:{placeholder:"请输入用户名"},model:{value:e.loginForm.userName,callback:function(t){e.$set(e.loginForm,"userName",t)},expression:"loginForm.userName"}})],1),r("el-form-item",{attrs:{prop:"password",label:"密码"}},[r("el-input",{ref:"password",attrs:{placeholder:"请输入密码","show-password":""},nativeOn:{keyup:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.handleLogin(t)}},model:{value:e.loginForm.password,callback:function(t){e.$set(e.loginForm,"password",t)},expression:"loginForm.password"}})],1),r("el-button",{staticClass:"login-btn",staticStyle:{"margin-bottom":"30px"},attrs:{loading:e.loading,type:"primary"},nativeOn:{click:function(t){return t.preventDefault(),e.handleLogin(t)}}},[e._v("登录 ")])],1)],1)])])},o=[],i=(r("99af"),r("d3b7"),r("96cf"),r("1da1")),s=r("2909"),a=r("3786"),l={name:"index",data:function(){return{title:"虹桥镇智慧社区大数据平台",loginForm:{userName:"",password:""},loginRules:{userName:[{required:!0,trigger:"blur",message:"请输入用户名"}],password:[{required:!0,trigger:"blur",message:"请输入密码"}]},loading:!1}},methods:{handleLogin:function(){var e=this;this.$refs.loginForm.validate((function(t){if(!t)return!1;e.loading=!0,Object(a["c"])(e.loginForm).then((function(t){e.$store.commit("SET_TOKEN",t.token);var r=[];for(var n in t.customers)r=[].concat(Object(s["a"])(r),Object(s["a"])(t.customers[n]));t.customers=r,t.saveTime=(new Date).getTime(),e.$store.commit("SET_USER_INFO",t),e.$store.commit("SET_CUSTOMER_ID",t.rootGroupId),e.getPermissions(),window.gtag&&(console.log("window.gtag",t),window.gtag("config","G-KE8X8D0BRP",{user_id:t.userName}))})).catch((function(t){e.$message.error("登录失败："+t)})).finally((function(){e.loading=!1}))}))},getPermissions:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("setPermission");case 2:return t.next=4,e.$store.dispatch("setBaseOrgList");case 4:e.$router.push("/");case 5:case"end":return t.stop()}}),t)})))()}}},c=l,u=(r("90db"),r("2877")),d=Object(u["a"])(c,n,o,!1,null,"45b82a78",null);t["default"]=d.exports}}]);
//# sourceMappingURL=chunk-121865d3.c049755f.js.map