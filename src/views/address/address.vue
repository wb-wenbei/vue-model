<template>
  <div class="tabs-box">
    <common-table
      ref="table"
      :headers="headers"
      :api="pageAPI"
      :params="params"
      :can-add="false"
      :can-delete="false"
      :uploadURL="uploadURL"
      :modelUrl="modelUrl"
      :settings="['setting', 'upload']"
      @editRow="editRow"
    >
      <template v-slot:table-header>
        <table-search
          v-model="params"
          resettable
          labelWidth="90px"
          :columns="searchColumns"
          @search="search"
        ></table-search>
      </template>
    </common-table>
    <edit-dialog
      v-if="visibleDialog"
      :visibleDialog.sync="visibleDialog"
      :title="title"
      :loading="loading"
      :form="form"
    >
      <template v-slot:form-content>
        <div class="address-edit-content">
          <div class="address-edit-item">
            <div class="address-edit-title">社区别名</div>
            <form-table
              v-model="form.community"
              add-title="添加社区别名"
              :columns="communityColumns"
              @saveRow="saveAlias"
              @deleteRow="deleteAlias"
            ></form-table>
          </div>
          <div class="address-edit-item">
            <div class="address-edit-title">扩展地址</div>
            <form-table
              v-model="form.address"
              add-title="添加扩展地址"
              :columns="addressColumns"
              @saveRow="saveAddress"
              @deleteRow="deleteAddress"
            ></form-table>
          </div>
        </div>
      </template>
    </edit-dialog>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import TableSearch from "@/components/commonTable/tableSearch.vue";
import formTable from "@/components/form/formTable.vue";

import {
  pageAPI,
  addAddressAPI,
  updateAddressAPI,
  deleteAddressAPI,
  addAliasAPI,
  updateAliasAPI,
  deleteAliasAPI
} from "@/api/address/index";
import { getAllAPI as communityListAPI } from "@/api/community/index";

export default {
  name: "Address",
  components: {
    CommonTable,
    EditDialog,
    TableSearch,
    formTable
  },
  data() {
    return {
      pageAPI,
      visibleDialog: false,
      loading: false,
      type: "add",
      title: "新增地址",
      modelUrl: "",
      uploadURL: "/api-customer/community/address/import",
      params: {},
      headers: [
        { prop: "index", label: "序号" },
        { prop: "communityName", label: "社区名称" },
        { prop: "address", label: "标准地址" },
        { prop: "communityCount", label: "社区别称数" },
        { prop: "addressCount", label: "扩展地址数" },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      communityColumns: [
        {
          prop: "communityName",
          label: "社区别名",
          type: "text"
        }
      ],
      addressColumns: [
        {
          prop: "address",
          label: "扩展地址",
          type: "text"
        }
      ],
      commonOptions: {
        communities: []
      },
      form: {
        community: [],
        address: []
      }
    };
  },
  computed: {
    searchColumns() {
      return [
        {
          prop: "communityId",
          label: "社区名称",
          type: "select",
          options: this.commonOptions.communities
        }
      ];
    }
  },
  created() {
    this.getOptions();
  },
  methods: {
    getOptions() {
      this.getCommunities();
    },
    async getCommunities() {
      this.commonOptions.communities = await communityListAPI();
    },
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑地址";
      this.form = Object.assign({}, row);
      this.visibleDialog = true;
    },
    saveAlias(row) {
      let api = row.id ? addAliasAPI : updateAliasAPI;
      this.saveApi(api, row);
    },
    deleteAlias(row) {
      if (row.id) {
        this.saveApi(deleteAliasAPI, row, "删除");
      }
    },
    saveAddress(row) {
      let api = row.id ? addAddressAPI : updateAddressAPI;
      this.saveApi(api, row);
    },
    deleteAddress(row) {
      if (row.id) {
        this.saveApi(deleteAddressAPI, row, "删除");
      }
    },
    saveApi(api, form, title = "保存") {
      api(form)
        .then(() => {
          this.$message.success(title + "成功！");
        })
        .catch(err => {
          this.$message.error(title + "失败：" + err);
        })
        .finally(() => {
          this.refreshData();
        });
    },
    refreshData() {

    }
  }
};
</script>

<style scoped lang="scss">
.address-edit-content {
  display: flex;

  .address-edit-item {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;

    .address-edit-title {
      margin: 10px;
      position: relative;
      font-weight: bold;
    }

    .address-edit-title::before {
      content: "";
      position: absolute;
      left: -10px;
      top: 3px;
      height: 14px;
      width: 2px;
      background: #3b7cef;
    }
  }
}
</style>
