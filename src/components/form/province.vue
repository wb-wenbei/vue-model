<template>
  <div class="province-select">
    <form-cascader
      v-model="province"
      :options="administrativeTree"
      filterable
      :props="cascaderProps"
      :clearable="false"
      :placeholder="placeholder"
      @change="changeArea"
    ></form-cascader>
    <el-input
      class="short-width margin-left-8"
      v-model="currentValue.address"
      :placeholder="addressPlaceholder"
      @change="changeAddress"
    >
    </el-input>
  </div>
</template>

<script>
import FormCascader from "@/components/form/cascader";
import { getAdministrativeTreeAPI } from "@/api/common/dictionary";
import { listToTree } from "@/utils/index";

export default {
  name: "province",
  components: { FormCascader },
  props: {
    value: {},
    level: { type: Number, default: 3 },
    placeholder: { type: String, default: "省市区/县" },
    addressPlaceholder: {
      type: String,
      default: "详细地址：虹中路780弄3-20号"
    },
    props: { type: Object }
  },
  data() {
    return {
      province: [],
      currentValue: {},
      administrativeTree: [],
      cascaderProps: {
        label: "name",
        value: "id"
      }
    };
  },
  value: {
    deep: true,
    handler() {
      this.loadData();
    }
  },
  created() {
    this.cascaderProps = Object.assign(this.cascaderProps, this.props);
    this.loadData();
    this.getAdministrativeTree();
  },
  methods: {
    loadData() {
      this.currentValue = {
        province: this.value.province,
        city: this.value.city,
        district: this.value.district,
        address: this.value.address
      };
      this.province = [
        this.value.province,
        this.value.city,
        this.value.district
      ];
    },
    async getAdministrativeTree() {
      let list = await getAdministrativeTreeAPI();
      list = list.filter(v => {
        return v.level <= this.level;
      });
      this.administrativeTree = listToTree(list);
    },
    changeArea(v) {
      if (v && v.length) {
        this.currentValue.province = v[0] || "";
        this.currentValue.city = v[1] || "";
        this.currentValue.district = v[2] || "";
      } else {
        this.currentValue.province = "";
        this.currentValue.city = "";
        this.currentValue.district = "";
      }
      this.$emit("input", this.currentValue);
    },
    changeAddress(v) {
      this.currentValue.address = v;
      this.$emit("input", this.currentValue);
    }
  }
};
</script>

<style scoped lang="scss">
.province-select {
  display: flex;
  .margin-left-8 {
    margin-left: 8px;
  }
}
</style>
