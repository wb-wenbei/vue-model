(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8424bc2a"],{"2b19":function(e,t,o){"use strict";o.d(t,"d",(function(){return i})),o.d(t,"c",(function(){return a})),o.d(t,"a",(function(){return n})),o.d(t,"e",(function(){return s})),o.d(t,"b",(function(){return l}));var r=o("afaa"),i=function(e){return Object(r["a"])({url:"/api-customer/service-wisdom-town/propertyCommittee/query",method:"GET",params:e})},a=function(e){return Object(r["a"])({url:"/api-customer/service-wisdom-town/propertyCommittee/queryAll",method:"GET",params:e})},n=function(e){return Object(r["a"])({method:"POST",url:"/api-customer/service-wisdom-town/propertyCommittee/insert",data:e})},s=function(e){return Object(r["a"])({method:"PUT",url:"/api-customer/service-wisdom-town/propertyCommittee/update",data:e})},l=function(e){return Object(r["a"])({method:"DELETE",url:"/api-customer/service-wisdom-town/propertyCommittee/delete?id=".concat(e.id)})}},"2e38":function(e,t,o){"use strict";o.r(t);var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"tabs-box"},[o("common-table",{ref:"table",attrs:{headers:e.headers,api:e.pageAPI,params:e.params,modelUrl:e.modelUrl,uploadURL:e.uploadURL,settings:["setting","upload"]},on:{editRow:e.editRow,deleteRow:e.deleteRow,add:e.add},scopedSlots:e._u([{key:"table-header",fn:function(){return[o("table-search",{attrs:{resettable:"",columns:e.searchColumns},on:{search:e.search},model:{value:e.params,callback:function(t){e.params=t},expression:"params"}})]},proxy:!0}])}),o("edit-dialog",{attrs:{visibleDialog:e.visibleDialog,title:e.title,columns:e.columns,loading:e.loading,form:e.form},on:{"update:visibleDialog":function(t){e.visibleDialog=t},"update:visible-dialog":function(t){e.visibleDialog=t},save:e.submit}})],1)},i=[],a=(o("99af"),o("d3b7"),o("1892")),n=o("ddde"),s=o("6208"),l=o("ed08"),c=o("2b19"),p={name:"Committee",components:{CommonTable:a["a"],TableSearch:s["a"],EditDialog:n["a"]},data:function(){return{pageAPI:c["d"],visibleDialog:!1,loading:!1,type:"add",title:"新增居委",options:{},modelUrl:"",uploadURL:"/api-customer/service-wisdom-town/committee/import",params:{entityType:Object(l["b"])("COMMITTEE")},searchColumns:[{prop:"entityName",label:"居委名称",type:"input"},{prop:"entityDirectorName",label:"负责人",type:"input"}],headers:[{prop:"index",label:"序号"},{prop:"entityName",label:"居委名称"},{prop:"entityDirectorName",label:"居委负责人"},{prop:"contactPhone",label:"联系电话"},{prop:"address",label:"居委地址"},{prop:"updateTime",label:"修改时间",type:"timeMinute"},{prop:"action",label:"操作",width:100,fixed:"right"}],columns:[{prop:"entityName",label:"居委名称",type:"text",required:!0},{prop:"orgId",label:"组织机构",type:"org",required:!0},{prop:"entityDirectorName",label:"居委负责人",type:"text",required:!0},{prop:"contactPhone",label:"联系电话",type:"text",required:!0},{prop:"address",label:"居委地址",type:"text",required:!0,props:{placeholder:"示例：上海市闵行区XX街道929号"}},{prop:"location",label:"居委位置",type:"address",required:!0,cols:2}],form:{}}},created:function(){this.getOptions()},methods:{getOptions:function(){this.modelUrl="/api-customer/service-wisdom-town/committee/download/excel?token="+this.$store.state.userInfo.token},search:function(){this.$refs.table.onQuery()},editRow:function(e){this.type="edit",this.title="编辑居委",this.form=e,e.lng&&e.lat&&(this.form.location=[e.lng,e.lat]),this.visibleDialog=!0},deleteRow:function(e){var t=this;this.$confirm("确定要删除吗？").then((function(){Object(c["b"])({id:e.id}).then((function(){t.$message.success("居委删除成功！"),t.$refs.table.refresh()})).catch((function(e){t.$message.error("居委删除失败："+e)}))}))},add:function(){this.type="add",this.title="新增居委",this.form={gridId:-1},this.visibleDialog=!0},submit:function(e){var t=this,o=Object.assign({},e,{entityType:Object(l["b"])("COMMITTEE"),lng:e.location[0],lat:e.location[1]}),r="add"===this.type?c["a"]:c["e"];this.loading=!0,r(o).then((function(){t.$message.success("".concat(t.title,"成功！")),t.visibleDialog=!1,t.$refs.table.refresh()})).catch((function(e){t.$message.error("".concat(t.title,"失败：").concat(e))})).finally((function(){t.loading=!1}))}}},u=p,m=o("2877"),d=Object(m["a"])(u,r,i,!1,null,"07b65e96",null);t["default"]=d.exports},6208:function(e,t,o){"use strict";var r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"table-search"},[o("div",{directives:[{name:"resize",rawName:"v-resize",value:e.formResize,expression:"formResize"}],ref:"search-form",staticClass:"search-form"},[o("div",{ref:"form-box"},[e._t("default",[o("el-form",{ref:"form",attrs:{model:e.form,inline:!0,"label-width":e.labelWidth}},[e._l(e.columns,(function(t,r){return o("el-form-item",{key:r,attrs:{label:t.label,"label-width":t.labelWidth}},["org"===t.type?o("form-organize",{model:{value:e.form[t.prop],callback:function(o){e.$set(e.form,t.prop,o)},expression:"form[column.prop]"}}):"input"===t.type?o("el-input",e._b({staticClass:"short-width",model:{value:e.form[t.prop],callback:function(o){e.$set(e.form,t.prop,o)},expression:"form[column.prop]"}},"el-input",t.props,!1)):"select"===t.type?o("form-select",e._b({staticClass:"search-select-item",attrs:{options:t.options},model:{value:e.form[t.prop],callback:function(o){e.$set(e.form,t.prop,o)},expression:"form[column.prop]"}},"form-select",t.props,!1)):"date"===t.type||"dateRange"===t.type?o("el-date-picker",e._b({style:{width:"date"===t.type?"215px":""},model:{value:e.form[t.prop],callback:function(o){e.$set(e.form,t.prop,o)},expression:"form[column.prop]"}},"el-date-picker",t.props,!1)):e._t(t.prop,null,{form:e.form})],2)})),e._t("default")],2)])],2)]),o("div",{staticClass:"search-btn"},[e._t("search-btn",[o("el-button",{attrs:{type:"primary"},on:{click:e.search}},[e._v("查 询")]),e.resettable?o("el-button",{on:{click:e.reset}},[e._v("重 置")]):e._e()]),e.showOpen?[!1===e.open?o("el-button",{attrs:{type:"text"},on:{click:function(t){e.open=!0}}},[e._v(" 展开 "),o("i",{staticClass:"el-icon-arrow-down"})]):e._e(),!0===e.open?o("el-button",{attrs:{type:"text"},on:{click:function(t){e.open=!1}}},[e._v(" 收起 "),o("i",{staticClass:"el-icon-arrow-up"})]):e._e()]:e._e()],2)])},i=[],a=(o("4160"),o("159b"),o("2422")),n=o("8604"),s={input:{placeholder:"请输入"},select:{placeholder:"请选择",clearable:!0},date:{placeholder:"选择日期",valueFormat:"timestamp",type:"date"},dateRange:{placeholder:"选择日期",valueFormat:"timestamp",type:"daterange",rangeSeparator:"至",startPlaceholder:"开始日期",endPlaceholder:"结束日期"}},l={name:"tableSearch",components:{FormSelect:a["a"],FormOrganize:n["a"]},props:{value:{},columns:{type:Array},resettable:{type:Boolean,default:!1},labelWidth:{type:String,default:"80px"}},directives:{resize:{bind:function(e,t){var o="",r="";function i(){var i=document.defaultView.getComputedStyle(e);o===i.width&&r===i.height||t.value(),o=i.width,r=i.height}e.__vueSetInterval__=setInterval(i,100)},unbind:function(e){clearInterval(e.__vueSetInterval__)}}},data:function(){return{defaultForm:{},form:{},showOpen:!1,open:!1}},watch:{value:{deep:!0,handler:function(e){this.form=Object.assign(this.form,e)}},columns:{deep:!0,handler:function(){this.resetForm()}},form:{deep:!0,handler:function(){this.$emit("input",this.form)}},open:function(){this.setHeight()}},created:function(){this.resetForm(),this.defaultForm=Object.assign({},this.form)},mounted:function(){this.$emit("input",this.form)},methods:{resetForm:function(){var e={};this.columns&&this.columns.length&&this.columns.forEach((function(t){t.props||(t.props={}),s[t.type]||(s[t.type]={}),t.props=Object.assign(t.props,s[t.type]),e[t.prop]=""})),this.form=Object.assign(e,this.value)},formResize:function(){this.$refs["form-box"]&&this.$refs["form-box"].clientHeight>60?(this.showOpen=!0,this.setHeight()):this.showOpen=!1},setHeight:function(){this.$refs["search-form"].style.height=this.open?this.$refs["form-box"].clientHeight+"px":"40px"},reset:function(){this.form=Object.assign({},this.defaultForm),this.$emit("reset",this.form)},search:function(){this.$emit("search",this.form)}}},c=l,p=(o("c41a"),o("2877")),u=Object(p["a"])(c,r,i,!1,null,"c04e5e04",null);t["a"]=u.exports},af68:function(e,t,o){},c41a:function(e,t,o){"use strict";o("af68")}}]);
//# sourceMappingURL=chunk-8424bc2a.b49bb252.js.map