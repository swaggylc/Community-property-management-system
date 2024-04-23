<template>
  <div>
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>我要投诉</span>
        </div>
      </template>
      <div style="height: 600px">
        <el-form
          :model="complainParams"
          :rules="rules"
          label-width="auto"
          max-width="50%"
          ref="complainForm"
        >
          <el-form-item label="姓名">
            <el-input v-model="complainParams.name" disabled />
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="complainParams.account" disabled />
          </el-form-item>
          <el-form-item label="投诉对象" prop="manager" ref="complainManager">
            <el-select
              v-model="complainParams.manager"
              placeholder="请选择投诉对象"
              style="width: 240px"
            >
              <el-option
                v-for="item in managerOptions"
                :key="item.value"
                :label="item.name"
                :value="item.uid"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="内容" prop="content" ref="complainContent">
            <el-input
              v-model="complainParams.content"
              :autosize="{ minRows: 3, maxRows: 8 }"
              type="textarea"
              placeholder="请输入投诉内容"
            />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              v-model="complainParams.other"
              :autosize="{ minRows: 2, maxRows: 5 }"
              type="textarea"
              placeholder="请输入备注"
            />
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div style="display: flex; justify-content: end">
          <el-button @click="submit" type="primary" style="width: 120px"
            >提交</el-button
          >
          <el-button @click="reset">重置</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import { GET_MANAGER, ADD_COMPLAINT } from "@/api/public.js";
import useUserStore from "@/store/userInfo.js";

const userStore = useUserStore();

const complainParams = ref({
  name: userStore.userInfo.name,
  account: userStore.userInfo.account,
  manager: "",
  content: "",
  complainTime: "",
  other: "",
});

const managerOptions = ref([]);

const complainForm = ref(null);
const complainManager = ref(null);
const complainContent = ref(null);

const rules = ref({
  manager: [
    {
      required: true,
      message: "请选择投诉对象",
      trigger: "change",
    },
  ],
  content: [
    {
      required: true,
      message: "请输入投诉内容",
      trigger: "blur",
    },
  ],
});

onMounted(() => {
  getManagerList();
});

/**
 * @description: 获取所有管理员的列表
 * @param {}
 * @return {}
 */
const getManagerList = async () => {
  const res = await GET_MANAGER();
  if (res.code == 200) {
    managerOptions.value = res.data;
  }
};

/**
 * @description: 点击提交的回调
 * @param {}
 * @return {}
 */
const submit = () => {
  complainForm.value.validate(async (valid) => {
    if (!valid) {
      return;
    } else {
      complainParams.value.content = complainParams.value.content.trim();
      complainParams.value.complainTime = new Date().toLocaleString();
      const res = await ADD_COMPLAINT(complainParams.value);
      if (res.code == 200) {
        ElMessage({
          type: "success",
          message: "添加投诉成功,请等待工作人员联系",
        });
        reset();
      } else {
        ElMessage({
          type: "error",
          message: "添加投诉失败,请重试！",
        });
      }
    }
  });
};

/**
 * @description: 点击重置的回调
 * @param {}
 * @return {}
 */
const reset = () => {
  complainForm.value.resetFields();
  complainParams.value.other = "";
};
</script>

<style lang="scss" scoped></style>
