(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-69d5ed9f"],{6208:function(e,t,s){"use strict";var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"table-search"},[s("div",{directives:[{name:"resize",rawName:"v-resize",value:e.formResize,expression:"formResize"}],ref:"search-form",staticClass:"search-form"},[s("div",{ref:"form-box"},[e._t("default",[s("el-form",{ref:"form",attrs:{model:e.form,inline:!0,"label-width":e.labelWidth}},[e._l(e.columns,(function(t,o){return s("el-form-item",{key:o,attrs:{label:t.label,"label-width":t.labelWidth}},["org"===t.type?s("form-organize",{model:{value:e.form[t.prop],callback:function(s){e.$set(e.form,t.prop,s)},expression:"form[column.prop]"}}):"input"===t.type?s("el-input",e._b({staticClass:"short-width",model:{value:e.form[t.prop],callback:function(s){e.$set(e.form,t.prop,s)},expression:"form[column.prop]"}},"el-input",t.props,!1)):"select"===t.type?s("form-select",e._b({staticClass:"search-select-item",attrs:{options:t.options},model:{value:e.form[t.prop],callback:function(s){e.$set(e.form,t.prop,s)},expression:"form[column.prop]"}},"form-select",t.props,!1)):"date"===t.type||"dateRange"===t.type?s("el-date-picker",e._b({style:{width:"date"===t.type?"215px":""},model:{value:e.form[t.prop],callback:function(s){e.$set(e.form,t.prop,s)},expression:"form[column.prop]"}},"el-date-picker",t.props,!1)):e._t(t.prop,null,{form:e.form})],2)})),e._t("default")],2)])],2)]),s("div",{staticClass:"search-btn"},[e._t("search-btn",[s("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查 询")]),e.resettable?s("el-button",{on:{click:e.reset}},[e._v("重 置")]):e._e()]),e.showOpen?[!1===e.open?s("el-button",{attrs:{type:"text"},on:{click:function(t){e.open=!0}}},[e._v(" 展开 "),s("i",{staticClass:"el-icon-arrow-down"})]):e._e(),!0===e.open?s("el-button",{attrs:{type:"text"},on:{click:function(t){e.open=!1}}},[e._v(" 收起 "),s("i",{staticClass:"el-icon-arrow-up"})]):e._e()]:e._e()],2)])},n=[],a=(s("4160"),s("159b"),s("2422")),i=s("8604"),r={input:{placeholder:"请输入"},select:{placeholder:"请选择",clearable:!0},date:{placeholder:"选择日期",valueFormat:"timestamp",type:"date"},dateRange:{placeholder:"选择日期",valueFormat:"timestamp",type:"daterange",rangeSeparator:"至",startPlaceholder:"开始日期",endPlaceholder:"结束日期"}},c={name:"tableSearch",components:{FormSelect:a["a"],FormOrganize:i["a"]},props:{value:{},columns:{type:Array},resettable:{type:Boolean,default:!1},labelWidth:{type:String,default:"80px"}},directives:{resize:{bind:function(e,t){var s="",o="";function n(){var n=document.defaultView.getComputedStyle(e);s===n.width&&o===n.height||t.value(),s=n.width,o=n.height}e.__vueSetInterval__=setInterval(n,100)},unbind:function(e){clearInterval(e.__vueSetInterval__)}}},data:function(){return{defaultForm:{},form:{},showOpen:!1,open:!1}},watch:{value:{deep:!0,handler:function(e){this.form=Object.assign(this.form,e)}},columns:{deep:!0,handler:function(){this.resetForm()}},form:{deep:!0,handler:function(){this.$emit("input",this.form)}},open:function(){this.setHeight()}},created:function(){this.resetForm(),this.defaultForm=Object.assign({},this.form)},mounted:function(){this.$emit("input",this.form)},methods:{resetForm:function(){var e={};this.columns&&this.columns.length&&this.columns.forEach((function(t){t.props||(t.props={}),r[t.type]||(r[t.type]={}),t.props=Object.assign(t.props,r[t.type]),e[t.prop]=""})),this.form=Object.assign(e,this.value)},formResize:function(){this.$refs["form-box"]&&this.$refs["form-box"].clientHeight>60?(this.showOpen=!0,this.setHeight()):this.showOpen=!1},setHeight:function(){this.$refs["search-form"].style.height=this.open?this.$refs["form-box"].clientHeight+"px":"40px"},reset:function(){this.form=Object.assign({},this.defaultForm),this.$emit("reset",this.form)},search:function(){this.$emit("search",this.form)}}},u=c,l=(s("c41a"),s("2877")),m=Object(l["a"])(u,o,n,!1,null,"c04e5e04",null);t["a"]=m.exports},"6cde":function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"tabs-box"},[s("common-table",{ref:"table",attrs:{headers:e.headers,api:e.pageAPI,params:e.params,deleteApi:e.deleteAPI,uploadURL:e.uploadURL,modelUrl:e.modelUrl,selection:"",settings:["setting","upload"]},on:{add:e.add,editRow:e.editRow},scopedSlots:e._u([{key:"table-header",fn:function(){return[s("table-search",{attrs:{resettable:"",labelWidth:"90px",columns:e.searchColumns},on:{search:e.search},model:{value:e.params,callback:function(t){e.params=t},expression:"params"}})]},proxy:!0}])}),e.visibleDialog?s("edit-dialog",{attrs:{visibleDialog:e.visibleDialog,title:e.title,columns:e.columns,loading:e.loading,form:e.form},on:{"update:visibleDialog":function(t){e.visibleDialog=t},"update:visible-dialog":function(t){e.visibleDialog=t},formUpdate:e.formUpdate,save:e.submit},scopedSlots:e._u([{key:"caseAddress",fn:function(t){var o=t.form;return[s("span",{staticStyle:{display:"inline-block","margin-right":"10px"}},[e._v(" 上海市 上海市 闵行区 ")]),s("el-input",{staticClass:"short-width",attrs:{placeholder:"请输入案件地址"},model:{value:o.caseAddress,callback:function(t){e.$set(o,"caseAddress",t)},expression:"form.caseAddress"}})]}}],null,!1,2129069083)}):e._e()],1)},n=[],a=(s("99af"),s("4160"),s("d81d"),s("b0c0"),s("d3b7"),s("159b"),s("2909")),i=(s("96cf"),s("1da1")),r=s("1892"),c=s("ddde"),u=s("6208"),l=s("79b1"),m=s("e419"),d=s("9306"),p={name:"CaseAddress",components:{CommonTable:r["a"],EditDialog:c["a"],TableSearch:u["a"]},data:function(){return{pageAPI:l["c"],deleteAPI:l["b"],visibleDialog:!1,loading:!1,type:"add",title:"新增案件",modelUrl:"",uploadURL:"/api-customer/community/case/import",case:[],params:{},dimensionTree:[],headers:[{prop:"index",label:"序号"},{prop:"caseNumber",label:"接警单编号"},{prop:"caseDimensionName",label:"案件维度"},{prop:"caseReasonName",label:"一级案由"},{prop:"subCaseReasonName",label:"二级案由"},{prop:"caseTime",label:"报案时间",type:"date"},{prop:"address",label:"案件地址"},{prop:"reason",label:"匹配结果"},{prop:"communityTypeName",label:"社区类型"},{prop:"communityName",label:"社区名称"},{prop:"action",label:"操作",width:100,fixed:"right"}],commonOptions:{communities:[],caseDimensions:[],caseReasons:[],subCaseReasons:[],keywords:[]},searchOptions:{caseReasons:[],subCaseReasons:[]},form:{},formData:{}}},computed:{searchColumns:function(){return[{prop:"caseNumber",label:"接警单编号",type:"input"},{prop:"caseDimension",label:"案件维度",type:"select",options:this.commonOptions.caseDimensions},{prop:"caseReasonId",label:"一级案由",type:"select",options:this.searchOptions.caseReasons},{prop:"subCaseReasonId",label:"二级案由",type:"select",options:this.searchOptions.subCaseReasons},{prop:"communityId",label:"社区名称",type:"select",options:this.commonOptions.communities},{prop:"orgId",label:"归属物业",type:"org"}]},columns:function(){return[{prop:"basicInfo",label:"基础信息",type:"title"},{prop:"caseNumber",label:"接警单编号",type:"text"},{prop:"caseTime",label:"报案时间",type:"date",required:!0},{prop:"communityId",label:"社区名称",type:"select",required:!0,options:this.commonOptions.communities},{prop:"caseAddress",label:"案件地址",required:!0,cols:4},{prop:"caseContent",label:"备注",type:"textArea",cols:2},{prop:"assessInfo",label:"归类信息",type:"title"},{prop:"caseDimensionId",label:"案件维度",type:"select",required:!0,options:this.commonOptions.caseDimensions},{prop:"caseReasonId",label:"一级案由",type:"select",required:!0,options:this.commonOptions.caseReasons},{prop:"subCaseReasonId",label:"二级案由",type:"select",required:!0,options:this.commonOptions.subCaseReasons},{prop:"caseKeyword",label:"案件关键词",type:"select",required:!0,options:this.commonOptions.keywords,props:{multiple:!0}}]}},watch:{"params.caseDimension":function(e){this.dimensionChange(e,"search")},"params.caseReasonId":function(e){this.caseReasonChange(e,"search")},"formData.caseDimensionId":function(e){this.dimensionChange(e)},"formData.caseReasonId":function(e){this.caseReasonChange(e)},"formData.subCaseReasonId":function(e){this.subCaseReasonChange(e)}},created:function(){this.getOptions();var e=this.$store.state.auth.token;this.modelUrl="/api-customer/community/getFile?token=".concat(e,"&type=2")},methods:{getOptions:function(){this.getCaseDimensions(),this.getCommunities()},getCaseDimensions:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["d"])();case 2:e.dimensionTree=t.sent,e.commonOptions.caseDimensions=(e.dimensionTree||[]).map((function(e){return{id:e.code,name:e.name}}));case 4:case"end":return t.stop()}}),t)})))()},getCommunities:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(m["c"])();case 2:e.commonOptions.communities=t.sent;case 3:case"end":return t.stop()}}),t)})))()},getKeywords:function(e){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){while(1)switch(s.prev=s.next){case 0:return s.next=2,Object(d["c"])({code:e});case 2:t.commonOptions.keywords=s.sent;case 3:case"end":return s.stop()}}),s)})))()},search:function(){this.$refs.table.onQuery()},editRow:function(e){this.type="edit",this.title="编辑案件",this.form=Object.assign({},e),this.form.caseAddress&&this.form.caseAddress.length&&(this.form.caseAddress=this.form.caseAddress[0].address),this.commonOptions.caseReasons=this.getTreeChildByCode(this.form.caseDimensionId,1),this.commonOptions.subCaseReasons=this.getTreeChildByCode(this.form.caseReasonId,2),this.getKeywords(this.form.subCaseReasonId),this.visibleDialog=!0},add:function(){this.type="add",this.title="新增案件",this.form={},this.visibleDialog=!0},submit:function(e){var t=this,s=Object.assign({},e);if(s.caseAddress=[{province:"上海市",city:"上海市",district:"闵行区",address:s.caseAddress}],this.checkForm(s)){var o="add"===this.type?l["a"]:l["e"];this.loading=!0,o(s).then((function(){t.$message.success("".concat(t.title,"成功！")),t.visibleDialog=!1,t.$refs.table.refresh()})).catch((function(e){t.$message.error("".concat(t.title,"失败：").concat(e))})).finally((function(){t.loading=!1}))}},checkForm:function(e){if(e)return!0},formUpdate:function(e){this.formData=e},dimensionChange:function(e,t){"search"===t?(this.params.caseReasonId="",this.params.subCaseReasonId="",this.searchOptions.caseReasons=this.getTreeChildByCode(e,1)):(this.formData.caseReasonId="",this.formData.subCaseReasonId="",this.formData.caseKeyword=[],this.commonOptions.caseReasons=this.getTreeChildByCode(e,1))},caseReasonChange:function(e,t){"search"===t?(this.params.subCaseReasonId="",this.searchOptions.subCaseReasons=this.getTreeChildByCode(e,2)):(this.formData.subCaseReasonId="",this.formData.caseKeyword=[],this.commonOptions.subCaseReasons=this.getTreeChildByCode(e,2))},subCaseReasonChange:function(e){this.formData.caseKeyword=[],this.getKeywords(e)},getTreeChildByCode:function(e,t){if(!e&&0!==e)return[];var s=[];switch(t){case 1:s=this.dimensionTree;break;case 2:(this.dimensionTree||[]).forEach((function(e){var t;(t=s).push.apply(t,Object(a["a"])(e.child||[]))}));break}var o=[];return s.forEach((function(t){e===t.code&&(o=(t.child||[]).map((function(e){return{id:e.code,name:e.name}})))})),o}}},h=p,f=s("2877"),b=Object(f["a"])(h,o,n,!1,null,null,null);t["default"]=b.exports},"79b1":function(e,t,s){"use strict";s.d(t,"c",(function(){return n})),s.d(t,"a",(function(){return a})),s.d(t,"e",(function(){return i})),s.d(t,"b",(function(){return r})),s.d(t,"d",(function(){return c}));var o=s("afaa"),n=function(e){return Object(o["a"])({url:"/api-customer/community/case/list",method:"GET",params:e})},a=function(e){return Object(o["a"])({method:"POST",url:"/api-customer/community/case/add",data:e})},i=function(e){return Object(o["a"])({method:"PUT",url:"/api-customer/community/case/update",data:e})},r=function(e){return Object(o["a"])({method:"DELETE",url:"/api-customer/community/case/delete?id=".concat(e.id)})},c=function(e){return Object(o["a"])({method:"GET",url:"/api-customer/community/queryCaseDimensions/cascade",params:e})}},9306:function(e,t,s){"use strict";s.d(t,"d",(function(){return n})),s.d(t,"c",(function(){return a})),s.d(t,"a",(function(){return i})),s.d(t,"e",(function(){return r})),s.d(t,"b",(function(){return c}));var o=s("afaa"),n=function(e){return Object(o["a"])({url:"/api-customer/community/keyword/list",method:"GET",params:e})},a=function(e){return Object(o["a"])({url:"/api-customer/community/keyword/getAll",method:"GET",params:e})},i=function(e){return Object(o["a"])({method:"POST",url:"/api-customer/community/keyword/add",data:e})},r=function(e){return Object(o["a"])({method:"PUT",url:"/api-customer/community/keyword/update",data:e})},c=function(e){return Object(o["a"])({method:"DELETE",url:"/api-customer/community/keyword/delete?id=".concat(e.id)})}},af68:function(e,t,s){},c41a:function(e,t,s){"use strict";s("af68")},e419:function(e,t,s){"use strict";s.d(t,"e",(function(){return n})),s.d(t,"c",(function(){return a})),s.d(t,"a",(function(){return i})),s.d(t,"f",(function(){return r})),s.d(t,"b",(function(){return c})),s.d(t,"d",(function(){return u}));var o=s("afaa"),n=function(e){return Object(o["a"])({url:"/api-customer/service-wisdom-town/community/list",method:"GET",params:e})},a=function(e){return Object(o["a"])({url:"/api-customer/service-wisdom-town/community/getAll",method:"GET",params:e})},i=function(e){return Object(o["a"])({method:"POST",url:"/api-customer/service-wisdom-town/community/add",data:e})},r=function(e){return Object(o["a"])({method:"PUT",url:"/api-customer/service-wisdom-town/community/update",data:e})},c=function(e){return Object(o["a"])({method:"DELETE",url:"/api-customer/service-wisdom-town/community/delete?id=".concat(e.id)})},u=function(e){return Object(o["a"])({url:"/api-customer/service-wisdom-town/community/getPolice",method:"GET",params:e})}}}]);
//# sourceMappingURL=chunk-69d5ed9f.4f584518.js.map