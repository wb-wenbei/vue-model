<template>
  <div class="table-form-content">
    <el-table border :data="tableData" class="form-table" style="width: 100%">
      <el-table-column type="index" label="序号" :width="indexWidth">
      </el-table-column>
      <el-table-column
        v-for="column in columns"
        :key="column.prop"
        :label="column.label"
        min-width="120px"
        :width="
          column.type === 'timeRange'
            ? '220px'
            : column.type === 'dateRange'
            ? '240px'
            : column.type === 'date'
            ? '160px'
            : ''
        "
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <template v-if="column.type === 'text'">
            <span v-if="!scope.row.isEdit">
              {{ scope.row[column.prop] }}
              <span v-if="column.append">{{ column.append }}</span>
            </span>
            <el-input
              v-else
              v-model="scope.row[column.prop]"
              size="small"
              v-bind="column.props"
              style="width: 120px"
              :disabled="column.disabled"
            >
              <template v-if="column.append" slot="append">
                {{ column.append }}
              </template>
            </el-input>
          </template>
          <template
            v-if="column.type === 'select' || column.type === 'select-multiple'"
          >
            <select-label
              v-if="!scope.row.isEdit"
              :keyId="scope.row[column.prop]"
              :data="
                scope.row.options
                  ? scope.row.options[column.prop] || column.options
                  : column.options
              "
            ></select-label>
            <form-select
              v-else
              :multiple="
                column.type === 'select-multiple' && scope.$index === 0
              "
              v-model="scope.row[column.prop]"
              :options="
                scope.row.options
                  ? scope.row.options[column.prop] || column.options
                  : column.options
              "
              :disabled="column.disabled"
              @change="onChange(column.prop, $event, scope)"
              v-bind="column.props"
            ></form-select>
          </template>
          <template v-if="column.type === 'date'">
            <span v-if="!scope.row.isEdit">
              {{ scope.row[column.prop] | timeFormat }}
            </span>
            <el-date-picker
              v-else
              v-model="scope.row[column.prop]"
              size="small"
              value-format="timestamp"
              v-bind="column.props"
            ></el-date-picker>
          </template>
          <template v-if="column.type === 'dateRange'">
            <span v-if="!scope.row.isEdit">
              {{ scope.row[column.prop][0] | timeFormat }} 至
              {{ scope.row[column.prop][1] | timeFormat }}
            </span>
            <el-date-picker
              v-else
              v-model="scope.row[column.prop]"
              size="small"
              type="daterange"
              value-format="timestamp"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :disabled="column.disabled"
              v-bind="column.props"
              @change="onChange(column.prop, $event, scope)"
            >
            </el-date-picker>
          </template>
          <template v-if="column.type === 'timeRange'">
            <span v-if="!scope.row.isEdit">
              {{ scope.row[column.prop][0] }} 至
              {{ scope.row[column.prop][1] }}
            </span>
            <el-time-picker
              v-else
              is-range
              size="small"
              value-format="HH:mm"
              v-model="scope.row[column.prop]"
              :picker-options="{ format: 'HH:mm' }"
              @change="onChange(column.prop, $event, scope)"
              range-separator="至"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              placeholder="选择时间范围"
            >
            </el-time-picker>
          </template>
          <template v-if="column.type === 'org'">
            <cb-select
              v-if="scope.row.isEdit"
              v-model="scope.row[column.prop]"
              :disabled="!scope.row.isEdit"
              @input="onChange(column.prop, $event, scope)"
            ></cb-select>
            <span v-else>
              {{ getOrgNameById(scope.row[column.prop], baseOrgs) }}
            </span>
          </template>
          <template v-if="column.type === 'custom'">
            <slot
              :name="column.prop"
              v-bind:data="{ scope: scope, column: column }"
            ></slot>
          </template>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="140">
        <template slot-scope="scope">
          <el-button
            v-if="!scope.row.isEdit"
            type="text"
            size="small"
            @click="rowEdit(scope.row, scope)"
            >编辑</el-button
          >
          <template v-else>
            <el-button type="text" size="small" @click="saveRow(scope.row)"
              >保存</el-button
            >
            <el-button
              v-if="!scope.row.isAdd"
              type="text"
              size="small"
              @click="cancelRow(scope.row)"
              >取消</el-button
            >
          </template>
          <el-button
            v-if="!scope.row.isEdit || scope.row.isAdd"
            @click="deleteRow(scope.row, scope.$index)"
            type="text"
            size="small"
            >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="padding: 10px 0">
      <el-button
        v-if="!isAdding"
        style="width: 100%"
        icon="el-icon-plus"
        @click="addRow"
      >
        {{ addTitle }}
      </el-button>
    </div>
  </div>
