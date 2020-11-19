<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane name="roles" @click.native="activeName = 'roles'">
        <span slot="label" style="padding: 0 6px">角色管理</span>
        <common-table
          ref="table"
          :headers="headers"
          :api="pageAPI"
          :deleteApi="deleteAPI"
          :settings="['setting']"
          @editRow="editRow"
          @add="add"
        ></common-table>
        <edit-dialog
          :visibleDialog.sync="visibleDialog"
          :title="title"
          :columns="columns"
          :loading="loading"
          :form="form"
          @save="submit"
        >
          <template v-slot:menuDtos>
            <el-form-item label="角色权限" required style="padding-top: 5px">
              <select-group
                :menuOptionsOrg="totalMenus"
                :mactchMenus="matchMenu"
                v-model="menuDtos"
              ></select-group>
            </el-form-item>
          </template>
        </edit-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table";
import EditDialog from "@/components/commonTable/editDialog";
import SelectGroup from "./components/selectGroup";

import {
  pageAPI,
  deleteAPI,
  addAPI,
  updateAPI,
  listAPI,
  getRoleMenuAPI
} from "@/api/roles/index";

export default {
  name: "Roles",
  components: { CommonTable, EditDialog, SelectGroup },
  data() {
    return {
      pageAPI,
      deleteAPI,
      activeName: "roles",
      visibleDialog: false,
      loading: false,
      type: "add",
      title: "添加角色",
      roles: [],
      totalMenus: [],
      matchMenu: [],
      headers: [
        { prop: "index", label: "序号" },
        { prop: "name", label: "角色名称", width: "200px" },
        { prop: "menuDtos", label: "角色权限", filter: this.getMenus },
        { prop: "action", label: "操作", width: 140, fixed: "right" }
      ],
      columns: [
        { prop: "name", label: "角色名称", type: "text", required: true },
        {
          prop: "menuDtos",
          label: "角色权限",
          type: "custom",
          required: true,
          cols: 4
        }
      ],
      menuDtos: [],
      form: {
        name: "",
        menuDtos: []
      },
      props: {
        children: "sonMenus",
        label: "name",
        value: "id"
      }
    };
  },
  created() {
    this.getRoles();
    this.getRoleMenus();
  },
  methods: {
    getRoles() {
      listAPI().then(res => {
        this.roles = res;
      });
    },
    getRoleMenus() {
      getRoleMenuAPI().then(res => {
        this.totalMenus = res || [];
      });
    },
    editRow(row) {
      this.type = "edit";
      this.title = "编辑角色";
      this.form = row;
      this.matchMenu = row.menuDtos;
      this.visibleDialog = true;
    },
    add() {
      this.type = "add";
      this.title = "添加角色";
      this.form = {};
      this.matchMenu = [];
      this.visibleDialog = true;
    },
    submit(form) {
      if (!this.menuDtos.length) {
        this.$message.error("请选择角色权限！");
        return;
      }
      let saveForm = Object.assign(form, { menuDtos: this.menuDtos });
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
    },
    getMenus(menus) {
      let result = [];
      menus.forEach(menu => {
        result.push(menu.name);
      });
      return result.toString();
    }
  }
};
</script>

<style scoped lang="scss">
.tabs-box {
  padding: 0 30px 16px;
}
</style>
