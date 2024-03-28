<template>
  <div class="user-manage-content">
    <el-card class="user-manage-card">
      <template #header>
        <div class="card-header">
          <div class="card-header-content">
            <span class="card-title">用户管理</span>
            <el-divider />
            <div class="card-filter">
              <!-- 筛选项 -->
              <el-select
                v-model="value"
                placeholder="选择性别"
                style="width: 240px"
              >
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </div>
          </div>
        </div>
      </template>
      <!-- 表格 -->
      <el-table
        :data="userList"
        border
        stripe
        max-height="540"
        style="width: 100%"
        class="user-manage-table"
      >
        <el-table-column prop="uid" label="Uid" width="80" align="center" />
        <el-table-column
          prop="account"
          label="Account"
          width="120"
          align="center"
        />
        <el-table-column
          prop="username"
          label="UserName"
          width="150"
          align="center"
        />
        <el-table-column prop="name" label="Name" width="90" align="center" />
        <el-table-column
          prop="address"
          label="Address"
          width="150"
          align="center"
        />
        <el-table-column prop="sex" label="Sex" width="50" align="center" />
        <el-table-column label="Options" align="center">
          <template #default="scope">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button type="primary" :icon="Edit" circle />
              <el-button type="warning" :icon="Delete" circle />
            </div>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>Footer content</template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GET_USERLIST } from "@/api/manage.js";
import { Edit, Delete } from "@element-plus/icons-vue";

onMounted(() => {
  getUserList();
});
// 性别选项
const sexOptions = ref([
  { label: "男", value: "1" },
  { label: "女", value: "2" },
]);
// 用户列表数据
const userList = ref([]);

/**
 * @description: 获取用户列表的方法
 * @param {}
 * @return {}
 */
const getUserList = async () => {
  const res = await GET_USERLIST();
  if (res.code == 200) {
    userList.value = res.data.result;
  } else {
    $message.error("获取用户列表失败");
  }
};
</script>

<style lang="scss" scoped>
.user-manage-content {
  width: 100%;
  height: 100%;
  .user-manage-card {
    width: 100%;
    max-height: 100%;
    .card-title {
      display: flex;
    }
    .user-manage-table {
      max-height: 600px;
    }
  }
}
</style>
