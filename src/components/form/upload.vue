<template>
  <el-upload
    class="form-upload"
    :action="url"
    :headers="{ token: $store.state.userInfo.token }"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="3"
    :on-exceed="handleExceed"
    :on-success="handleAvatarSuccess"
    :file-list="fileList"
  >
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  name: "upload",
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
      fileList: []
    };
  },
  watch: {
    value: {
      deep: true,
      handler(v) {
        this.fileList = v || [];
      }
    },
    fileList: {
      deep: true,
      handler(v) {
        this.$emit("input", v);
      }
    }
  },
  created() {
    this.fileList = this.value || [];
  },
  methods: {
    handleRemove(file, fileList) {
      this.fileList = fileList;
    },
    handlePreview(file) {
      this.$emit("on-preview", file);
      console.log("handlePreview", file);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 3 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleAvatarSuccess(res) {
      this.fileList.push(res.data);
    }
  }
};
</script>

<style scoped lang="scss">
.form-upload {
}
</style>
