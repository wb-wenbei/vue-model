(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-566e08b4"],{"6a39":function(t,e,i){"use strict";i("80d7")},"80d7":function(t,e,i){},e419:function(t,e,i){"use strict";i.d(e,"d",(function(){return a})),i.d(e,"c",(function(){return s})),i.d(e,"a",(function(){return n})),i.d(e,"f",(function(){return r})),i.d(e,"b",(function(){return d})),i.d(e,"e",(function(){return c}));var o=i("afaa"),a=function(t){return Object(o["a"])({url:"/api-customer/service-wisdom-town/community/list",method:"GET",params:t})},s=function(t){return Object(o["a"])({url:"/api-customer/service-wisdom-town/community/getAll",method:"GET",params:t})},n=function(t){return Object(o["a"])({method:"POST",url:"/api-customer/service-wisdom-town/community/insert",data:t})},r=function(t){return Object(o["a"])({method:"PUT",url:"/api-customer/service-wisdom-town/community/update",data:t})},d=function(t){return Object(o["a"])({method:"DELETE",url:"/api-customer/service-wisdom-town/community/delete?id=".concat(t.id)})},c=function(t){return Object(o["a"])({url:"/api-customer/service-wisdom-town/community/queryPolice",method:"GET",params:t})}},f168:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"tabs-box"},[i("common-table",{ref:"table",attrs:{headers:t.headers,api:t.pageAPI,params:t.params,"can-add":!1,"can-delete":!1,uploadURL:t.uploadURL,modelUrl:t.modelUrl,settings:["setting","upload"]},on:{editRow:t.editRow},scopedSlots:t._u([{key:"table-header",fn:function(){return[i("table-search",{attrs:{resettable:"",labelWidth:"90px",columns:t.searchColumns},on:{search:t.search},model:{value:t.params,callback:function(e){t.params=e},expression:"params"}})]},proxy:!0},{key:"upload-header",fn:function(){return[i("div",{staticStyle:{"text-align":"center","margin-bottom":"20px"}},[i("el-radio-group",{model:{value:t.uploadType,callback:function(e){t.uploadType=e},expression:"uploadType"}},[i("el-radio",{attrs:{label:1}},[t._v("扩展地址上传")]),i("el-radio",{attrs:{label:2}},[t._v("社区别名上传")])],1)],1)]},proxy:!0}])}),t.visibleDialog?i("edit-dialog",{attrs:{visibleDialog:t.visibleDialog,title:t.title,loading:t.loading,form:t.form},on:{"update:visibleDialog":function(e){t.visibleDialog=e},"update:visible-dialog":function(e){t.visibleDialog=e}},scopedSlots:t._u([{key:"form-content",fn:function(){return[i("div",{staticStyle:{margin:"0 20px"}},[t._v("社区名称："+t._s(t.form.name))]),i("div",{staticClass:"address-edit-content"},[i("div",{staticClass:"address-edit-item"},[i("div",{staticClass:"address-form-title"},[t._v("社区别名")]),i("form-table",{attrs:{"add-title":"添加社区别名",columns:t.communityColumns,defaultRow:t.defaultRow},on:{saveRow:t.saveAlias,deleteRow:t.deleteAlias},model:{value:t.aliasInfoList,callback:function(e){t.aliasInfoList=e},expression:"aliasInfoList"}})],1),i("div",{staticClass:"address-edit-item"},[i("div",{staticClass:"address-form-title"},[t._v("扩展地址")]),i("form-table",{attrs:{"add-title":"添加扩展地址",columns:t.addressColumns,defaultRow:t.defaultRow},on:{saveRow:t.saveAddress,deleteRow:t.deleteAddress},model:{value:t.addressInfoList,callback:function(e){t.addressInfoList=e},expression:"addressInfoList"}})],1)])]},proxy:!0},{key:"form-action",fn:function(){return[i("el-button",{attrs:{type:"primary"},on:{click:t.closeEdit}},[t._v(" 确定 ")])]},proxy:!0}],null,!1,3361640485)}):t._e()],1)},a=[],s=(i("99af"),i("d81d"),i("96cf"),i("1da1")),n=i("1892"),r=i("ddde"),d=i("6208"),c=i("e66c"),u=i("afaa"),m=function(t){return Object(u["a"])({url:"/api-customer/service-wisdom-town/communityAliasAddress/list",method:"GET",params:t})},l=function(t){return Object(u["a"])({method:"POST",url:"/api-customer/service-wisdom-town/community/address/add",data:t})},p=function(t){return Object(u["a"])({method:"PUT",url:"/api-customer/service-wisdom-town/community/address/update",data:t})},f=function(t){return Object(u["a"])({method:"DELETE",url:"/api-customer/service-wisdom-town/community/address/delete",params:t})},b=function(t){return Object(u["a"])({method:"POST",url:"/api-customer/service-wisdom-town/community/alias/add",data:t})},v=function(t){return Object(u["a"])({method:"PUT",url:"/api-customer/service-wisdom-town/community/alias/update",data:t})},h=function(t){return Object(u["a"])({method:"DELETE",url:"/api-customer/service-wisdom-town/community/alias/delete",params:t})},y=i("e419"),w={name:"Address",components:{CommonTable:n["a"],EditDialog:r["a"],TableSearch:d["a"],formTable:c["a"]},data:function(){return{pageAPI:m,visibleDialog:!1,loading:!1,type:"add",title:"新增地址",uploadType:1,params:{},form:{},headers:[{prop:"index",label:"序号"},{prop:"name",label:"社区名称"},{prop:"address",label:"标准地址"},{prop:"aliasCount",label:"社区别称数"},{prop:"addressCount",label:"扩展地址数"},{prop:"action",label:"操作",width:100,fixed:"right"}],communityColumns:[{prop:"communityName",label:"社区别名",type:"text"}],addressColumns:[{prop:"communityAddress",label:"扩展地址",type:"text"}],commonOptions:{communities:[]},defaultRow:{communityId:""},addressInfoList:[],aliasInfoList:[]}},computed:{searchColumns:function(){return[{prop:"communityIds",label:"社区名称",type:"select",options:this.commonOptions.communities}]},uploadURL:function(){return 1===this.uploadType?"/api-customer/service-wisdom-town/community/address/import":"/api-customer/service-wisdom-town/community/alias/import"},modelUrl:function(){return"/api-customer/service-wisdom-town/community/".concat(1===this.uploadType?"address":"alias","/downloadTemplate?token=").concat(this.$store.state.userInfo.token)}},created:function(){this.getOptions()},methods:{getOptions:function(){this.getCommunities()},getCommunities:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(y["c"])();case 2:t.commonOptions.communities=e.sent;case 3:case"end":return e.stop()}}),e)})))()},search:function(){this.$refs.table.onQuery()},editRow:function(t){this.type="edit",this.title="编辑地址",this.defaultRow.communityId=t.id,this.form=t,this.aliasInfoList=(t.aliasInfoList||[]).map((function(t){return{id:t.id,isEdit:0,communityId:t.communityId,communityName:t.communityName}})),this.addressInfoList=(t.addressInfoList||[]).map((function(t){return{id:t.id,isEdit:0,communityId:t.communityId,communityAddress:t.communityAddress}})),this.visibleDialog=!0},saveAlias:function(t){var e=t.id?v:b;this.saveApi(e,Object.assign(t,{aliasName:t.communityName}))},deleteAlias:function(t){t.id&&this.saveApi(h,{id:t.id},"删除")},saveAddress:function(t){var e=t.id?p:l;this.saveApi(e,Object.assign(t,{address:t.communityAddress}))},deleteAddress:function(t){t.id&&this.saveApi(f,{id:t.id},"删除")},saveApi:function(t,e){var i=this,o=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"保存";t(e).then((function(){i.$message.success(o+"成功！")})).catch((function(t){i.$message.error(o+"失败："+t)}))},closeEdit:function(){this.visibleDialog=!1,this.$refs.table.refresh()}}},g=w,O=(i("6a39"),i("2877")),A=Object(O["a"])(g,o,a,!1,null,"3bf5ae5c",null);e["default"]=A.exports}}]);
//# sourceMappingURL=chunk-566e08b4.37104b68.js.map