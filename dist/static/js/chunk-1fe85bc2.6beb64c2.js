(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1fe85bc2"],{6208:function(e,t,n){"use strict";var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"table-search"},[n("div",{directives:[{name:"resize",rawName:"v-resize",value:e.formResize,expression:"formResize"}],ref:"search-form",staticClass:"search-form"},[n("div",{ref:"form-box"},[e._t("default",[n("el-form",{ref:"form",attrs:{model:e.form,inline:!0,"label-width":e.labelWidth}},[e._l(e.columns,(function(t,o){return n("el-form-item",{key:o,attrs:{label:t.label,"label-width":t.labelWidth}},["org"===t.type?n("form-organize",{model:{value:e.form[t.prop],callback:function(n){e.$set(e.form,t.prop,n)},expression:"form[column.prop]"}}):"input"===t.type?n("el-input",e._b({staticClass:"short-width",model:{value:e.form[t.prop],callback:function(n){e.$set(e.form,t.prop,n)},expression:"form[column.prop]"}},"el-input",t.props,!1)):"select"===t.type?n("form-select",e._b({staticClass:"search-select-item",attrs:{options:t.options},model:{value:e.form[t.prop],callback:function(n){e.$set(e.form,t.prop,n)},expression:"form[column.prop]"}},"form-select",t.props,!1)):"date"===t.type||"dateRange"===t.type?n("el-date-picker",e._b({style:{width:"date"===t.type?"215px":""},model:{value:e.form[t.prop],callback:function(n){e.$set(e.form,t.prop,n)},expression:"form[column.prop]"}},"el-date-picker",t.props,!1)):e._t(t.prop,null,{form:e.form})],2)})),e._t("default")],2)])],2)]),n("div",{staticClass:"search-btn"},[e._t("search-btn",[n("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查 询")]),e.resettable?n("el-button",{on:{click:e.reset}},[e._v("重 置")]):e._e()]),e.showOpen?[!1===e.open?n("el-button",{attrs:{type:"text"},on:{click:function(t){e.open=!0}}},[e._v(" 展开 "),n("i",{staticClass:"el-icon-arrow-down"})]):e._e(),!0===e.open?n("el-button",{attrs:{type:"text"},on:{click:function(t){e.open=!1}}},[e._v(" 收起 "),n("i",{staticClass:"el-icon-arrow-up"})]):e._e()]:e._e()],2)])},r=[],a=(n("4160"),n("159b"),n("2422")),s=n("8604"),i={input:{placeholder:"请输入"},select:{placeholder:"请选择",clearable:!0},date:{placeholder:"选择日期",valueFormat:"timestamp",type:"date"},dateRange:{placeholder:"选择日期",valueFormat:"timestamp",type:"daterange",rangeSeparator:"至",startPlaceholder:"开始日期",endPlaceholder:"结束日期"}},c={name:"tableSearch",components:{FormSelect:a["a"],FormOrganize:s["a"]},props:{value:{},columns:{type:Array},resettable:{type:Boolean,default:!1},labelWidth:{type:String,default:"80px"}},directives:{resize:{bind:function(e,t){var n="",o="";function r(){var r=document.defaultView.getComputedStyle(e);n===r.width&&o===r.height||t.value(),n=r.width,o=r.height}e.__vueSetInterval__=setInterval(r,100)},unbind:function(e){clearInterval(e.__vueSetInterval__)}}},data:function(){return{defaultForm:{},form:{},showOpen:!1,open:!1}},watch:{value:{deep:!0,handler:function(e){this.form=Object.assign(this.form,e)}},columns:{deep:!0,handler:function(){this.resetForm()}},form:{deep:!0,handler:function(){this.$emit("input",this.form)}},open:function(){this.setHeight()}},created:function(){this.resetForm(),this.defaultForm=Object.assign({},this.form)},mounted:function(){this.$emit("input",this.form)},methods:{resetForm:function(){var e={};this.columns&&this.columns.length&&this.columns.forEach((function(t){t.props||(t.props={}),i[t.type]||(i[t.type]={}),t.props=Object.assign(t.props,i[t.type]),e[t.prop]=""})),this.form=Object.assign(e,this.value)},formResize:function(){this.$refs["form-box"]&&this.$refs["form-box"].clientHeight>60?(this.showOpen=!0,this.setHeight()):this.showOpen=!1},setHeight:function(){this.$refs["search-form"].style.height=this.open?this.$refs["form-box"].clientHeight+"px":"40px"},reset:function(){this.form=Object.assign({},this.defaultForm),this.$emit("reset",this.form)},search:function(){this.$emit("search",this.form)}}},u=c,l=(n("c41a"),n("2877")),m=Object(l["a"])(u,o,r,!1,null,"c04e5e04",null);t["a"]=m.exports},9306:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return s})),n.d(t,"e",(function(){return i})),n.d(t,"b",(function(){return c}));var o=n("afaa"),r=function(e){return Object(o["a"])({url:"/api-customer/community/keyword/list",method:"GET",params:e})},a=function(e){return Object(o["a"])({url:"/api-customer/community/keyword/getAll",method:"GET",params:e})},s=function(e){return Object(o["a"])({method:"POST",url:"/api-customer/community/keyword/add",data:e})},i=function(e){return Object(o["a"])({method:"PUT",url:"/api-customer/community/keyword/update",data:e})},c=function(e){return Object(o["a"])({method:"DELETE",url:"/api-customer/community/keyword/delete?id=".concat(e.id)})}},af68:function(e,t,n){},c41a:function(e,t,n){"use strict";n("af68")},d548:function(e,t,n){"use strict";n.r(t);var o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tabs-box"},[n("common-table",{ref:"table",attrs:{headers:e.headers,api:e.pageAPI,params:e.params,deleteApi:e.deleteAPI,uploadURL:"/api-customer/community/case/import",modelUrl:e.modelUrl,settings:["setting","upload"]},on:{editRow:e.editRow,add:e.add},scopedSlots:e._u([{key:"table-header",fn:function(){return[n("table-search",{attrs:{resettable:"",labelWidth:"90px",columns:e.searchColumns},on:{search:e.search},model:{value:e.params,callback:function(t){e.params=t},expression:"params"}})]},proxy:!0}])}),e.visibleDialog?n("edit-dialog",{attrs:{visibleDialog:e.visibleDialog,title:e.title,columns:e.columns,loading:e.loading,form:e.form},on:{"update:visibleDialog":function(t){e.visibleDialog=t},"update:visible-dialog":function(t){e.visibleDialog=t},formUpdate:e.formUpdate,save:e.submit},scopedSlots:e._u([{key:"caseAddress",fn:function(t){var o=t.form;return[n("span",{staticStyle:{display:"inline-block","margin-right":"10px"}},[e._v("上海市 上海市 闵行区")]),n("el-input",{staticClass:"short-width",attrs:{placeholder:"请输入案件地址"},model:{value:o.caseAddress,callback:function(t){e.$set(o,"caseAddress",t)},expression:"form.caseAddress"}})]}},{key:"caseContent",fn:function(t){var o=t.form;return[n("el-input",{attrs:{type:"textarea",rows:10,placeholder:"注：字数限制1500",maxlength:1500,showWordLimit:""},on:{blur:function(t){return e.getKeyWordsByContent(o.caseContent)}},model:{value:o.caseContent,callback:function(t){e.$set(o,"caseContent",t)},expression:"form.caseContent"}})]}},{key:"caseDimensionId",fn:function(t){var o=t.form;return[n("form-select",{attrs:{options:e.columns[8].options},on:{change:function(t){return e.dimensionChange(t,"form")}},model:{value:o.caseDimensionId,callback:function(t){e.$set(o,"caseDimensionId",t)},expression:"form.caseDimensionId"}})]}},{key:"caseReasonId",fn:function(t){var o=t.form;return[n("form-select",{attrs:{options:e.columns[9].options},on:{change:e.ReasonChange},model:{value:o.caseReasonId,callback:function(t){e.$set(o,"caseReasonId",t)},expression:"form.caseReasonId"}})]}}],null,!1,3373460764)}):e._e()],1)},r=[],a=(n("99af"),n("d3b7"),n("2909")),s=(n("96cf"),n("1da1")),i=n("1892"),c=n("ddde"),u=n("2422"),l=n("6208"),m=n("ed08"),p=n("0644"),d=n.n(p),f=n("afaa"),h=function(e){return Object(f["a"])({url:"/api-customer/community/case/list",method:"GET",params:e})},b=function(e){return Object(f["a"])({method:"POST",url:"/api-customer/community/case/add",data:e})},y=function(e){return Object(f["a"])({method:"PUT",url:"/api-customer/community/case/update",data:e})},g=function(e){return Object(f["a"])({method:"DELETE",url:"/api-customer/community/case/delete?id=".concat(e.id)})},v=function(e){return Object(f["a"])({method:"POST",url:"/api-customer/community/case/matchKeyWord",data:e})},w=n("e419"),x=n("9306"),C={name:"Case",components:{CommonTable:i["a"],EditDialog:c["a"],FormSelect:u["a"],TableSearch:l["a"]},data:function(){return{pageAPI:h,deleteAPI:g,activeName:"case",visibleDialog:!1,loading:!1,type:"add",title:"新增案件",modelUrl:"",case:[],params:{},searchColumns:[{prop:"caseName",label:"案件名称",type:"input"},{prop:"caseNumber",label:"接警单编号",type:"input"},{prop:"caseDimension",label:"案件维度",type:"select",options:[]},{prop:"caseReasonId",label:"报案缘由",type:"select",options:[]},{prop:"communityId",label:"社区名称",type:"select",options:[]},{prop:"orgId",label:"归属物业",type:"org"}],headers:[{prop:"index",label:"序号"},{prop:"caseName",label:"案件名称"},{prop:"caseNumber",label:"接警单编号"},{prop:"communityName",label:"社区名称"},{prop:"communityTypeName",label:"社区类型"},{prop:"orgName",label:"归属物业"},{prop:"caseReasonName",label:"报案缘由"},{prop:"caseDimensionName",label:"案件维度"},{prop:"caseTime",label:"报案时间",type:"date"},{prop:"action",label:"操作",width:100,fixed:"right"}],columns:[{index:0,prop:"basicInfo",label:"基础信息",type:"title"},{index:1,prop:"caseName",label:"案件名称",type:"text"},{index:2,prop:"caseNumber",label:"接警单编号",type:"text"},{index:3,prop:"caseTime",label:"报案时间",type:"date",required:!0,options:[]},{index:4,prop:"communityId",label:"社区名称",type:"select",required:!0,options:[]},{index:5,prop:"caseAddress",label:"案件地址",required:!0,cols:4},{index:6,prop:"caseContent",label:"案件内容",required:!0,cols:2},{index:7,prop:"assessInfo",label:"归类信息",type:"title"},{index:8,prop:"caseDimensionId",label:"案件维度",required:!0,options:[]},{index:9,prop:"caseReasonId",label:"报案缘由",required:!0,options:[]},{index:10,prop:"caseKeyword",label:"案件关键词",type:"select",required:!0,options:[],props:{multiple:!0}}],form:{caseDimensionId:"",caseReasonId:"",caseKeyword:""},formData:{},allCaseDimensions:[],allCaseReasons:[],allKeywords:[]}},watch:{"params.caseDimension":function(e){this.dimensionChange(e,"search")}},created:function(){this.getOptions();var e=this.$store.state.auth.token;this.modelUrl="/api-customer/community/getFile?token=".concat(e,"&type=2")},methods:{getOptions:function(){this.getCaseDimensions(),this.getCommunities(),this.getCaseReasons(),this.getKeywords()},getCaseDimensions:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(m["b"])("CASE_DIMENSION");case 2:n=t.sent,e.searchColumns[1].options=n,e.columns[8].options=n,e.allCaseDimensions=Object(a["a"])(n);case 6:case"end":return t.stop()}}),t)})))()},getCaseReasons:function(e,t){var n=this;return Object(s["a"])(regeneratorRuntime.mark((function o(){var r;return regeneratorRuntime.wrap((function(o){while(1)switch(o.prev=o.next){case 0:if(r=[],!e){o.next=7;break}return o.next=4,Object(m["a"])(e);case 4:r=o.sent,o.next=10;break;case 7:return o.next=9,Object(m["b"])("CASE_REASON");case 9:r=o.sent;case 10:t||(n.allCaseReasons=Object(a["a"])(r),n.columns[9].options=r,n.searchColumns[2].options=r),"form"===t?n.columns[9].options=r:"search"===t&&(n.searchColumns[2].options=r);case 12:case"end":return o.stop()}}),o)})))()},getCommunities:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(w["c"])();case 2:n=t.sent,e.searchColumns[3].options=n,e.columns[4].options=n;case 5:case"end":return t.stop()}}),t)})))()},getKeywords:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(x["c"])({parentCode:e});case 2:o=n.sent,e||(t.allKeywords=o),t.columns[10].options=o;case 5:case"end":return n.stop()}}),n)})))()},search:function(){this.$refs.table.onQuery()},editRow:function(e){this.type="edit",this.title="编辑案件",this.form=Object.assign({},e),this.form.caseAddress&&this.form.caseAddress.length&&(this.form.caseAddress=this.form.caseAddress[0].address),this.visibleDialog=!0},add:function(){this.type="add",this.title="新增案件",this.form={caseDimensionId:"",caseReasonId:"",caseKeyword:""},this.visibleDialog=!0},submit:function(e){var t=this,n=Object.assign({},e);if(n.caseAddress=[{province:"上海市",city:"上海市",district:"闵行区",address:n.caseAddress}],this.checkForm(n)){var o="add"===this.type?b:y;this.loading=!0,o(n).then((function(){t.$message.success("".concat(t.title,"成功！")),t.visibleDialog=!1,t.$refs.table.refresh()})).catch((function(e){t.$message.error("".concat(t.title,"失败：").concat(e))})).finally((function(){t.loading=!1}))}},checkForm:function(e){if(e)return!0},formUpdate:function(e){this.formData=e},dimensionChange:function(e,t){if(this.getCaseReasons(e,t),"form"===t){var n=d()(this.formData);n.caseDimensionId=e,n.caseReasonId="",n.caseKeyword=[],this.form=n}else"search"===t&&(this.params.caseReasonId="")},ReasonChange:function(e){this.getKeywords(e);var t=d()(this.formData);t.caseReasonId=e,t.caseKeyword=[],this.form=t},getKeyWordsByContent:function(e){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function n(){var o,r;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.columns[8].options=t.allCaseDimensions,t.columns[9].options=t.allCaseReasons,t.columns[10].options=t.allKeywords,n.next=5,v({content:e});case 5:o=n.sent,r=d()(t.formData),r.caseContent=e,r.caseDimensionId=o.dimensionId,r.caseReasonId=o.reasonId,r.caseKeyword=o.keywordId,t.form=r;case 12:case"end":return n.stop()}}),n)})))()}}},O=C,R=n("2877"),k=Object(R["a"])(O,o,r,!1,null,null,null);t["default"]=k.exports},e419:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return s})),n.d(t,"e",(function(){return i})),n.d(t,"b",(function(){return c}));var o=n("afaa"),r=function(e){return Object(o["a"])({url:"/api-customer/community/community/list",method:"GET",params:e})},a=function(e){return Object(o["a"])({url:"/api-customer/community/community/getAll",method:"GET",params:e})},s=function(e){return Object(o["a"])({method:"POST",url:"/api-customer/community/community/add",data:e})},i=function(e){return Object(o["a"])({method:"PUT",url:"/api-customer/community/community/update",data:e})},c=function(e){return Object(o["a"])({method:"DELETE",url:"/api-customer/community/community/delete?id=".concat(e.id)})}},ed08:function(e,t,n){"use strict";n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return l}));n("96cf");var o=n("1da1"),r=n("afaa"),a=function(e){return Object(r["a"])({url:"/api-customer/entity/typeList/".concat(e.typeCode),method:"GET"})},s=function(e){return Object(r["a"])({url:"/api-customer/entity/typeList/getChildren/".concat(e.typeCode),method:"GET"})},i={CASE_REASON:32,CASE_DIMENSION:31,COMMUNITY_LEVEL:11,COMMUNITY_TYPE:12,PROJECT_NATURE:13};function c(e){return u.apply(this,arguments)}function u(){return u=Object(o["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,a({typeCode:i[t]});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),u.apply(this,arguments)}function l(e){return m.apply(this,arguments)}function m(){return m=Object(o["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s({typeCode:t});case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)}))),m.apply(this,arguments)}}}]);
//# sourceMappingURL=chunk-1fe85bc2.6beb64c2.js.map