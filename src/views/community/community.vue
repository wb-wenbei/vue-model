<template>
  <div class="tabs-box">
    <common-table
      ref="table"
      :headers="headers"
      :api="pageAPI"
      :params="params"
      :columns="columns"
      :modelUrl="modelUrl"
      :uploadURL="uploadURL"
      :settings="['setting', 'upload']"
      :deleteApi="deleteAPI"
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
      v-if="visibleDialog"
      :title="title"
      :columns="columns"
      :loading="loading"
      :form="form"
      @save="submit"
    >
      <template v-slot:communityAddress="{ form }">
        <address-select
          v-model="form.communityAddress"
          :limit="1"
        ></address-select>
      </template>
      <template v-slot:propertyFee="{ form }">
        <property-select v-model="form.propertyFee"></property-select>
      </template>
      <template v-slot:buildingYear="{ form }">
        <year-select v-model="form.buildingYear"></year-select>
      </template>
    </edit-dialog>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import PropertySelect from "./components/property-select";
import AddressSelect from "./components/address-select";
import YearSelect from "./components/year-select";
import { getTypeList, getEntityType } from "@/utils/index";

import {
  pageAPI,
  deleteAPI,
  addAPI,
  updateAPI,
  getPoliceAPI
} from "@/api/community";
import { getAllAPI } from "@/api/committee/index";

export default {
  name: "Community",
  components: {
    CommonTable,
    EditDialog,
    TableSearch,
    PropertySelect,
    AddressSelect,
    YearSelect
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
      modelUrl: "",
      uploadURL: "/api-customer/service-wisdom-town/committee/import",
      community: [],
      totalMenus: [],
      matchMenu: [],
      params: {},
      commonOptions: {
        communityLevels: [],
        communityTypes: [],
        projectNatures: [],
        committees: [],
        properties: [],
        polices: []
      },
      headers: [
        { prop: "index", label: "序号" },
        { prop: "communityName", label: "社区名称" },
        { prop: "propertyName", label: "归属物业" },
        { prop: "committeeName", label: "归属居委" },
        { prop: "policeName", label: "管理民警" },
        { prop: "communityTypeName", label: "社区类型" },
        { prop: "communityLevelName", label: "社区等级" },
        { prop: "buildingArea", label: "建筑面积" },
        { prop: "buildingYear", label: "建成年份", filter: this.getYear },
        { prop: "householdsNumber", label: "人口户数" },
        { prop: "updateTime", label: "更新时间", type: "date" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      form: {}
    };
  },
  computed: {
    searchColumns() {
      return [
        { prop: "communityName", label: "社区名称", type: "input" },
        {
          prop: "propertyId",
          label: "归属物业",
          type: "select",
          options: this.commonOptions.properties
        },
        {
          prop: "committeeId",
          label: "归属居委",
          type: "select",
          options: this.commonOptions.committees
        },
        {
          prop: "communityLevel",
          label: "社区等级",
          type: "select",
          options: this.commonOptions.communityLevels
        },
        {
          prop: "communityType",
          label: "社区类型",
          type: "select",
          options: this.commonOptions.communityTypes
        }
      ];
    },
    columns() {
      return [
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
          options: this.commonOptions.communityTypes
        },
        {
          prop: "communityLevelId",
          label: "社区等级",
          type: "select",
          required: true,
          options: this.commonOptions.communityLevels
        },
        {
          prop: "propertyId",
          label: "归属物业",
          type: "select",
          required: true,
          options: this.commonOptions.properties
        },
        {
          prop: "committeeId",
          label: "归属居委",
          type: "select",
          options: this.commonOptions.committees
        },
        {
          prop: "projectNatureId",
          label: "项目性质",
          type: "select",
          required: true,
          options: this.commonOptions.projectNatures
        },
        {
          prop: "policeId",
          label: "管理民警",
          type: "select",
          options: this.commonOptions.polices
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
        { prop: "buildingYear", label: "建成年份", required: true, cols: 4 },
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
      ];
    }
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      this.getLevels();
      this.getTypes();
      this.getNatures();
      this.getPolices();
      this.getCommittees();
      this.getProperties();
    },
    async getLevels() {
      this.commonOptions.communityLevels = await getTypeList("COMMUNITY_LEVEL");
    },
    async getTypes() {
      this.commonOptions.communityTypes = await getTypeList("COMMUNITY_TYPE");
    },
    async getNatures() {
      this.commonOptions.projectNatures = await getTypeList("PROJECT_NATURE");
    },
    async getPolices() {
      this.commonOptions.polices = await getPoliceAPI();
    },
    async getCommittees() {
      this.commonOptions.committees = await getAllAPI({
        entityType: getEntityType("COMMITTEE")
      });
    },
    async getProperties() {
      this.commonOptions.properties = await getAllAPI({
        entityType: getEntityType("PROPERTY")
      });
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
      this.form = {
        isSpecCommunityFacilities: 0,
        propertyFee: [{ standard: "标准1" }]
      };
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
    getYear(e) {
      let result = "--";
      if (e && e.length) {
        if (e.length === 1) {
          result = e[0].year;
        } else {
          let min = e[0].year,
            max = e[0].year;
          e.forEach(v => {
            min = Math.min(v.year, min);
            max = Math.max(v.year, max);
          });
          result = min + " - " + max;
        }
      }
      return result;
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
          return false;
        }
      }

      if (!form.buildingYear || !form.buildingYear.length) {
        this.$message.error("请至少完整填写一项建成年份！");
        return false;
      } else {
        let check = false;
        form.buildingYear.forEach(v => {
          if (v.year) {
            check = true;
          }
        });
        if (!check) {
          this.$message.error("请至少完整填写一项建成年份！");
          return false;
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
