<template>
  <el-upload
    class="form-upload-image"
    v-bind="$attrs"
    v-on="$listeners"
    :action="url"
    :headers="{ token: $store.state.userInfo.token }"
    :show-file-list="showFileList"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <el-image
      v-if="currentValue"
      class="avatar"
      :src="currentValue"
      fit="cover"
    ></el-image>
    <i v-else class="el-icon-plus form-upload-icon"></i>
  </el-upload>
</template>

<script>
export default {
  name: "form-select",
  props: {
    value: {},
    url: {
      type: String,
      default: "/api-customer/zuul/dig-construction/uploadFile"
    },
    showFileList: { type: Boolean, default: false }
  },
  data() {
    return {
      currentValue: null
    };
  },
  watch: {
    value(v) {
      this.currentValue = v;
    }
  },
  created() {
    this.currentValue = this.value;
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.currentValue = res.data.url;
      this.$emit("input", this.currentValue);
    },
    beforeAvatarUpload(file) {
      return true;
    }
  }
};
</script>

<style lang="scss">
.form-upload-image .el-upload {
  height: 128px;
  width: 128px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.form-upload-image .el-upload:hover {
  border-color: #409eff;
}
.form-upload-icon {
  font-size: 28px;
  color: #8c939d;
  width: 128px;
  height: 128px;
  line-height: 128px !important;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>
