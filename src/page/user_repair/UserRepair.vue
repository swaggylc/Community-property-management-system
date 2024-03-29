<template>
  <div class="user-repair" style="height: 100%">
    <el-card style="max-width: 100%">
      <template #header>
        <div class="card-header">
          <span>报修表单</span>
        </div>
      </template>
      <div class="repair-content">
        <el-form label-width="100px" :data="repairForm">
          <el-form-item label="报修人">
            <el-input v-model="repairForm.name" disabled></el-input>
          </el-form-item>
          <el-form-item label="联系方式">
            <el-input v-model="repairForm.account" disabled></el-input>
          </el-form-item>
          <el-form-item label="报修地址">
            <el-input v-model="repairForm.address"></el-input>
          </el-form-item>
          <el-form-item label="报修内容">
            <el-input
              v-model="repairForm.content"
              type="textarea"
              :rows="4"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <div class="card-footer">
          <el-button type="primary" style="width: 120px">提交</el-button>
          <el-button>重置</el-button>
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

const repairForm = ref({
  uid: userStore.userInfo.uid,
  name: userStore.userInfo.name,
  account: userStore.userInfo.account,
  address: "",
  content: "",
});

/**
 * @description: 添加报修
 * @param {object}
 * @return {}
 */
const addRepair = async () => {
  const res = await ADD_REPAIR(repairForm.value);
  if (res.code === 200) {
    ElMessage({
      type: "success",
      message: "添加报修成功,请等待工作人员联系",
    });
  } else {
    ElMessage({
      type: "error",
      message: "添加报修失败,请重试！",
    });
  }
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
