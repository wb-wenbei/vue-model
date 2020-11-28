<template>
  <div class="table-search">
    <div ref="search-form" class="search-form" v-resize="formResize">
      <div ref="form-box">
        <slot>
          <el-form
            ref="form"
            :model="form"
            :inline="true"
            :label-width="labelWidth"
          >
            <el-form-item
              v-for="(column, index) in columns"
              :key="index"
              :label="column.label"
              :label-width="column.labelWidth"
            >
              <form-organize
                v-if="column.type === 'org'"
                v-model="form[column.prop]"
              ></form-organize>

              <el-input
                v-else-if="column.type === 'input'"
                v-model="form[column.prop]"
                v-bind="column.props"
                class="short-width"
              >
              </el-input>

              <form-select
                class="search-select-item"
                v-else-if="column.type === 'select'"
                v-model="form[column.prop]"
                :options="column.options"
                v-bind="column.props"
              ></form-select>

              <el-date-picker
                v-else-if="
                  column.type === 'date' || column.type === 'dateRange'
                "
                :style="{ width: column.type === 'date' ? '215px' : '' }"
                v-model="form[column.prop]"
                v-bind="column.props"
              ></el-date-picker>
              <slot v-else :name="column.prop" :form="form"></slot>
            </el-form-item>
            <slot></slot>
          </el-form>
        </slot>
      </div>
    </div>
    <div class="search-btn">
      <slot name="search-btn">
        <el-button type="primary" @click="search">查 询</el-button>
        <el-button v-if="resettable" @click="reset">重 置</el-button>
      </slot>
      <template v-if="showOpen">
        <el-button v-if="open === false" type="text" @click="open = true">
          展开 <i class="el-icon-arrow-down"></i>
        </el-button>
        <el-button v-if="open === true" type="text" @click="open = false">
          收起 <i class="el-icon-arrow-up"></i>
        </el-button>
      </template>
    </div>
  </div>
</template>

<script>
import FormSelect from "@/components/form/select.vue";
import FormOrganize from "@/components/form/organize";

const defaultProps = {
  input: {
    placeholder: "请输入"
  },
  select: {
    placeholder: "请选择",
    clearable: true
  },
  date: {
    placeholder: "选择日期",
    valueFormat: "timestamp",
    type: "date"
  },
  dateRange: {
    placeholder: "选择日期",
    valueFormat: "timestamp",
    type: "daterange",
    rangeSeparator: "至",
    startPlaceholder: "开始日期",
    endPlaceholder: "结束日期"
  }
};

export default {
  name: "tableSearch",
  components: { FormSelect, FormOrganize },
  props: {
    value: {},
    columns: { type: Array },
    resettable: { type: Boolean, default: false },
    labelWidth: { type: String, default: "80px" }
  },
  directives: {
    resize: {
      bind(el, binding) {
        let width = "",
          height = "";

        function isResize() {
          const style = document.defaultView.getComputedStyle(el);
          if (width !== style.width || height !== style.height) {
            binding.value();
          }
          width = style.width;
          height = style.height;
        }

        el.__vueSetInterval__ = setInterval(isResize, 100);
      },
      unbind(el) {
        clearInterval(el.__vueSetInterval__);
      }
    }
  },
  data() {
    return {
      defaultForm: {},
      form: {},
      showOpen: false,
      open: false
    };
  },
  watch: {
    value: {
      deep: true,
      handler(v) {
        this.form = Object.assign(this.form, v);
      }
    },
    columns: {
      deep: true,
      handler() {
        this.resetForm();
      }
    },
    form: {
      deep: true,
      handler() {
        this.$emit("input", this.form);
      }
    },
    open() {
      this.setHeight();
    }
  },
  created() {
    this.resetForm();
    this.defaultForm = Object.assign({}, this.form);
  },
  mounted() {
    this.$emit("input", this.form);
  },
  methods: {
    resetForm() {
      let form = {};
      if (this.columns && this.columns.length) {
        this.columns.forEach(column => {
          if (!column.props) {
            column.props = {};
          }
          if (!defaultProps[column.type]) {
            defaultProps[column.type] = {};
          }
          column.props = Object.assign(column.props, defaultProps[column.type]);
          form[column.prop] = "";
        });
      }
      this.form = Object.assign(form, this.value);
    },
    formResize() {
      if (this.$refs["form-box"] && this.$refs["form-box"].clientHeight > 60) {
        this.showOpen = true;
        this.setHeight();
      } else {
        this.showOpen = false;
      }
    },
    setHeight() {
      this.$refs["search-form"].style.height = this.open
        ? this.$refs["form-box"].clientHeight + "px"
        : "40px";
    },
    reset() {
      this.form = Object.assign({}, this.defaultForm);
      this.$emit("reset", this.form);
    },
    search() {
      this.$emit("search", this.form);
    }
  }
};
</script>

<style scoped lang="scss">
.table-search {
  display: flex;

  .search-form {
    flex: 1;
    height: 40px;
    overflow: hidden;
    transition: height ease-out 0.2s;
  }

  .search-btn {
    height: 40px;
    display: flex;
    align-items: center;
  }

  .search-select-item {
    ::v-deep .el-select__tags-text {
      display: inline-block;
      max-width: 75px;
      overflow: hidden;
    }

    ::v-deep i {
      margin-bottom: 8px;
      margin-right: 2px;
    }
  }
}
</style>
