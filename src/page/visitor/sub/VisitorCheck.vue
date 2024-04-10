<template>
  <div>
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>访客登记</span>
        </div>
      </template>
      <el-form
        :model="formParams"
        :rules="rules"
        label-width="auto"
        ref="visitorForm"
      >
        <el-form-item label="Name" prop="name">
          <el-input v-model="formParams.name" placeholder="请输入姓名" />
        </el-form-item>
        <el-form-item label="Phone" prop="telNumber">
          <el-input
            v-model="formParams.telNumber"
            placeholder="请输入联系方式"
          />
        </el-form-item>
        <el-form-item label="VisitorNumber" prop="visitorNumber">
          <el-input-number
            v-model="formParams.visitorNumber"
            :min="1"
            placeholder="请输入访客人数"
            style="width: 220px"
          />
        </el-form-item>
        <el-form-item label="Address" prop="address">
          <el-input v-model="formParams.address" placeholder="请输入楼栋号码" />
        </el-form-item>
        <el-form-item label="EnterTime" prop="enterTime">
          <el-date-picker
            v-model="formParams.enterTime"
            type="datetime"
            placeholder="选择访客进入时间"
            :default-time="defaultTime"
          />
        </el-form-item>
        <el-form-item label="Content" prop="content">
          <el-input
            v-model="formParams.content"
            placeholder="请输入进入原因"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </el-form-item>
        <el-form-item label="Manager">
          <el-input v-model="formParams.manager" disabled />
        </el-form-item>
        <el-form-item label="Other">
          <el-input
            v-model="formParams.other"
            placeholder="备注"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="display: flex; justify-content: end">
          <el-button type="primary" style="width: 120px">提交</el-button>
          <el-button style="margin-left: 12px">重置</el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { ADD_VISITOR_CHECK } from "@/api/public.js";
import useUserStore from "@/store/userInfo.js";

const visitorForm = ref(null);
const userStore = useUserStore();
// 访客登记信息
const formParams = ref({
  name: "",
  telNumber: "",
  enterTime: "",
  content: "",
  visitorNumber: "",
  address: "",
  manager: userStore.userInfo.name,
  other: "",
});
// 校验规则
const rules = ref({
  name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
  telNumber: [{ required: true, message: "请输入联系方式", trigger: "blur" }],
  enterTime: [
    { required: true, message: "请选择访客进入时间", trigger: "blur" },
  ],
  content: [{ required: true, message: "请输入进入原因", trigger: "blur" }],
  visitorNumber: [
    { required: true, message: "请输入访客人数", trigger: "blur" },
  ],
  address: [{ required: true, message: "请输入楼栋号码", trigger: "blur" }],
});

/**
* @description: 点击提交按钮的回调
* @param {} 
* @return {} 
*/
const submit= () => {
    visitorForm.value.validate(async(valid) => {
        if (valid) {
            const res= await ADD_VISITOR_CHECK(formParams.value);
        }
    });
}
</script>

<style lang="scss" scoped></style>
