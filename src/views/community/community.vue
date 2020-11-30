<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="community" @click.native="activeName = 'community'">
        <span slot="label" style="padding: 0 6px">社区管理</span>
        <common-table
          ref="table"
          :headers="headers"
          :api="pageAPI"
          :params="params"
          :columns="columns"
          :deleteApi="deleteAPI"
          :settings="['setting']"
          @editRow="editRow"
          @add="add"
        >
          <template v-slot:table-header>
            <table-search
              v-model="params"
              resettable
              :columns="searchColumns"
              @search="search"
            ></table-search>
          </template>
        </common-table>
        <edit-dialog
          :visibleDialog.sync="visibleDialog"
          :title="title"
          :columns="columns"
          :loading="loading"
          :form="form"
          @save="submit"
        >
          <template v-slot:communityAddress="{ form }">
            <address-select v-model="form.communityAddress"></address-select>
          </template>
          <template v-slot:propertyFee="{ form }">
            <property-select v-model="form.propertyFee"></property-select>
          </template>
        </edit-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import PropertySelect from "./components/property-select";
import AddressSelect from "./components/address-select";
import { getTypeList } from "@/utils/index";

import { pageAPI, deleteAPI, addAPI, updateAPI } from "@/api/community/index";

export default {
  name: "Community",
  components: {
    CommonTable,
    EditDialog,
    TableSearch,
    PropertySelect,
    AddressSelect
  },
  data() {
    return {
      pageAPI,
      deleteAPI,
      activeName: "community",
      visibleDialog: false,
      loading: false,
      type: "add",
      title: "新增社区",
      community: [],
      totalMenus: [],
      matchMenu: [],
      params: {},
      searchColumns: [
        { prop: "communityName", label: "社区名称", type: "input" },
        { prop: "orgId", label: "归属物业", type: "org" },
        {
          prop: "communityLevel",
          label: "社区等级",
          type: "select",
          options: []
        },
        {
          prop: "communityType",
          label: "社区类型",
          type: "select",
          options: []
        }
      ],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "communityName", label: "社区名称" },
        { prop: "orgName", label: "归属物业" },
        { prop: "communityTypeName", label: "社区类型" },
        { prop: "communityLevelName", label: "社区等级" },
        { prop: "buildingArea", label: "建筑面积" },
        { prop: "buildingYear", label: "建成年份" },
        { prop: "householdsNumber", label: "人口户数" },
        { prop: "updateTime", label: "更新时间", type: "date" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      columns: [
        { prop: "basicInfo", label: "基础信息", type: "title" },
        {
          prop: "communityName",
          label: "社区名称",
          type: "text",
          required: true
        },
        {
          prop: "communityTypeId",
          label: "社区类型",
          type: "select",
          required: true,
          options: []
        },
        {
          prop: "communityLevelId",
          label: "社区等级",
          type: "select",
          required: true,
          options: []
        },
        { prop: "orgId", label: "归属物业", type: "org", required: true },
        {
          prop: "projectNature",
          label: "项目性质",
          type: "select",
          required: true,
          options: []
        },
        {
          prop: "communityAddress",
          label: "社区地址",
          required: true,
          cols: 4
        },
        {
          prop: "lngLat",
          label: "社区位置",
          type: "address",
          required: true,
          cols: 2
        },
        { prop: "assessInfo", label: "评估信息", type: "title" },
        {
          prop: "buildingArea",
          label: "建筑面积",
          type: "num",
          required: true
        },
        {
          prop: "buildingYear",
          label: "建成年份",
          type: "text",
          required: true
        },
        {
          prop: "peopleEngagedNumber",
          label: "从业人数",
          type: "num",
          required: true
        },
        {
          prop: "householdsNumber",
          label: "人口户数",
          type: "num",
          required: true
        },
        { prop: "propertyFee", label: "物业费", required: true, cols: 4 },
        {
          prop: "isSpecCommunityFacilities",
          label: "安全屋",
          type: "radio",
          required: true,
          options: [
            { id: 1, name: "是" },
            { id: 0, name: "否" }
          ]
        }
      ],
      form: {}
    };
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      this.getLevels();
      this.getTypes();
      this.getNatures();
    },
    async getLevels() {
      let communityLevels = await getTypeList("COMMUNITY_LEVEL");
      this.searchColumns[2].options = communityLevels;
      this.columns[3].options = communityLevels;
    },
    async getTypes() {
      let communityTypes = await getTypeList("COMMUNITY_TYPE");
      this.searchColumns[3].options = communityTypes;
      this.columns[2].options = communityTypes;
    },
    async getNatures() {
      let projectNatures = await getTypeList("PROJECT_NATURE");
      this.columns[5].options = projectNatures;
    },
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑社区";
      this.form = row;
      if (row.lng && row.lat) {
        this.form.lngLat = [row.lng, row.lat];
      }
      this.visibleDialog = true;
    },
    add() {
      this.type = "add";
      this.title = "新增社区";
      this.form = { isSpecCommunityFacilities: 0 };
      this.visibleDialog = true;
    },
    submit(form) {
      let saveForm = Object.assign({}, form);
      if (this.checkForm(saveForm)) {
        let api = this.type === "add" ? addAPI : updateAPI;
        this.loading = true;
        api(saveForm)
          .then(() => {
            this.$message.success(`${this.title}成功！`);
            this.visibleDialog = false;
            this.$refs.table.refresh();
          })
          .catch(err => {
            this.$message.error(`${this.title}失败：${err}`);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    checkForm(form) {
      if (!form.communityAddress || !form.communityAddress.length) {
        this.$message.error("请填写社区地址！");
        return false;
      } else {
        let check = false;
        form.communityAddress.forEach(v => {
          if (v.address) {
            check = true;
          }
        });
        if (!check) {
          this.$message.error("请填写社区地址！");
        }
      }

      if (!form.propertyFee || !form.propertyFee.length) {
        this.$message.error("请至少完整填写一项物业费！");
        return false;
      } else {
        let check = false;
        form.propertyFee.forEach(v => {
          if (v.amount && v.standard) {
            check = true;
          }
        });
        if (!check) {
          this.$message.error("请至少完整填写一项物业费！");
        }
      }

      if (!form.lngLat || !form.lngLat.length) {
        this.$message.error("请选择社区位置！");
        return false;
      } else {
        if (form.lngLat[0] && form.lngLat[1]) {
          [form.lng, form.lat] = form.lngLat;
        } else {
          this.$message.error("请选择社区位置！");
          return false;
        }
      }
      return true;
    }
  }
};
</script>
