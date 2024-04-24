<template>
  <div>
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>发布通知</span>
        </div>
      </template>
      <el-form
        :model="noticeFormData"
        :rules="rules"
        label-width="auto"
        ref="noticeForm"
      >
        <el-form-item label="发布人">
          <el-input
            v-model="noticeFormData.author"
            disabled
            style="width: 240px"
          />
        </el-form-item>
        <el-form-item label="紧急程度">
          <el-radio-group v-model="noticeFormData.level">
            <el-radio :value="1">非常紧急</el-radio>
            <el-radio :value="2">紧急</el-radio>
            <el-radio :value="3">一般</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="noticeFormData.title" style="width: 240px" />
        </el-form-item>
        <el-form-item label="内容">
          <my-editor @change="handlerChange" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: end">
          <el-button type="primary" style="width: 120px" @click="submit"
            >发布</el-button
          >
          <el-button @click="reset">重置</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, shallowRef } from "vue";
import { ADD_NOTICE } from "@/api/public";
import myEditor from "@/components/my_editor/index.vue";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/userInfo.js";

const userStore = useUserStore();

const editor = shallowRef(null);

const noticeForm = ref(null);

const noticeFormData = ref({
  title: "",
  content: "",
  createTime: "",
  author: userStore.userInfo.name,
  level: 3,
});

const rules = ref({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
});

/**
 * @description: 编辑器内容改变的回调
 * @param {}
 * @return {}
 */
const handlerChange = (editorRef) => {
  noticeFormData.value.content = editorRef.value.getHtml();
  console.log(editorRef);
  editor.value = editorRef.value;
};

/**
 * @description: 点击发布的回调
 * @param {}
 * @return {}
 */
const submit = () => {
  noticeForm.value.validate(async (valid) => {
    if (!valid) {
      return;
    }
    // 编辑器内容校验
    // 获取编辑器内容
    if (editor && !editor.value.getText()) {
      ElMessage({
        type: "error",
        message: "请输入内容",
      });
      return;
    }
    // 时间赋值
    noticeFormData.value.createTime = new Date().toLocaleString();
    const res = await ADD_NOTICE(noticeFormData.value);
    if (res.code == 200) {
      // 清空
      noticeFormData.value.title = "";
      noticeFormData.value.level = 3;
      // 清空编辑器
      editor && editor.value.setHtml("");
      ElMessage({
        type: "success",
        message: "发布成功",
      });
    }
  });
};

/**
 * @description: 点击重置按钮的回调
 * @param {}
 * @return {}
 */
const reset = () => {
  noticeForm.value.resetFields();
  noticeFormData.value.level = 3;
  editor && editor.value.setHtml("");
};
</script>

<style lang="scss" scoped></style>
