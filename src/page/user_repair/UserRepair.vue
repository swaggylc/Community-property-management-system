<template>
  <div class="user-repair" style="height: 100%">
    <el-card style="max-width: 100%">
      <template #header>
        <div class="card-header">
          <span>报修表单</span>
        </div>
      </template>
      <div class="repair-content">
        <el-form
          label-width="100px"
          :model="repairFormData"
          :rules="rules"
          ref="repairForm"
        >
          <el-form-item label="报修人">
            <el-input v-model="repairFormData.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="repairFormData.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="报修地址" prop="address">
            <el-input v-model="repairFormData.address"></el-input>
          </el-form-item>
          <el-form-item label="报修内容" prop="content">
            <el-input
              v-model="repairFormData.content"
              type="textarea"
              :rows="4"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="card-footer">
          <el-button type="primary" style="width: 120px" @click="addRepair"
            >提交</el-button
          >
          <el-button @click="reset">重置</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ADD_REPAIR } from "@/api/public.js";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/userInfo.js";

const userStore = useUserStore();

const repairFormData = ref({
  uid: userStore.userInfo.uid,
  name: userStore.userInfo.name,
  account: userStore.userInfo.account,
  address: "",
  content: "",
  createTime:"",
});

const repairForm = ref(null);

// 校验规则
const rules = ref({
  address: [
    {
      required: true,
      message: "请输入报修地址",
      trigger: "blur",
    },
  ],
  content: [
    {
      required: true,
      message: "请输入报修内容",
      trigger: "blur",
    },
  ],
});

/**
 * @description: 添加报修
 * @param {object}
 * @return {}
 */
const addRepair = () => {
  repairForm.value.validate(async (valid) => {
    if (!valid) {
      return;
    } else {
      // 去除空格
      repairFormData.value.address = repairFormData.value.address.trim();
      repairFormData.value.content = repairFormData.value.content.trim();
      repairFormData.value.createTime = new Date().toLocaleString();
      const res = await ADD_REPAIR(repairFormData.value);
      if (res.code === 200) {
        ElMessage({
          type: "success",
          message: "添加报修成功,请等待工作人员联系",
        });
        reset();
      } else {
        ElMessage({
          type: "error",
          message: "添加报修失败,请重试！",
        });
      }
    }
  });
};

/**
 * @description: 点击重置的回调
 * @return {}
 */
const reset = () => {
  repairFormData.value.address = "";
  repairFormData.value.content = "";
};
</script>

<style lang="scss" scoped>
.user-repair {
  .repair-content {
    height: 600px;
  }
  .card-footer {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
