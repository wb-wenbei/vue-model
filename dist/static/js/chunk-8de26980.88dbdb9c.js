(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8de26980"],{"13d5":function(e,t,r){"use strict";var n=r("23e7"),i=r("d58f").left,a=r("a640"),o=r("ae40"),s=a("reduce"),c=o("reduce",{1:0});n({target:"Array",proto:!0,forced:!s||!c},{reduce:function(e){return i(this,e,arguments.length,arguments.length>1?arguments[1]:void 0)}})},"1c1c":function(e,t,r){},"1f08":function(e,t,r){"use strict";r("1c1c")},"46e5":function(e,t,r){},"521c":function(e,t,r){"use strict";r("b545")},6208:function(e,t,r){"use strict";var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"table-search"},[r("div",{directives:[{name:"resize",rawName:"v-resize",value:e.formResize,expression:"formResize"}],ref:"search-form",staticClass:"search-form"},[r("div",{ref:"form-box"},[e._t("default",[r("el-form",{ref:"form",attrs:{model:e.form,inline:!0,"label-width":e.labelWidth}},[e._l(e.columns,(function(t,n){return r("el-form-item",{key:n,attrs:{label:t.label,"label-width":t.labelWidth}},["org"===t.type?r("form-organize",{model:{value:e.form[t.prop],callback:function(r){e.$set(e.form,t.prop,r)},expression:"form[column.prop]"}}):"input"===t.type?r("el-input",e._b({staticClass:"short-width",model:{value:e.form[t.prop],callback:function(r){e.$set(e.form,t.prop,r)},expression:"form[column.prop]"}},"el-input",t.props,!1)):"select"===t.type?r("form-select",e._b({staticClass:"search-select-item",attrs:{options:t.options},model:{value:e.form[t.prop],callback:function(r){e.$set(e.form,t.prop,r)},expression:"form[column.prop]"}},"form-select",t.props,!1)):"date"===t.type||"dateRange"===t.type?r("el-date-picker",e._b({style:{width:"date"===t.type?"215px":""},model:{value:e.form[t.prop],callback:function(r){e.$set(e.form,t.prop,r)},expression:"form[column.prop]"}},"el-date-picker",t.props,!1)):e._t(t.prop,null,{form:e.form})],2)})),e._t("default")],2)])],2)]),r("div",{staticClass:"search-btn"},[e._t("search-btn",[r("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查 询")]),e.resettable?r("el-button",{on:{click:e.reset}},[e._v("重 置")]):e._e()]),e.showOpen?[!1===e.open?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.open=!0}}},[e._v(" 展开 "),r("i",{staticClass:"el-icon-arrow-down"})]):e._e(),!0===e.open?r("el-button",{attrs:{type:"text"},on:{click:function(t){e.open=!1}}},[e._v(" 收起 "),r("i",{staticClass:"el-icon-arrow-up"})]):e._e()]:e._e()],2)])},i=[],a=(r("4160"),r("159b"),r("2422")),o=r("8604"),s={input:{placeholder:"请输入"},select:{placeholder:"请选择",clearable:!0},date:{placeholder:"选择日期",valueFormat:"timestamp",type:"date"},dateRange:{placeholder:"选择日期",valueFormat:"timestamp",type:"daterange",rangeSeparator:"至",startPlaceholder:"开始日期",endPlaceholder:"结束日期"}},c={name:"tableSearch",components:{FormSelect:a["a"],FormOrganize:o["a"]},props:{value:{},columns:{type:Array},resettable:{type:Boolean,default:!1},labelWidth:{type:String,default:"80px"}},directives:{resize:{bind:function(e,t){var r="",n="";function i(){var i=document.defaultView.getComputedStyle(e);r===i.width&&n===i.height||t.value(),r=i.width,n=i.height}e.__vueSetInterval__=setInterval(i,100)},unbind:function(e){clearInterval(e.__vueSetInterval__)}}},data:function(){return{defaultForm:{},form:{},showOpen:!1,open:!1}},watch:{value:{deep:!0,handler:function(e){this.form=Object.assign(this.form,e)}},columns:{deep:!0,handler:function(){this.resetForm()}},form:{deep:!0,handler:function(){this.$emit("input",this.form)}},open:function(){this.setHeight()}},created:function(){this.resetForm(),this.defaultForm=Object.assign({},this.form)},mounted:function(){this.$emit("input",this.form)},methods:{resetForm:function(){var e={};this.columns&&this.columns.length&&this.columns.forEach((function(t){t.props||(t.props={}),s[t.type]||(s[t.type]={}),t.props=Object.assign(t.props,s[t.type]),e[t.prop]=""})),this.form=Object.assign(e,this.value)},formResize:function(){this.$refs["form-box"]&&this.$refs["form-box"].clientHeight>60?(this.showOpen=!0,this.setHeight()):this.showOpen=!1},setHeight:function(){this.$refs["search-form"].style.height=this.open?this.$refs["form-box"].clientHeight+"px":"40px"},reset:function(){this.form=Object.assign({},this.defaultForm),this.$emit("reset",this.form)},search:function(){this.$emit("search",this.form)}}},l=c,u=(r("c41a"),r("2877")),p=Object(u["a"])(l,n,i,!1,null,"c04e5e04",null);t["a"]=p.exports},a15b:function(e,t,r){"use strict";var n=r("23e7"),i=r("44ad"),a=r("fc6a"),o=r("a640"),s=[].join,c=i!=Object,l=o("join",",");n({target:"Array",proto:!0,forced:c||!l},{join:function(e){return s.call(a(this),void 0===e?",":e)}})},af68:function(e,t,r){},b40c:function(e,t,r){"use strict";r.r(t);var n=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"tabs-box"},[r("common-table",{ref:"table",attrs:{headers:e.headers,api:e.pageAPI,params:e.params,columns:e.columns,deleteApi:e.deleteAPI,settings:["setting"]},on:{editRow:e.editRow,add:e.add},scopedSlots:e._u([{key:"table-header",fn:function(){return[r("table-search",{attrs:{resettable:"",columns:e.searchColumns},on:{search:e.search},model:{value:e.params,callback:function(t){e.params=t},expression:"params"}})]},proxy:!0}])}),e.visibleDialog?r("edit-dialog",{attrs:{visibleDialog:e.visibleDialog,title:e.title,columns:e.columns,loading:e.loading,form:e.form},on:{"update:visibleDialog":function(t){e.visibleDialog=t},"update:visible-dialog":function(t){e.visibleDialog=t},save:e.submit},scopedSlots:e._u([{key:"communityAddress",fn:function(t){var n=t.form;return[r("address-select",{model:{value:n.communityAddress,callback:function(t){e.$set(n,"communityAddress",t)},expression:"form.communityAddress"}})]}},{key:"propertyFee",fn:function(t){var n=t.form;return[r("property-select",{model:{value:n.propertyFee,callback:function(t){e.$set(n,"propertyFee",t)},expression:"form.propertyFee"}})]}},{key:"buildingYear",fn:function(t){var n=t.form;return[r("year-select",{model:{value:n.buildingYear,callback:function(t){e.$set(n,"buildingYear",t)},expression:"form.buildingYear"}})]}}],null,!1,3730262761)}):e._e()],1)},i=[],a=(r("99af"),r("4160"),r("d3b7"),r("159b"),r("3835")),o=(r("96cf"),r("1da1")),s=r("1892"),c=r("ddde"),l=r("6208"),u=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"select-list"},e._l(e.currentValue,(function(t,n){return r("div",{key:n},[r("el-input",{staticClass:"short-width item",attrs:{placeholder:"请输入物业标准"},model:{value:t.standard,callback:function(r){e.$set(t,"standard",r)},expression:"item.standard"}}),r("el-input",{staticClass:"short-width item",attrs:{type:"number",placeholder:"请输入物业费"},model:{value:t.amount,callback:function(r){e.$set(t,"amount",r)},expression:"item.amount"}},[r("template",{slot:"append"},[e._v("元/m²")])],2),e.currentValue.length>1?r("el-button",{staticClass:"item",attrs:{type:"danger",icon:"el-icon-close",circle:""},on:{click:function(t){return e.deleteItem(n)}}}):e._e(),n===e.currentValue.length-1?r("el-button",{staticClass:"item",attrs:{type:"primary",icon:"el-icon-plus",circle:""},on:{click:e.addItem}}):e._e()],1)})),0)},p=[],d=(r("a434"),{name:"address-select",props:{value:{}},data:function(){return{currentValue:[]}},watch:{value:{immediate:!0,deep:!0,handler:function(){this.loadData()}},currentValue:{immediate:!0,deep:!0,handler:function(e){this.$emit("input",e)}}},methods:{loadData:function(){this.currentValue=this.value||[{standard:"",amount:""}]},addItem:function(){this.currentValue.push({standard:"标准"+(this.currentValue.length+1),amount:""})},deleteItem:function(e){this.currentValue.splice(e,1)}}}),m=d,f=(r("1f08"),r("2877")),h=Object(f["a"])(m,u,p,!1,null,"40d1ff22",null),b=h.exports,y=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"select-list"},e._l(e.currentValue,(function(t,n){return r("div",{key:n},[r("div",{staticClass:"item"},[e._v(e._s(t.province))]),r("div",{staticClass:"item"},[e._v(e._s(t.city))]),r("div",{staticClass:"item"},[e._v(e._s(t.district))]),r("el-input",{staticClass:"short-width item",attrs:{placeholder:"示例：虹中路780弄3-20号"},model:{value:t.address,callback:function(r){e.$set(t,"address",r)},expression:"item.address"}}),e.currentValue.length>1?r("el-button",{staticClass:"item",attrs:{type:"danger",icon:"el-icon-close",circle:""},on:{click:function(t){return e.deleteItem(n)}}}):e._e(),n===e.currentValue.length-1?r("el-button",{staticClass:"item",attrs:{type:"primary",icon:"el-icon-plus",circle:""},on:{click:e.addItem}}):e._e()],1)})),0)},g=[],v={name:"property-select",props:{value:{}},data:function(){return{currentValue:[]}},watch:{value:{immediate:!0,deep:!0,handler:function(){this.loadData()}},currentValue:{immediate:!0,deep:!0,handler:function(e){this.$emit("input",e)}}},methods:{loadData:function(){this.currentValue=this.value||[{province:"上海市",city:"上海市",district:"闵行区"}]},addItem:function(){this.currentValue.push({province:"上海市",city:"上海市",district:"闵行区"})},deleteItem:function(e){this.currentValue.splice(e,1)}}},_=v,w=(r("d997"),Object(f["a"])(_,y,g,!1,null,"8d366f40",null)),C=w.exports,O=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"select-list"},e._l(e.currentValue,(function(t,n){return r("div",{key:n},[r("el-input",{staticClass:"short-width item",attrs:{placeholder:"请输入建成年份"},model:{value:t.year,callback:function(r){e.$set(t,"year",r)},expression:"item.year"}},[r("template",{slot:"append"},[e._v("年")])],2),e.currentValue.length>1?r("el-button",{staticClass:"item",attrs:{type:"danger",icon:"el-icon-close",circle:""},on:{click:function(t){return e.deleteItem(n)}}}):e._e(),n===e.currentValue.length-1?r("el-button",{staticClass:"item",attrs:{type:"primary",icon:"el-icon-plus",circle:""},on:{click:e.addItem}}):e._e()],1)})),0)},k=[],x={name:"year-select",props:{value:{}},data:function(){return{currentValue:[]}},watch:{value:{immediate:!0,deep:!0,handler:function(){this.loadData()}},currentValue:{immediate:!0,deep:!0,handler:function(e){this.$emit("input",e)}}},methods:{loadData:function(){this.currentValue=this.value||[{year:""}]},addItem:function(){this.currentValue.push({year:""})},deleteItem:function(e){this.currentValue.splice(e,1)}}},$=x,j=(r("521c"),Object(f["a"])($,O,k,!1,null,"37d17c25",null)),E=j.exports,I=r("ed08"),V=r("e419"),T={name:"Community",components:{CommonTable:s["a"],EditDialog:c["a"],TableSearch:l["a"],PropertySelect:b,AddressSelect:C,YearSelect:E},data:function(){return{pageAPI:V["d"],deleteAPI:V["b"],activeName:"community",visibleDialog:!1,loading:!1,type:"add",title:"新增社区",community:[],totalMenus:[],matchMenu:[],params:{},searchColumns:[{prop:"communityName",label:"社区名称",type:"input"},{prop:"orgId",label:"归属物业",type:"org"},{prop:"communityLevel",label:"社区等级",type:"select",options:[]},{prop:"communityType",label:"社区类型",type:"select",options:[]}],headers:[{prop:"index",label:"序号"},{prop:"communityName",label:"社区名称"},{prop:"orgName",label:"归属物业"},{prop:"communityTypeName",label:"社区类型"},{prop:"communityLevelName",label:"社区等级"},{prop:"buildingArea",label:"建筑面积"},{prop:"buildingYear",label:"建成年份",filter:this.getYear},{prop:"householdsNumber",label:"人口户数"},{prop:"updateTime",label:"更新时间",type:"date"},{prop:"action",label:"操作",width:100,fixed:"right"}],columns:[{prop:"basicInfo",label:"基础信息",type:"title"},{prop:"communityName",label:"社区名称",type:"text",required:!0},{prop:"communityTypeId",label:"社区类型",type:"select",required:!0,options:[]},{prop:"communityLevelId",label:"社区等级",type:"select",required:!0,options:[]},{prop:"orgId",label:"归属物业",type:"org",required:!0},{prop:"projectNatureId",label:"项目性质",type:"select",required:!0,options:[]},{prop:"communityAddress",label:"社区地址",required:!0,cols:4},{prop:"lngLat",label:"社区位置",type:"address",required:!0,cols:2},{prop:"assessInfo",label:"评估信息",type:"title"},{prop:"buildingArea",label:"建筑面积",type:"num",required:!0},{prop:"peopleEngagedNumber",label:"从业人数",type:"num",required:!0},{prop:"householdsNumber",label:"人口户数",type:"num",required:!0},{prop:"buildingYear",label:"建成年份",required:!0,cols:4},{prop:"propertyFee",label:"物业费",required:!0,cols:4},{prop:"isSpecCommunityFacilities",label:"安全屋",type:"radio",required:!0,options:[{id:1,name:"是"},{id:0,name:"否"}]}],form:{}}},created:function(){this.getOptions()},methods:{getOptions:function(){this.getLevels(),this.getTypes(),this.getNatures()},getLevels:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(I["c"])("COMMUNITY_LEVEL");case 2:r=t.sent,e.searchColumns[2].options=r,e.columns[3].options=r;case 5:case"end":return t.stop()}}),t)})))()},getTypes:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(I["c"])("COMMUNITY_TYPE");case 2:r=t.sent,e.searchColumns[3].options=r,e.columns[2].options=r;case 5:case"end":return t.stop()}}),t)})))()},getNatures:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(I["c"])("PROJECT_NATURE");case 2:r=t.sent,e.columns[5].options=r;case 4:case"end":return t.stop()}}),t)})))()},search:function(){this.$refs.table.onQuery()},editRow:function(e){this.type="edit",this.title="编辑社区",this.form=e,e.lng&&e.lat&&(this.form.lngLat=[e.lng,e.lat]),console.log(this.form),this.visibleDialog=!0},add:function(){this.type="add",this.title="新增社区",this.form={isSpecCommunityFacilities:0,propertyFee:[{standard:"标准1"}]},this.visibleDialog=!0},submit:function(e){var t=this,r=Object.assign({},e);if(this.checkForm(r)){var n="add"===this.type?V["a"]:V["e"];this.loading=!0,n(r).then((function(){t.$message.success("".concat(t.title,"成功！")),t.visibleDialog=!1,t.$refs.table.refresh()})).catch((function(e){t.$message.error("".concat(t.title,"失败：").concat(e))})).finally((function(){t.loading=!1}))}},getYear:function(e){var t="--";if(e&&e.length)if(1===e.length)t=e[0].year;else{var r=e[0].year,n=e[0].year;e.forEach((function(e){r=Math.min(e.year,r),n=Math.max(e.year,n)})),t=r+" - "+n}return t},checkForm:function(e){if(!e.communityAddress||!e.communityAddress.length)return this.$message.error("请填写社区地址！"),!1;var t=!1;if(e.communityAddress.forEach((function(e){e.address&&(t=!0)})),t||this.$message.error("请填写社区地址！"),!e.propertyFee||!e.propertyFee.length)return this.$message.error("请至少完整填写一项物业费！"),!1;var r=!1;if(e.propertyFee.forEach((function(e){e.amount&&e.standard&&(r=!0)})),!r)return this.$message.error("请至少完整填写一项物业费！"),!1;if(!e.buildingYear||!e.buildingYear.length)return this.$message.error("请至少完整填写一项建成年份！"),!1;var n=!1;if(e.buildingYear.forEach((function(e){e.year&&(n=!0)})),!n)return this.$message.error("请至少完整填写一项建成年份！"),!1;if(!e.lngLat||!e.lngLat.length)return this.$message.error("请选择社区位置！"),!1;if(!e.lngLat[0]||!e.lngLat[1])return this.$message.error("请选择社区位置！"),!1;var i=Object(a["a"])(e.lngLat,2);return e.lng=i[0],e.lat=i[1],!0}}},A=T,R=Object(f["a"])(A,n,i,!1,null,null,null);t["default"]=R.exports},b545:function(e,t,r){},b64b:function(e,t,r){var n=r("23e7"),i=r("7b0b"),a=r("df75"),o=r("d039"),s=o((function(){a(1)}));n({target:"Object",stat:!0,forced:s},{keys:function(e){return a(i(e))}})},c41a:function(e,t,r){"use strict";r("af68")},d58f:function(e,t,r){var n=r("1c0b"),i=r("7b0b"),a=r("44ad"),o=r("50c4"),s=function(e){return function(t,r,s,c){n(r);var l=i(t),u=a(l),p=o(l.length),d=e?p-1:0,m=e?-1:1;if(s<2)while(1){if(d in u){c=u[d],d+=m;break}if(d+=m,e?d<0:p<=d)throw TypeError("Reduce of empty array with no initial value")}for(;e?d>=0:p>d;d+=m)d in u&&(c=r(c,u[d],d,l));return c}};e.exports={left:s(!1),right:s(!0)}},d997:function(e,t,r){"use strict";r("46e5")},e419:function(e,t,r){"use strict";r.d(t,"d",(function(){return i})),r.d(t,"c",(function(){return a})),r.d(t,"a",(function(){return o})),r.d(t,"e",(function(){return s})),r.d(t,"b",(function(){return c}));var n=r("afaa"),i=function(e){return Object(n["a"])({url:"/api-customer/community/community/list",method:"GET",params:e})},a=function(e){return Object(n["a"])({url:"/api-customer/community/community/getAll",method:"GET",params:e})},o=function(e){return Object(n["a"])({method:"POST",url:"/api-customer/community/community/add",data:e})},s=function(e){return Object(n["a"])({method:"PUT",url:"/api-customer/community/community/update",data:e})},c=function(e){return Object(n["a"])({method:"DELETE",url:"/api-customer/community/community/delete?id=".concat(e.id)})}},ed08:function(e,t,r){"use strict";r.d(t,"c",(function(){return c})),r.d(t,"b",(function(){return u})),r.d(t,"a",(function(){return d}));r("a15b"),r("13d5"),r("b64b"),r("96cf");var n=r("1da1"),i=r("afaa"),a=function(e){return Object(i["a"])({url:"/api-customer/entity/typeList/".concat(e.typeCode),method:"GET"})},o=function(e){return Object(i["a"])({url:"/api-customer/entity/typeList/getChildren/".concat(e.typeCode),method:"GET"})},s={CASE_REASON:32,CASE_DIMENSION:31,COMMUNITY_LEVEL:11,COMMUNITY_TYPE:12,PROJECT_NATURE:13};function c(e){return l.apply(this,arguments)}function l(){return l=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a({typeCode:s[t]});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),l.apply(this,arguments)}function u(e){return p.apply(this,arguments)}function p(){return p=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o({typeCode:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),p.apply(this,arguments)}function d(e){if(!e)return"";var t=Object.keys(e).reduce((function(t,r){return e[r]&&t.push(r+"="+encodeURIComponent(e[r])),t}),[]).join("&");return t}}}]);
//# sourceMappingURL=chunk-8de26980.88dbdb9c.js.map