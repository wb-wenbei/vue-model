<template>
  <el-dialog
    custom-class="table-edit-dialog"
    :title="title"
    :width="width"
    :top="top"
    :close-on-click-modal="false"
    :visible.sync="visibleDialog"
    :before-close="closeDialog"
  >
    <div slot="title" class="dialog-title">
      <slot name="dialog-header">{{ title }}</slot>
    </div>
    <slot name="form-header" v-bind:form="defaultForm"></slot>
    <slot name="form-content" v-bind:form="defaultForm">
      <el-form
        v-if="visibleDialog && defaultForm"
        ref="table-form"
        :model="defaultForm"
        :rules="rules"
        :label-width="defaultOptions.labelWidth"
      >
        <el-row :gutter="10">
          <el-col
            v-for="column in columns"
            :key="column.prop"
            :span="(24 / defaultOptions.rows) * (column.cols || 1)"
            :style="{ 'min-width': defaultOptions.colMinWidth }"
          >
            <slot v-if="column.type === 'custom'" :name="column.prop"></slot>
            <el-form-item
              v-else
              :label="column.label"
              :prop="column.prop"
              style="padding-top: 5px"
            >
              <el-input
                v-if="column.type === 'text'"
                class="form-normal-width"
                v-model="defaultForm[column.prop]"
                v-bind="column.props"
              >
              </el-input>
              <el-input-number
                v-else-if="column.type === 'num'"
                class="form-normal-width"
                v-model="defaultForm[column.prop]"
                v-bind="column.props"
              ></el-input-number>
              <el-date-picker
                v-else-if="column.type === 'date'"
                v-model="defaultForm[column.prop]"
                v-bind="column.props"
              >
              </el-date-picker>
              <el-input
                v-else-if="column.type === 'textArea'"
                v-model="defaultForm[column.prop]"
                type="textarea"
                v-bind="column.props"
              >
              </el-input>
              <form-select
                v-else-if="column.type === 'select'"
                v-model="defaultForm[column.prop]"
                :options="column.options"
                v-bind="column.props"
              ></form-select>
              <form-radio
                v-else-if="column.type === 'radio'"
                v-model="defaultForm[column.prop]"
                :options="column.options"
                v-bind="column.props"
              ></form-radio>
              <form-checkbox
                v-else-if="column.type === 'checkbox'"
                v-model="defaultForm[column.prop]"
                :options="column.options"
                v-bind="column.props"
              ></form-checkbox>
              <upload-img
                v-else-if="column.type === 'upload'"
                v-model="defaultForm[column.prop]"
                v-bind="column.props"
              >
              </upload-img>
              <form-upload-image
                v-else-if="column.type === 'uploadImage'"
                v-model="defaultForm[column.prop]"
                v-bind="column.props"
              >
              </form-upload-image>
              <!--<form-address
                v-else-if="column.type === 'address'"
                v-model="defaultForm[column.prop]"
                v-bind="column.props"
              >
              </form-address>-->
              <slot v-else :name="column.prop" v-bind:form="defaultForm"></slot>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </slot>
    <slot name="form-footer" v-bind:form="defaultForm"></slot>
    <div slot="footer" class="dialog-footer">
      <slot name="form-action" v-bind:form="defaultForm">
        <slot name="action-prepend"></slot>
        <el-button
          type="primary"
          size="small"
          @click="save"
          :disabled="loading"
          >{{ saveBtn }}</el-button
        >
        <el-button
          v-if="canSaveAndCreate"
          type="primary"
          size="small"
          :disabled="loading"
          @click="saveAndCreate"
        >
          保存再新增
        </el-button>
        <el-button size="small" @click="closeDialog">{{ cancelBtn }}</el-button>
        <slot name="action-append"></slot>
      </slot>
    </div>
  </el-dialog>
</template>

<script>
/**
 * columns: 参数说明
 * prop:表单字段
 * label:表单字段名称
 * type:表单类型 text/num/select/date/textArea
 * cols：行占位（1：占一个位置，2：占两个位置...）
 * props：表单组件参数补充
 * options:type为select时的选项数据 {id:'1',name:'选项一',id:'2',name:'选项二'}
 * required:表单验证-required（rules简写）
 * rules:表单验证，会覆盖required
 */

import FormSelect from "@/components/form/select.vue";
import FormCheckbox from "@/components/form/checkbox.vue";
import FormRadio from "@/components/form/radio.vue";
// import FormAddress from "@/components/form/address";
import FormUploadImage from "@/components/form/uploadImage";

