(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6ef7dadd"],{"1d4b":function(e,t,a){"use strict";function s(){return[{id:1,name:"扣分"},{id:3,name:"加分"}]}function i(){return[{id:1,name:"扣分"}]}a.d(t,"b",(function(){return s})),a.d(t,"a",(function(){return i}))},2213:function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return o})),a.d(t,"f",(function(){return r})),a.d(t,"b",(function(){return c})),a.d(t,"e",(function(){return l})),a.d(t,"g",(function(){return u}));var s=a("afaa"),i=function(e){return Object(s["a"])({url:"/api-customer/community/policy/list",method:"GET",params:e})},n=function(e){return Object(s["a"])({url:"/api-customer/community/policy/listAll",method:"GET",params:e})},o=function(e){return Object(s["a"])({method:"POST",url:"/api-customer/community/policy/add",data:e})},r=function(e){return Object(s["a"])({method:"PUT",url:"/api-customer/community/policy/update",data:e})},c=function(e){return Object(s["a"])({method:"PUT",url:"/api-customer/community/policy/enablePolicy",params:e})},l=function(e){return Object(s["a"])({method:"GET",url:"/api-customer/community/policy/relevance",params:e})},u=function(e){return Object(s["a"])({method:"PUT",url:"/api-customer/community/policy/updateRelevance",data:e})}},"4fc6":function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"tabs-box"},[a("el-tabs",{model:{value:e.activeName,callback:function(t){e.activeName=t},expression:"activeName"}},[a("el-tab-pane",{attrs:{name:"strategy"},nativeOn:{click:function(t){e.activeName="strategy"}}},[a("span",{staticStyle:{padding:"0 6px"},attrs:{slot:"label"},slot:"label"},[e._v("策略维护")]),a("common-table",{ref:"table",attrs:{headers:e.headers,api:e.pageAPI,params:e.params,columns:e.columns,canDelete:!1,settings:["setting"]},on:{editRow:e.editRow},scopedSlots:e._u([{key:"header-left",fn:function(){return[a("el-button",{attrs:{type:"primary"},on:{click:e.add}},[a("i",{staticClass:"el-icon-plus"}),e._v("新增策略 ")]),a("el-button",{on:{click:e.setEva}},[e._v(" 评价设置 ")])]},proxy:!0},{key:"table-header",fn:function(){return[a("table-search",{attrs:{resettable:"",columns:e.searchColumns},on:{search:e.search},model:{value:e.params,callback:function(t){e.params=t},expression:"params"}})]},proxy:!0},{key:"action-prepend",fn:function(t){var s=t.row;return[a("el-button",{attrs:{type:"text"},on:{click:function(t){return e.concatRow(s)}}},[e._v("关联")])]}}])}),e.visibleDialog?a("edit-dialog",{attrs:{visibleDialog:e.visibleDialog,title:e.title,columns:e.columns,loading:e.loading,form:e.form},on:{"update:visibleDialog":function(t){e.visibleDialog=t},"update:visible-dialog":function(t){e.visibleDialog=t},save:e.submit},scopedSlots:e._u([{key:"assessmentPolicyDetail",fn:function(){return[a("form-table",{attrs:{columns:e.formColumns,"no-add":"",pagination:"",required:["caseDimensionId","assessmentType","singleThreshold"]},scopedSlots:e._u([{key:"singleScore",fn:function(t){var s=t.data;return[a("span",[e._v(e._s(s.scope.row.percent/100*s.scope.row.singleThreshold||0))])]}}],null,!1,3786824016),model:{value:e.assessmentPolicyDetail,callback:function(t){e.assessmentPolicyDetail=t},expression:"assessmentPolicyDetail"}}),a("div",{staticStyle:{position:"absolute",top:"58px",right:"0"}},[a("el-button",{attrs:{size:"small",type:"primary"},on:{click:e.saveDetailList}},[e._v(" 保存所有策略明细 ")])],1)]},proxy:!0}],null,!1,2014624672)}):e._e(),a("eva-setting",{attrs:{visibleDialog:e.showEva},on:{"update:visibleDialog":function(t){e.showEva=t},"update:visible-dialog":function(t){e.showEva=t}}}),a("concat-setting",{attrs:{visibleDialog:e.showConcat,data:e.concatData},on:{"update:visibleDialog":function(t){e.showConcat=t},"update:visible-dialog":function(t){e.showConcat=t}}})],1),a("el-tab-pane",{attrs:{name:"keywords"},nativeOn:{click:function(t){e.activeName="keywords"}}},[a("span",{staticStyle:{padding:"0 6px"},attrs:{slot:"label"},slot:"label"},[e._v("关键词维护")]),a("keywords")],1)],1)],1)},i=[],n=(a("99af"),a("4160"),a("c975"),a("b0c0"),a("a9e3"),a("b680"),a("d3b7"),a("159b"),a("96cf"),a("1da1")),o=a("1892"),r=a("ddde"),c=a("e66c"),l=a("6208"),u=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"keywords"},[a("common-table",{ref:"table",attrs:{headers:e.headers,api:e.pageAPI,params:e.params,columns:e.columns,deleteApi:e.deleteAPI,uploadURL:"/api-customer/community/keyword/import",modelUrl:e.modelUrl,settings:["setting","upload"]},on:{editRow:e.editRow,add:e.add},scopedSlots:e._u([{key:"table-header",fn:function(){return[a("table-search",{attrs:{resettable:"",columns:e.searchColumns},on:{search:e.search},model:{value:e.params,callback:function(t){e.params=t},expression:"params"}})]},proxy:!0}])}),e.visibleDialog?a("edit-dialog",{attrs:{visibleDialog:e.visibleDialog,title:e.title,columns:e.columns,loading:e.loading,form:e.form},on:{"update:visibleDialog":function(t){e.visibleDialog=t},"update:visible-dialog":function(t){e.visibleDialog=t},save:e.submit,formUpdate:e.formUpdate}}):e._e()],1)},d=[],m=(a("d81d"),a("2909")),p=a("9306"),f=a("79b1"),h={name:"case",components:{CommonTable:o["a"],EditDialog:r["a"],TableSearch:l["a"]},data:function(){return{pageAPI:p["d"],deleteAPI:p["b"],visibleDialog:!1,loading:!1,type:"add",title:"新增关键词",case:[],modelUrl:"",params:{},dimensionTree:[],commonOptions:{caseDimensions:[],caseReasons:[],subCaseReasons:[]},searchOptions:{caseDimensions:[],caseReasons:[],subCaseReasons:[]},headers:[{prop:"index",label:"序号"},{prop:"caseDimensionName",label:"案件维度"},{prop:"caseReasonName",label:"一级案由"},{prop:"subCaseReasonName",label:"二级案由"},{prop:"keyword",label:"关键词"},{prop:"updateTime",label:"修改时间",type:"date"},{prop:"userName",label:"添加人"},{prop:"action",label:"操作",width:100,fixed:"right"}],form:{},formData:{}}},computed:{searchColumns:function(){return[{prop:"caseDimensionId",label:"案件维度",type:"select",options:this.commonOptions.caseDimensions},{prop:"caseReasonId",label:"一级案由",type:"select",options:this.searchOptions.caseReasons},{prop:"subCaseReasonId",label:"二级案由",type:"select",options:this.searchOptions.subCaseReasons},{prop:"keyword",label:"关键词",type:"input"}]},columns:function(){return[{prop:"caseDimensionId",label:"案件维度",required:!0,type:"select",options:this.commonOptions.caseDimensions},{prop:"caseReasonId",label:"一级案由",type:"select",required:!0,options:this.commonOptions.caseReasons},{prop:"subCaseReasonId",label:"二级案由",type:"select",required:!0,options:this.commonOptions.subCaseReasons},{prop:"keyword",label:"关键词",type:"text",required:!0}]}},watch:{"params.caseDimensionId":function(e){this.dimensionChange(e,"search")},"params.caseReasonId":function(e){this.caseReasonChange(e,"search")},"formData.caseDimensionId":function(e){this.dimensionChange(e)},"formData.caseReasonId":function(e){this.caseReasonChange(e)}},created:function(){this.getOptions();var e=this.$store.state.auth.token;this.modelUrl="/api-customer/community/getFile?token=".concat(e,"&type=1")},methods:{getOptions:function(){this.getCaseDimensions()},getCaseDimensions:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(f["d"])();case 2:e.dimensionTree=t.sent,e.commonOptions.caseDimensions=(e.dimensionTree||[]).map((function(e){return{id:e.code,name:e.name}}));case 4:case"end":return t.stop()}}),t)})))()},search:function(){this.$refs.table.onQuery()},editRow:function(e){this.type="edit",this.title="编辑关键词",this.form=e,this.commonOptions.caseReasons=this.getTreeChildByCode(this.form.caseDimensionId,1),this.commonOptions.subCaseReasons=this.getTreeChildByCode(this.form.caseReasonId,2),this.visibleDialog=!0},add:function(){this.type="add",this.title="新增关键词",this.form={},this.visibleDialog=!0},submit:function(e){var t=this,a=Object.assign({},e);if(this.checkForm(a)){var s="add"===this.type?p["a"]:p["e"];this.loading=!0,s(a).then((function(){t.$message.success("".concat(t.title,"成功！")),t.visibleDialog=!1,t.$refs.table.refresh()})).catch((function(e){t.$message.error("".concat(t.title,"失败：").concat(e))})).finally((function(){t.loading=!1}))}},checkForm:function(e){if(e)return!0},formUpdate:function(e){this.formData=e},dimensionChange:function(e,t){"search"===t?(this.params.caseReasonId="",this.params.caseSubReasonId="",this.searchOptions.caseReasons=this.getTreeChildByCode(e,1)):(this.formData.caseReasonId="",this.formData.caseSubReasonId="",this.formData.caseKeyword=[],this.commonOptions.caseReasons=this.getTreeChildByCode(e,1))},caseReasonChange:function(e,t){"search"===t?(this.params.caseSubReasonId="",this.searchOptions.subCaseReasons=this.getTreeChildByCode(e,2)):(this.formData.caseSubReasonId="",this.formData.caseKeyword=[],this.commonOptions.subCaseReasons=this.getTreeChildByCode(e,2))},getTreeChildByCode:function(e,t){if(!e&&0!==e)return[];var a=[];switch(t){case 1:a=this.dimensionTree;break;case 2:(this.dimensionTree||[]).forEach((function(e){var t;(t=a).push.apply(t,Object(m["a"])(e.child||[]))}));break}var s=[];return a.forEach((function(t){e===t.code&&(s=(t.child||[]).map((function(e){return{id:e.code,name:e.name}})))})),s}}},b=h,y=a("2877"),v=Object(y["a"])(b,u,d,!1,null,null,null),g=v.exports,D=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.visible?a("edit-dialog",{attrs:{visibleDialog:e.visible,title:e.title,form:e.form,columns:e.columns,loading:e.loading},on:{"update:visibleDialog":function(t){e.visible=t},"update:visible-dialog":function(t){e.visible=t},save:e.submit,formUpdate:e.formUpdate},scopedSlots:e._u([{key:"baseScore",fn:function(){return[a("el-row",{attrs:{gutter:10}},e._l(e.form.levelScore,(function(t,s){return a("el-col",{key:s,style:{"min-width":"320px"},attrs:{span:6}},[a("el-form-item",{staticStyle:{"padding-top":"5px"},attrs:{label:e.caseLevelName[t.caseLevel]}},[a("el-input-number",{staticClass:"short-width",model:{value:t.baseScore,callback:function(a){e.$set(t,"baseScore",a)},expression:"item.baseScore"}})],1)],1)})),1)]},proxy:!0},{key:"evaluate",fn:function(){return[a("el-table",{staticStyle:{width:"100%"},attrs:{data:e.form.evaluate,border:""}},[a("el-table-column",{attrs:{type:"index",label:"序号",width:"50"}}),a("el-table-column",{attrs:{prop:"evaluateName",label:"评价",width:"180"}}),a("el-table-column",{attrs:{prop:"scoreFrom",label:"判断规则"},scopedSlots:e._u([{key:"default",fn:function(t){return[a("span",[e._v("考核得分在：")]),a("el-input-number",{attrs:{min:e.form.evaluate[t.$index+1]?e.form.evaluate[t.$index+1].scoreTo:0,max:t.row.scoreTo},model:{value:t.row.scoreFrom,callback:function(a){e.$set(t.row,"scoreFrom",a)},expression:"scope.row.scoreFrom"}}),a("span",{staticStyle:{display:"inline-block",margin:"0 10px"}},[e._v("至")]),a("el-input-number",{attrs:{min:t.row.scoreFrom,max:e.form.evaluate[t.$index-1]?e.form.evaluate[t.$index-1].scoreFrom:e.form.totalScore},model:{value:t.row.scoreTo,callback:function(a){e.$set(t.row,"scoreTo",a)},expression:"scope.row.scoreTo"}}),a("span",{staticStyle:{display:"inline-block",margin:"0 10px"}},[e._v("分")])]}}],null,!1,177617033)})],1)]},proxy:!0}],null,!1,2887077720)}):e._e()},k=[],w=a("8215"),O={name:"evaSetting",components:{EditDialog:r["a"]},props:{title:{type:String,default:"评价设置"},visibleDialog:{type:Boolean,default:!1}},data:function(){return{form:{totalScore:100,evaluate:[]},visible:!1,loading:!1,caseLevelName:{1:"一级案由",2:"二级案由",3:"三级案由"},columns:[{prop:"totalScore",label:"考核总分",type:"num",required:!0,cols:4},{prop:"caseInfo",label:"案由基础分",type:"title",cols:4},{prop:"baseScore",type:"custom",cols:4},{prop:"evaInfo",label:"考核评价",type:"title",cols:4},{prop:"evaluate",type:"custom",cols:4}]}},watch:{visibleDialog:{immediate:!0,handler:function(e){this.visible=e}},visible:{immediate:!0,handler:function(e){e&&this.loadData(),this.$emit("update:visibleDialog",e)}},"form.totalScore":function(e){this.checkScore(this.form.evaluate,e)}},methods:{loadData:function(){var e=this;Object(w["a"])().then((function(t){e.form=Object.assign(e.form,t)}))},formUpdate:function(e){this.form.totalScore=e.totalScore},submit:function(){var e=this;this.loading=!0,Object(w["c"])(this.form).then((function(){e.$message.success("评价设置更新成功！"),e.visible=!1})).catch((function(t){e.$message.error("评价设置更新失败："+t)})).finally((function(){e.loading=!1}))},checkScore:function(e,t){var a=this;e.forEach((function(s,i){var n=0===i?t:e[i-1].scoreFrom;a.checkItem(s,n)}))},checkItem:function(e,t){e.scoreTo=e.scoreTo>=t?t:e.scoreTo,e.scoreFrom=e.scoreFrom>=e.scoreTo?e.scoreTo:e.scoreFrom}}},C=O,x=Object(y["a"])(C,D,k,!1,null,"c7cb78d8",null),T=x.exports,R=function(){var e=this,t=e.$createElement,a=e._self._c||t;return e.visible?a("edit-dialog",{attrs:{visibleDialog:e.visible,title:e.title,form:e.form},on:{"update:visibleDialog":function(t){e.visible=t},"update:visible-dialog":function(t){e.visible=t},save:e.submit},scopedSlots:e._u([{key:"form-content",fn:function(){return[a("form-transfer",{attrs:{data:e.transferData,loading:e.loading},model:{value:e.communityIdList,callback:function(t){e.communityIdList=t},expression:"communityIdList"}})]},proxy:!0}],null,!1,3293416523)}):e._e()},S=[],P=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"form-transfer"},[a("div",{staticClass:"transfer-box left"},[a("div",{staticClass:"transfer-title"},[e._v(e._s(e.leftTitle))]),a("div",{staticClass:"search-box"},[a("el-input",{attrs:{size:"small",placeholder:"请输入内容"},model:{value:e.search.name,callback:function(t){e.$set(e.search,"name",t)},expression:"search.name"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1),a("el-tree",{directives:[{name:"loading",rawName:"v-loading",value:e.loading,expression:"loading"}],ref:"select-tree",attrs:{data:e.allData,"show-checkbox":"","node-key":e.defaultProps.key,props:e.defaultProps,"filter-node-method":e.filterNode,"default-expanded-keys":e.checkedKeys,"default-checked-keys":e.checkedKeys},on:{"check-change":e.checkChange}})],1),a("div",{staticClass:"transfer-box right"},[a("div",{staticClass:"transfer-title"},[e._v(e._s(e.rightTitle))]),a("div",{staticClass:"search-box"},[a("el-input",{attrs:{size:"small",placeholder:"请输入内容"},model:{value:e.search.selectName,callback:function(t){e.$set(e.search,"selectName",t)},expression:"search.selectName"}},[a("i",{staticClass:"el-icon-search el-input__icon",attrs:{slot:"suffix"},slot:"suffix"})])],1),a("div",{staticClass:"select-list"},[e._l(e.selectData,(function(t){return[a("div",{directives:[{name:"show",rawName:"v-show",value:t[e.defaultProps.label].indexOf(e.search.selectName)>-1||""===e.search.selectName,expression:"\n            item[defaultProps.label].indexOf(search.selectName) > -1 ||\n              search.selectName === ''\n          "}],key:t[e.defaultProps.key],staticClass:"select-item"},[a("div",{staticClass:"text"},[e._v(e._s(t[e.defaultProps.label]))]),a("div",{staticClass:"btn"},[a("el-button",{attrs:{type:"text",icon:"el-icon-close"},on:{click:function(a){return e.delRow(t)}}})],1)])]}))],2)])])},E=[],j=(a("4de4"),a("a434"),{name:"form-select",props:{value:{},data:{type:Array},leftTitle:{type:String,default:"请选择："},rightTitle:{type:String,default:"已选择："},loading:{type:Boolean,default:!1},defaultProps:{type:Object,default:function(){return{children:"children",label:"name",key:"id",selectKey:"type"}}}},data:function(){return{currentValue:[],search:{name:"",selectName:""},allData:[],filterAllData:[],selectData:[],filterSelectData:[],checkedKeys:[]}},watch:{value:function(){this.currentValue=this.value},data:{deep:!0,handler:function(){this.allData=this.data,this.loadData()}},currentValue:{deep:!0,handler:function(){this.loadData(),this.$emit("input",this.currentValue)}},"search.name":function(e){this.$refs["select-tree"].filter(e)}},created:function(){this.currentValue=this.value,this.allData=this.data,this.loadData()},methods:{loadData:function(){this.selectData=this.checkTreeList(this.allData,this.currentValue),this.checkedKeys=this.selectData.map((function(e){return e.id})),this.$refs["select-tree"]&&this.$refs["select-tree"].setCheckedKeys(this.checkedKeys)},checkTreeList:function(e,t){var a=this;if(!e||!e.length)return[];var s=[];return e.forEach((function(e){t&&t.indexOf(e[a.defaultProps.key])>-1&&(a.defaultProps.selectKey?e[a.defaultProps.selectKey]&&s.push(e):s.push(e)),e[a.defaultProps.children]&&(s=[].concat(Object(m["a"])(s),Object(m["a"])(a.checkTreeList(e[a.defaultProps.children],t))))})),s},delRow:function(e){var t=this;this.currentValue&&this.currentValue.length&&this.currentValue.forEach((function(a,s){a!==e.id||t.currentValue.splice(s,1)}))},checkChange:function(){var e=this.$refs["select-tree"].getCheckedKeys();this.currentValue=e.filter((function(e){return null!=e}))},filterNode:function(e,t){return!e||-1!==t[this.defaultProps.label].indexOf(e)}}}),I=j,_=(a("7d77"),Object(y["a"])(I,P,E,!1,null,"122e098e",null)),$=_.exports,N=a("2213"),L={name:"concatSetting",components:{EditDialog:r["a"],FormTransfer:$},props:{data:{type:Object,require:!0},title:{type:String,default:"关联设置"},visibleDialog:{type:Boolean,default:!1}},data:function(){return{form:{},visible:!1,communityIdList:[],transferData:[]}},watch:{visibleDialog:{immediate:!0,handler:function(e){this.visible=e}},visible:{immediate:!0,handler:function(e){e&&this.loadData(),this.$emit("update:visibleDialog",e)}}},methods:{loadData:function(){var e=this;this.loading=!0,Object(N["e"])({id:this.data.id}).then((function(t){e.transferData=t.left;var a=[];t.right&&t.right.length&&t.right.forEach((function(e){a.push(e.communityId)})),e.communityIdList=a,e.loading=!1}))},submit:function(){var e=this,t={policyId:this.data.id,communityIdList:this.communityIdList};this.loading=!0,Object(N["g"])(t).then((function(t){t.errorList&&t.errorList.length?t.errorList.forEach((function(t,a){setTimeout((function(){e.$message.error(t.message)}),100*a)})):e.$message.success("策略关联更新成功！"),e.visible=!1})).catch((function(t){e.$message.error("策略关联更新失败："+t)})).finally((function(){e.loading=!1}))}}},F=L,U=Object(y["a"])(F,R,S,!1,null,"215a34c6",null),B=U.exports,K=a("1d4b"),A={name:"Strategy",components:{CommonTable:o["a"],EditDialog:r["a"],FormTable:c["a"],TableSearch:l["a"],Keywords:g,EvaSetting:T,ConcatSetting:B},data:function(){return{pageAPI:N["d"],activeName:"strategy",visibleDialog:!1,loading:!1,showEva:!1,showConcat:!1,concatData:{},type:"add",title:"新增策略",strategy:[],params:{},scoreLevels:[],caseDimensiontree:[],dimensionList:[],headers:[{prop:"index",label:"序号"},{prop:"policyName",label:"策略名称"},{prop:"relationCommunityNumber",label:"关联社区"},{prop:"userName",label:"创建人"},{prop:"updateTime",label:"更新时间",type:"date"},{prop:"action",label:"操作",width:100,fixed:"right"}],searchColumns:[{prop:"policyName",label:"策略名称",type:"input"}],columns:[{prop:"policyName",label:"策略名称",type:"text",required:!0,cols:4},{prop:"assessmentInfo",label:"策略设置",type:"title",cols:4},{prop:"assessmentPolicyDetail",type:"custom",cols:4}],form:{assessmentPolicyDetail:[]},assessmentPolicyDetail:[],formColumns:[{prop:"caseDimensionName",label:"案件维度",type:"readOnly"},{prop:"caseReasonName",label:"一级案由",type:"readOnly"},{prop:"subCaseReasonName",label:"二级案由",type:"readOnly"},{prop:"assessmentType",label:"考核方式",type:"select",options:Object(K["a"])()},{prop:"singleThreshold",label:"案由基础分",type:"text",append:"分"},{prop:"percent",label:"引导系数",type:"text",append:"%"},{prop:"singleScore",label:"单次扣分",type:"custom"}]}},created:function(){this.getOptions()},methods:{getOptions:function(){this.getCaseDimensions()},getCaseDimensions:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(w["a"])();case 2:return a=t.sent,e.scoreLevels=a.levelScore||[],t.next=6,Object(f["d"])();case 6:e.caseDimensiontree=t.sent,e.dimensionList=e.getListByTree(e.caseDimensiontree);case 8:case"end":return t.stop()}}),t)})))()},search:function(){this.$refs.table.onQuery()},editRow:function(e){this.type="edit",this.title="编辑策略";var t=JSON.parse(JSON.stringify(e));t.assessmentPolicyDetail&&t.assessmentPolicyDetail.length&&t.assessmentPolicyDetail.forEach((function(e){e.percent=(100*e.scoresPercentage).toFixed(2),e.isEdit=0})),this.form=Object.assign({},t,{assessmentPolicyDetail:[]}),this.assessmentPolicyDetail=t.assessmentPolicyDetail,this.visibleDialog=!0},add:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e.type="add",e.title="新增策略",e.form={isSpecCommunityFacilities:0},e.dimensionList=e.getListByTree(e.caseDimensiontree),e.assessmentPolicyDetail=e.dimensionList,e.visibleDialog=!0;case 6:case"end":return t.stop()}}),t)})))()},concatRow:function(e){this.concatData=e,this.showConcat=!0},saveDetailList:function(){this.assessmentPolicyDetail.forEach((function(e){e.isEdit=!1}))},setEva:function(){this.showEva=!0},stopRow:function(e){var t=this;Object(N["b"])({id:e.id}).then((function(){t.$message.success("状态切换成功！"),t.$refs.table.refresh()})).catch((function(e){t.$message.error("".concat(t.title,"失败：").concat(e))}))},submit:function(e){var t=this,a=Object.assign({},e);if(a.assessmentPolicyDetail=this.assessmentPolicyDetail,this.checkForm(a)){var s="add"===this.type?N["a"]:N["f"];this.loading=!0,s(a).then((function(){t.$message.success("".concat(t.title,"成功！")),t.visibleDialog=!1,t.$refs.table.refresh()})).catch((function(e){t.$message.error("".concat(t.title,"失败：").concat(e))})).finally((function(){t.loading=!1}))}},checkForm:function(e){if(!e.assessmentPolicyDetail||!e.assessmentPolicyDetail.length)return this.$message.error("请先填写策略设置明细！"),!1;var t=!1,a=!1,s=[];return e.assessmentPolicyDetail.forEach((function(e){e.scoresPercentage=Number(e.percent/100),e.singleThreshold=Number(e.singleThreshold),e.isEdit&&(t=!0),s.indexOf(e.subCaseReasonId)>-1?a=!0:s.push(e.subCaseReasonId)})),t?(this.$message.error("请先保存所有策略设置明细！"),!1):!a||(this.$message.error("相同报案缘由只能设置一次扣分策略！"),!1)},getListByTree:function(e){var t=this,a=[];return e.forEach((function(e){(e.child||[]).forEach((function(s){(s.child||[]).forEach((function(i){a.push({caseDimensionId:e.code,caseDimensionName:e.name,caseReasonId:s.code,caseReasonName:s.name,subCaseReasonId:i.code,subCaseReasonName:i.name,assessmentType:1,singleThreshold:t.getScoreByLevel(i.caseLevel),percent:100,isEdit:1})}))}))})),a},getScoreByLevel:function(e){var t=0;return(this.scoreLevels||[]).forEach((function(a){e===a.caseLevel&&(t=a.baseScore)})),t}}},V=A,q=Object(y["a"])(V,s,i,!1,null,null,null);t["default"]=q.exports},"79b1":function(e,t,a){"use strict";a.d(t,"c",(function(){return i})),a.d(t,"a",(function(){return n})),a.d(t,"e",(function(){return o})),a.d(t,"b",(function(){return r})),a.d(t,"d",(function(){return c}));var s=a("afaa"),i=function(e){return Object(s["a"])({url:"/api-customer/community/case/list",method:"GET",params:e})},n=function(e){return Object(s["a"])({method:"POST",url:"/api-customer/community/case/add",data:e})},o=function(e){return Object(s["a"])({method:"PUT",url:"/api-customer/community/case/update",data:e})},r=function(e){return Object(s["a"])({method:"DELETE",url:"/api-customer/community/case/delete?id=".concat(e.id)})},c=function(e){return Object(s["a"])({method:"GET",url:"/api-customer/community/queryCaseDimensions/cascade",params:e})}},"7d77":function(e,t,a){"use strict";a("b35a")},8215:function(e,t,a){"use strict";a.d(t,"a",(function(){return i})),a.d(t,"b",(function(){return n})),a.d(t,"c",(function(){return o}));var s=a("afaa"),i=function(e){return Object(s["a"])({url:"/api-customer/community/evaluate/list",method:"GET",params:e})},n=function(e){return Object(s["a"])({url:"/api-customer/community/evaluate/listAll",method:"GET",params:e})},o=function(e){return Object(s["a"])({method:"PUT",url:"/api-customer/community/evaluate/update",data:e})}},9306:function(e,t,a){"use strict";a.d(t,"d",(function(){return i})),a.d(t,"c",(function(){return n})),a.d(t,"a",(function(){return o})),a.d(t,"e",(function(){return r})),a.d(t,"b",(function(){return c}));var s=a("afaa"),i=function(e){return Object(s["a"])({url:"/api-customer/community/keyword/list",method:"GET",params:e})},n=function(e){return Object(s["a"])({url:"/api-customer/community/keyword/getAll",method:"GET",params:e})},o=function(e){return Object(s["a"])({method:"POST",url:"/api-customer/community/keyword/add",data:e})},r=function(e){return Object(s["a"])({method:"PUT",url:"/api-customer/community/keyword/update",data:e})},c=function(e){return Object(s["a"])({method:"DELETE",url:"/api-customer/community/keyword/delete?id=".concat(e.id)})}},b35a:function(e,t,a){}}]);
//# sourceMappingURL=chunk-6ef7dadd.72807f10.js.map