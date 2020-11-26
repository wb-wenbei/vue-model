<template>
  <div class="table-function">
    <template v-for="item in functions">
      <el-tooltip
        v-if="settings.indexOf(item.prop) > -1"
        :key="item.prop"
        class="item"
        effect="dark"
        :content="item.label"
        placement="top"
      >
        <el-popover
          v-if="item.prop === 'setting'"
          popper-class="table-function-popper"
          placement="bottom"
          trigger="click"
        >
          <el-button
            slot="reference"
            class="btn"
            type="text"
            @click="onClick(item)"
          >
            <i :class="item.icon"></i>
          </el-button>
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            @change="checkAllChange"
            >全选</el-checkbox
          >
          <div style="margin: 10px 0;"></div>
          <el-checkbox-group v-model="checked" @change="checkedChange">
            <el-checkbox
              v-for="item in settingList"
              :label="item.prop"
              :key="item.prop"
              >{{ item.label }}</el-checkbox
            >
          </el-checkbox-group>
        </el-popover>
        <el-button v-else class="btn" type="text" @click="onClick(item)">
          <i :class="item.icon"></i>
        </el-button>
      </el-tooltip>
    </template>

    <el-dialog :visible.sync="uploadDialog" append-to-body width="600px" center>
      <div style="text-align: center">
        <span>选择需要导入的Excel文件导入即可。</span>
        <el-button type="text" @click="downLoadModel" v-if="modelUrl"
          >模板下载</el-button
        >
      </div>
      <div
        v-if="uploadDialog"
        style="display: flex;justify-content: center;margin-top: 40px"
      >
        <el-upload
          drag
          :action="uploadURL"
          :data="uploadParams"
          :headers="{ token: this.$store.state.userInfo.token }"
          :limit="1"
          :show-file-list="false"
          :before-upload="beforeUpload"
          :on-success="uploadSuccess"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            <div>将导入文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" style="color: rgba(0,0,0,0.45);">
              上传文件格式只支持xls/xlsx
            </div>
          </div>
        </el-upload>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="uploadDialog = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "tableFunction",
  props: {
    headers: { type: Array },
    settings: {
      type: Array,
      default() {
        return ["upload", "download", "setting"];
      }
    },
    noShowList: {
      type: Array,
      default: () => []
    },
    uploadURL: { type: String, default: "" },
    modelUrl: { type: String, default: "" },
    uploadParams: {},
    uploadHeaders: {}
  },
  data() {
    return {
      checked: [],
      checkAll: true,
      isIndeterminate: false,
      uploadDialog: false,
      functions: [
        { prop: "upload", label: "上传数据", icon: "el-icon-upload2" },
        { prop: "download", label: "下载表格", icon: "el-icon-download" },
        { prop: "setting", label: "显示设置", icon: "el-icon-s-tools" }
      ]
    };
  },
  computed: {
    settingList() {
      let result = [];
      this.headers.forEach(v => {
        result.push(v);
      });
      return result;
    }
  },
  watch: {
    checked: {
      deep: true,
      handler(v) {
        this.$emit("checkChange", v);
      }
    }
  },
  created() {
    this.checked = [];
    this.settingList.map(v => {
      if (!this.noShowList.includes(v.prop)) {
        this.checked.push(v.prop);
      }
    });
    this.checkAll = this.checked.length === this.settingList.length;
  },
  methods: {
    onClick(item) {
      if (item.prop === "download") {
        this.$emit("download");
      } else if (item.prop === "upload") {
        this.uploadDialog = true;
      }
    },
    checkAllChange(val) {
      this.checked = val
        ? this.settingList.map(v => {
            return v.prop;
          })
        : [];
      this.isIndeterminate = false;
    },
    checkedChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.settingList.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.settingList.length;
    },
    beforeUpload(file) {
      let suffix = file.name.substr(file.name.lastIndexOf("."));
      if (".xls" !== suffix && ".xlsx" !== suffix) {
        this.$message.error("上传文件必须是 xls/xlsx 格式!");
        return false;
      }
      return true;
    },
    uploadSuccess(v) {
      this.uploadDialog = false;
      if (v.code === 200) {
        this.$message.success("导入成功");
        this.$emit("uploadSuccess");
      } else {
        this.$message.error("导入失败：" + v.message);
      }
    },
    downLoadModel() {
      if (this.modelUrl) {
        window.location.href = this.modelUrl;
      }
    }
  }
};
</script>

<style scoped lang="scss">
.table-function {
  .btn {
    margin-left: 8px;
    height: 32px;
    padding: 0;

    i {
      font-size: 20px;
    }
  }
}
</style>

<style lang="scss">
.table-function-popper {
  .el-checkbox-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
