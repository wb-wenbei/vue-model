<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="account" @click.native="activeName = 'account'">
        <span slot="label" style="padding: 0 6px">账号管理</span>
        <common-table
          ref="table"
          :headers="headers"
          :api="getUserListAPI"
          :params="params"
          :settings="['setting']"
          @editRow="editRow"
          @deleteRow="deleteRow"
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
          :loading="loading"
          @save="submit"
        >
          <template v-slot:form-content>
            <div class="account-form">
              <el-form
                ref="form"
                style="position: relative"
                :model="form"
                :rules="accountRules"
                label-width="80px"
              >
                <el-form-item label="用户名" prop="userName">
                  <el-input
                    class="medium-width"
                    v-model="form.userName"
                  ></el-input>
                </el-form-item>
                <div
                  style="position: absolute;top: 8px;left: 400px;width: 100px;"
                >
                  <el-link
                    v-if="type === 'edit'"
                    :underline="false"
                    type="primary"
                    @click="showPassword = !showPassword"
                    >修改密码</el-link
                  >
                </div>

                <el-form-item v-if="showPassword" label="密码" prop="password">
                  <el-input
                    class="medium-width"
                    show-password
                    v-model="form.password"
                  ></el-input>
                </el-form-item>
                <el-form-item
                  v-if="showPassword"
                  label="确认密码"
                  prop="checkPassword"
                >
                  <el-input
                    class="medium-width"
                    show-password
                    v-model="form.checkPassword"
                  ></el-input>
                </el-form-item>
                <el-form-item label="组织架构" prop="orgId">
                  <form-organize
                    v-model="form.orgId"
                    class="medium-width"
                  ></form-organize>
                </el-form-item>
                <el-form-item label="角色权限" prop="roleIds">
                  <form-select
                    v-model="form.roleIds"
                    class="medium-width"
                    multiple
                    :options="options.roles"
                  ></form-select>
                </el-form-item>
              </el-form>
            </div>
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
import FormOrganize from "@/components/form/organize";
import FormSelect from "@/components/form/select";
import { accountRules } from "./config/formValidator";

import {
  getAccountListAPI,
  getUserListAPI,
  getRolesListAPI,
  delUserBoundsAPI,
  addUserBoundsAPI,
  editUserBoundsAPI
} from "@/api/account/index";

export default {
  name: "Account",
  components: {
    CommonTable,
    TableSearch,
    EditDialog,
    FormOrganize,
    FormSelect
  },
  data() {
    return {
      getUserListAPI,
      accountRules,
      activeName: "account",
      visibleDialog: false,
      showPassword: false,
      loading: false,
      type: "add",
      title: "新增账号",
      options: {
        roles: [],
        account: []
      },
      params: {},
      searchColumns: [
        { prop: "userId", label: "用户名", type: "select", options: [] },
        { prop: "orgId", label: "组织机构", type: "org" },
        { prop: "roleIds", label: "角色权限", type: "select", options: [] }
      ],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "userName", label: "用户名" },
        { prop: "orgName", label: "组织机构" },
        { prop: "roleNames", label: "角色权限", filter: this.filterRolesName },
        { prop: "action", label: "操作", width: 100, fixed: "right" }
      ],
      form: {}
    };
  },
  created() {
    this.getRoleList();
    this.getAccountList();
  },
  methods: {
    getRoleList() {
      getRolesListAPI().then(res => {
        let roles = [];
        res.forEach(item => {
          roles.push({ id: item.id, name: item.name });
        });
        this.options.roles = roles;
        this.searchColumns[2].options = roles;
      });
    },
    getAccountList() {
      getAccountListAPI().then(res => {
        this.options.accounts = res || [];
        this.searchColumns[0].options = res || [];
      });
    },
    search() {
      this.$refs.table.onQuery();
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑账号";
      this.form = row;
      this.showPassword = false;
      this.visibleDialog = true;
    },
    deleteRow(row) {
      this.$confirm("确定要删除吗？").then(() => {
        delUserBoundsAPI({ recordId: row.id })
          .then(() => {
            this.$message.success("账号删除成功！");
            this.$refs.table.refresh();
            this.getAccountList();
          })
          .catch(err => {
            this.$message.error("账号删除失败：" + err);
          });
      });
    },
    add() {
      this.type = "add";
      this.title = "新增账号";
      this.form = {};
      this.showPassword = true;
      this.visibleDialog = true;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let api = this.type === "add" ? addUserBoundsAPI : editUserBoundsAPI;
          this.loading = true;
          this.form.manageId = [this.form.orgId];
          if (this.type === "edit") {
            this.form.recordId = this.form.id;
          }
          if (!this.showPassword) {
            delete this.form.password;
            delete this.form.checkPassword;
          }
          api(this.form)
            .then(() => {
              this.$message.success(`${this.title}成功！`);
              this.visibleDialog = false;
              this.$refs.table.refresh();
              this.getAccountList();
            })
            .catch(err => {
              this.$message.error(`${this.title}失败：${err}`);
            })
            .finally(() => {
              this.loading = false;
            });
        }
      });
    },
    filterRolesName(roles) {
      return roles ? roles.toString() : "--";
    }
  }
};
</script>

<style scoped lang="scss">
.account-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;

  .show-password {
    margin: 0 0 10px 80px;
    color: #3b7cef;
  }
}
</style>