import "./css/index.scss";

const defaultProps = {
  text: {
    size: "small",
    placeholder: "请输入"
  },
  num: {
    size: "small"
  },
  select: {
    size: "small",
    placeholder: "请选择",
    clearable: true
  },
  date: {
    size: "small",
    placeholder: "选择日期",
    valueFormat: "timestamp",
    type: "date"
  },
  textArea: {
    size: "small",
    placeholder: "请输入",
    rows: "3"
  },
  upload: {
    limit: 10
  }
};

/*columns: [
    {prop: 'name', label: '名称', type: 'text', required: true},
    {
      prop: 'num', label: '数量', type: 'num',
      props: {min: 0, max: 100, precision: 2},
    },
    {
      prop: 'select',
      label: '选择框',
      type: 'select',
      props: {clearable: true},
      options: [{id: '1', name: '选项1'}, {id: '2', name: '选项2'}]
    },
    {prop: 'date', label: '日期', type: 'date'},
    {prop: 'content', label: '描述', type: 'textArea', cols: 2},
    {prop: 'other', label: '其他', cols: 2},
    {prop: 'other2', label: '其他'},
    {prop: 'files1', label: '上传',type:'upload', cols: 2}
  ]*/

export default {
  name: "editDialog",
  props: {
    width: { type: String, default: "80%" },
    top: { type: String, default: "10vh" },
    canSaveAndCreate: { type: Boolean, default: false },
    visibleDialog: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    title: { type: String, default: "信息编辑" },
    columns: { type: Array },
    form: { type: Object },
    options: { type: Object },
    saveBtn: { type: String, default: "保 存" },
    cancelBtn: { type: String, default: "取 消" }
  },
  components: {
    FormSelect,
    FormCheckbox,
    FormRadio,
    FormUploadImage
  },
  data() {
    return {
      tableForm: null,
      rules: {},
      defaultForm: {},
      defaultOptions: {
        rows: 2,
        colMinWidth: "320px",
        labelWidth: "100px"
      }
    };
  },
  watch: {
    form: {
      deep: true,
      handler() {
        this.resetForm();
      }
    },
    defaultForm: {
      deep: true,
      handler() {
        this.$emit("formUpdate", this.defaultForm);
      }
    }
  },
  created() {
    Object.assign(this.defaultOptions, this.options);
    this.resetForm();
  },
  methods: {
    save() {
      if (this.$refs["table-form"]) {
        this.$refs["table-form"].validate(valid => {
          if (valid) {
            this.$emit("save", this.defaultForm);
          } else {
            return false;
          }
        });
      } else {
        this.$emit("save", this.defaultForm);
      }
    },
    saveAndCreate() {
      if (this.$refs["table-form"]) {
        this.$refs["table-form"].validate(valid => {
          if (valid) {
            this.$emit("saveAndCreate", this.defaultForm);
          } else {
            return false;
          }
        });
      } else {
        this.$emit("saveAndCreate", this.defaultForm);
      }
    },
    closeDialog() {
      this.$confirm("确定关闭该页面吗?").then(() => {
        this.$emit("update:visibleDialog", false);
      });
    },
    resetForm() {
      let defaultForm = {};
      if (this.columns && this.columns.length) {
        this.columns.forEach(column => {
          if (!column.props) {
            column.props = {};
          }
          if (!defaultProps[column.type]) {
            defaultProps[column.type] = {};
          }
          column.props = Object.assign(
            {},
            defaultProps[column.type],
            column.props
          );
          if (
            column.type === "upload" ||
            column.type === "checkbox" ||
            column.type === "address"
          ) {
            defaultForm[column.prop] = [];
          } else {
            defaultForm[column.prop] = "";
          }
          if (column.rules) {
            this.rules[column.prop] = column.rules;
          } else {
            if (column.required) {
              this.rules[column.prop] = [
                {
                  trigger: "blur,change",
                  required: true,
                  message:
                    "请输入" + column.label.replace("：", "").replace(":", "")
                }
              ];
            }
          }
        });
      }
      this.defaultForm = Object.assign(defaultForm, this.form);
    },
    canSave() {
      let result = false;
      if (this.$refs["table-form"]) {
        this.$refs["table-form"].validate(valid => {
          if (valid) {
            result = true;
          } else {
            result = false;
          }
        });
      }
      return result;
    }
  }
};
</script>
