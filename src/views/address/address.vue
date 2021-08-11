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
      <template v-slot:upload-header>
        <div style="text-align: center;margin-bottom: 20px">
          <el-radio-group v-model="uploadType">
            <el-radio :label="1">扩展地址上传</el-radio>
            <el-radio :label="2">社区别名上传</el-radio>
          </el-radio-group>
        </div>
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
        <div style="margin: 0 20px">社区名称：{{ form.name }}</div>
        <div class="address-edit-content">
          <div class="address-edit-item">
            <div class="address-form-title">社区别名</div>
            <form-table
              v-model="aliasInfoList"
              add-title="添加社区别名"
              :columns="communityColumns"
              :defaultRow="defaultRow"
              @saveRow="saveAlias"
              @deleteRow="deleteAlias"
            ></form-table>
          </div>
          <div class="address-edit-item">
            <div class="address-form-title">扩展地址</div>
            <form-table
              v-model="addressInfoList"
              add-title="添加扩展地址"
              :columns="addressColumns"
              :defaultRow="defaultRow"
              @saveRow="saveAddress"
              @deleteRow="deleteAddress"
            ></form-table>
          </div>
        </div>
      </template>
      <template v-slot:form-action>
        <el-button type="primary" @click="closeEdit">
          确定
        </el-button>
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
      uploadType: 1,
      params: {},
      form: {},
      headers: [
        { prop: "index", label: "序号" },
        { prop: "name", label: "社区名称" },
        { prop: "address", label: "标准地址" },
        { prop: "aliasCount", label: "社区别称数" },
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
          prop: "communityAddress",
          label: "扩展地址",
          type: "text"
        }
      ],
      commonOptions: {
        communities: []
      },
      defaultRow: {
        communityId: ""
      },
      addressInfoList: [],
      aliasInfoList: []
    };
  },
  computed: {
    searchColumns() {
      return [
        {
          prop: "communityName",
          label: "社区名称",
          type: "input"
        }
      ];
    },
    uploadURL() {
      return this.uploadType === 1
        ? "/api-customer/service-wisdom-town/community/address/import"
        : "/api-customer/service-wisdom-town/community/alias/import";
    },
    modelUrl() {
      return `/api-customer/service-wisdom-town/community/${
        this.uploadType === 1 ? "address" : "alias"
      }/downloadTemplate?token=${this.$store.state.userInfo.token}`;
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
      this.defaultRow.communityId = row.id;
      this.form = row;
      this.aliasInfoList = (row.aliasInfoList || []).map(item => {
        return {
          id: item.id,
          isEdit: 0,
          communityId: item.communityId,
          communityName: item.communityName
        };
      });
      this.addressInfoList = (row.addressInfoList || []).map(item => {
        return {
          id: item.id,
          isEdit: 0,
          communityId: item.communityId,
          communityAddress: item.communityAddress
        };
      });
      this.visibleDialog = true;
    },
    saveAlias(row) {
      let api = row.id ? updateAliasAPI : addAliasAPI;
      this.saveApi(api, Object.assign(row, { aliasName: row.communityName }));
    },
    deleteAlias(row) {
      if (row.id) {
        this.saveApi(deleteAliasAPI, { id: row.id }, "删除");
      }
    },
    saveAddress(row) {
      let api = row.id ? updateAddressAPI : addAddressAPI;
      this.saveApi(api, Object.assign(row, { address: row.communityAddress }));
    },
    deleteAddress(row) {
      if (row.id) {
        this.saveApi(deleteAddressAPI, { id: row.id }, "删除");
      }
    },
    saveApi(api, form, title = "保存") {
      api(form)
        .then(() => {
          this.$message.success(title + "成功！");
        })
        .catch(err => {
          this.$message.error(title + "失败：" + err);
        });
    },
    closeEdit() {
      this.visibleDialog = false;
      this.$refs.table.refresh();
    }
  }
};
</script>

<style scoped lang="scss">
@import "src/styles/theme";
.address-edit-content {
  display: flex;

  .address-edit-item {
    flex: 1;
    padding: 20px;
    box-sizing: border-box;
  }
}

.address-form-title {
  margin: 10px;
  position: relative;
  font-weight: bold;
}

.address-form-title::before {
  content: "";
  position: absolute;
  left: -10px;
  top: 3px;
  height: 14px;
  width: 2px;
  background: $--color-primary;
}
</style>
