<template>
  <div class="tabs-box">
    <el-tabs v-model="activeName">
      <el-tab-pane
        name="organization"
        @click.native="activeName = 'organization'"
      >
        <span slot="label" style="padding: 0 6px">组织架构</span>
        <div style="display: flex">
          <div style="width: 300px">
            <tide-combination
              v-if="options"
              :showCheckbox="false"
              nodeKey="id"
              :expandAll="true"
              @export="getSelect"
              ref="tideCombination"
              :options="options"
              children="sub_organizationDto"
            ></tide-combination>
          </div>
          <div
            style="padding-left: 20px;margin-left: 20px;flex: 1;border-left: 1px solid #eee"
          >
            <common-table
              ref="table"
              :headers="headers"
              :data="orgData"
              :canDelete="false"
              @editRow="editRow"
              @deleteComplete="deleteComplete"
            >
              <template v-slot:header-left>
                <el-button type="primary" size="small" @click="add">
                  <i class="el-icon-plus"></i>新增下级
                </el-button>
              </template>
            </common-table>
          </div>
        </div>
        <edit-dialog
          :columns="columns"
          :form="form"
          :options="editOptions"
          :visibleDialog.sync="visibleDialog"
          :title="title"
          @save="save"
        ></edit-dialog>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import CommonTable from "@/components/commonTable/table.vue";
import EditDialog from "@/components/commonTable/editDialog.vue";
import TideCombination from "@/components/combination/index.vue";

import {
  orgAddAPI,
  orgUpdateAPI,
  getAllOrgSettingAPI
} from "@/api/organize/index";

export default {
  name: "Organize",
  components: { CommonTable, EditDialog, TideCombination },
  data() {
    return {
      type: "add",
      activeName: "organization",
      title: "新增组织机构",
      visibleDialog: false,
      options: null,
      orgData: [],
      parent: null,
      form: {},
      editOptions: {
        labelWidth: "120px"
      },
      headers: [
        { prop: "index", label: "序号" },
        { prop: "name", label: "组织机构名称" },
        { prop: "action", label: "操作", width: "100px", fixed: "right" }
      ],
      columns: [
        {
          prop: "pId",
          label: "上级组织机构：",
          type: "select",
          options: [],
          props: { disabled: true }
        },
        { prop: "name", label: "名称：", type: "text", required: true }
      ]
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    loadData() {
      getAllOrgSettingAPI().then(res => {
        this.options = [res];
        if (!this.parent) {
          this.parent = this.options[0];
        }
        this.getSelect([this.parent]);
      });
    },
    getSelect(val) {
      this.orgData = this.getChildren(val[0].id, this.options) || [];
      this.columns[0].options = val;
      this.parent = val[0];
    },
    getChildren(pId, options) {
      for (let i = 0; i < options.length; i++) {
        if (options[i].id === pId) {
          return options[i].sub_organizationDto || [];
        }
        if (options[i].sub_organizationDto) {
          let result = this.getChildren(pId, options[i].sub_organizationDto);
          if (result) {
            return result;
          }
        }
      }
    },
    editRow(row) {
      this.form = row;
      this.type = "edit";
      this.title = "编辑组织机构";
      this.visibleDialog = true;
    },
    add() {
      this.form = {};
      this.type = "add";
      this.title = "新增组织机构";
      this.form.pId = this.parent.id;
      this.visibleDialog = true;
    },
    save(v) {
      let saveAPI = this.type === "add" ? orgAddAPI : orgUpdateAPI;
      let saveForm = Object.assign({}, v);
      saveAPI(saveForm)
        .then(() => {
          this.$message.success(`${this.title}成功`);
          this.visibleDialog = false;
          this.loadData();
        })
        .catch(message => {
          this.$message.error(`${this.title}失败：${message}`);
        });
    },
    deleteComplete() {
      this.loadData();
    }
  }
};
</script>