</template>

<script>
import FormSelect from "@/components/form/select.vue";
import CbSelect from "@/components/combination/index.vue";
import SelectLabel from "@/components/commonTable/selectLabel.vue";
import { getOrgNameById } from "./config/index";

/* columns: [
     {prop: 'user', label: '发起/审批人', type: 'select', options: []},
     {prop: 'name', label: '姓名', type: 'text'},
     {prop: 'date', label: '日期', type: 'date'},
     {prop: 'orgId', label: '组织机构', type: 'org'},
   ],*/

export default {
  name: "flowFormTable",
  components: { FormSelect, CbSelect, SelectLabel },
  props: {
    value: {},
    columns: {
      type: Array,
      default() {
        return [];
      }
    },
    defaultRow: {
      type: Object,
      default() {
        return {};
      }
    },
    indexWidth: { type: String, default: "50px" },
    addTitle: { type: String, default: "添加设置" },
    docType: { type: String },
    employees: {
      type: Array,
      default() {
        return [];
      }
    },
    employeeTypes: {
      type: Array,
      default() {
        return [];
      }
    },
    required: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      getOrgNameById,
      isAdding: false,
      baseOrgs: [],
      tableData: []
    };
  },
  watch: {
    value: {
      immediate: true,
      deep: true,
      handler(v) {
        this.tableData = this.getData(v);
      }
    },
    tableData: {
      deep: true,
      handler(v) {
        this.$emit("input", v);
      }
    }
  },
  created() {
    this.baseOrgs = this.$store.state.auth.baseOrgList;
  },
  methods: {
    getData(data) {
      let result = data || [];
      result.forEach(v => {
        if (!v.isEdit) {
          v.isEdit = 0;
        }
      });
      if (!result.length) {
        this.isAdding = false;
      }
      return result;
    },
    reset() {
      this.isAdding = false;
    },
    addRow() {
      let data = JSON.parse(
        JSON.stringify(Object.assign({ isEdit: 1, isAdd: 1 }, this.defaultRow))
      );
      this.tableData.push(data);
      console.log(this.tableData, this.defaultRow);
      this.isAdding = true;
    },
    rowEdit(row) {
      row.isEdit = 1;
      delete row.editRow;
      row.editRow = Object.assign({}, row);
    },
    saveRow(row) {
      let canSubmit = true;
      this.required.forEach(key => {
        if (
          row[key] === "" ||
          row[key] === undefined ||
          row[key] === null ||
          row[key] === []
        ) {
          canSubmit = false;
        }
      });
      if (canSubmit) {
        row.isEdit = 0;
        row.isAdd = 0;
        row.editRow = {};
        this.getRowName(row);
        this.isAdding = false;
      } else {
        this.$message.error("请将信息填写完整后保存！");
      }
    },
    getRowName(row) {
      //获取orgName
      if (row.orgId && !row.orgName) {
        row.orgName = getOrgNameById(row.orgId, this.baseOrgs);
      }
    },
    cancelRow(row) {
      row = Object.assign(row, row.editRow);
      row.isEdit = 0;
      this.isAdding = false;
    },
    deleteRow(row, index) {
      this.$confirm(`确定要删除吗？`)
        .then(() => {
          this.tableData.splice(index, 1);
          this.isAdding = false;
        })
        .catch(() => {
          this.isAdding = false;
        });
    },
    onChange(type, event, scope) {
      this.$emit("change", type, event, scope.row);
    }
  }
};
</script>

<style scoped lang="scss">
.table-form-content {
  .form-table {
    ::v-deep .cell {
      display: flex;
    }

    ::v-deep .el-table__empty-block {
      max-height: 50px;
      background: white !important;
    }

    ::v-deep .el-range-separator {
      line-height: 32px !important;
    }
  }
}
</style>
