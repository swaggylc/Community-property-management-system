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
              <div>
                <el-select
                  v-model="userParams.sex"
                  placeholder="选择性别"
                  style="width: 240px; margin-right: 24px"
                >
                  <el-option
                    v-for="item in sexOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
                <el-input
                  v-model="userParams.name"
                  placeholder="请输入用户姓名"
                  style="width: 240px"
                  clearable
                />
                <el-button
                  type="default"
                  :icon="Refresh"
                  @click="reset"
                  style="width: 64px; margin-left: 24px"
                  >重置</el-button
                >
              </div>
              <!-- 搜索 -->
              <div>
                <el-button
                  type="primary"
                  :icon="Search"
                  @click="search"
                  style="width: 120px"
                  >搜索</el-button
                >
              </div>
            </div>
          </div>
        </div>
      </template>
      <!-- 表格 -->
      <el-table
        :data="userList"
        border
        stripe
        max-height="640"
        class="user-manage-table"
      >
        <el-table-column type="index" align="center" />
        <el-table-column prop="uid" label="Uid" align="center" />
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
        <el-table-column prop="name" label="Name" align="center" />
        <el-table-column
          prop="address"
          label="Address"
          width="150"
          align="center"
        />
        <el-table-column prop="sex" label="Sex" align="center" />
        <el-table-column label="Options" align="center">
          <template #default="scope">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <el-button
                type="primary"
                :icon="Edit"
                circle
                @click="editUserInfo(scope.row)"
              />
              <el-button
                type="danger"
                :icon="Delete"
                circle
                @click="deleteUserClick(scope.row.uid)"
              />
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 抽屉，用于编辑用户信息 -->
    <el-drawer v-model="drawerStatus">
      <template #header>
        <h4>修改用户信息</h4>
      </template>
      <template #default>
        <!-- 表单 -->
        <div>
          <el-form
            :model="editInfo"
            label-width="auto"
            style="max-width: 600px"
            :rules="rules"
          >
            <el-form-item label="name" prop="name">
              <el-input v-model="editInfo.name" />
            </el-form-item>
            <el-form-item label="username" prop="username">
              <el-input v-model="editInfo.username" />
            </el-form-item>
            <el-form-item label="sex">
              <el-select v-model="editInfo.sex" placeholder="请选择您的性别">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="address" prop="address">
              <el-input v-model="editInfo.address" />
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="cancelClick">取消</el-button>
          <el-button
            type="primary"
            @click="confirmClick"
            style="width: 120px"
            :loading="submitStatus"
            >提交</el-button
          >
        </div>
      </template>
    </el-drawer>
    <!-- 对话框，用于删除用户 -->
    <el-dialog v-model="dialogVisible" title="Tips" width="500">
      <span>确定删除该用户吗？删除后不可恢复！</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="danger" @click="deleteUserHandle"> 删除 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  GET_USER_LIST,
  GET_SEARCH_USER,
  EDIT_USER_INFO,
  DELETE_USER,
} from "@/api/manage.js";
import { Edit, Delete, Search, Refresh } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
onMounted(() => {
  getUserList();
});
// 性别选项
const sexOptions = ref([
  { label: "男", value: "男" },
  { label: "女", value: "女" },
]);
// 用户列表数据
const userList = ref([]);
// 搜索用户参数
const userParams = ref({
  sex: "",
  name: "",
});
// 控制抽屉的显示与隐藏
const drawerStatus = ref(false);
// 储存要编辑的用户信息
const editInfo = ref({
  address: "",
  name: "",
  sex: "",
  username: "",
  uid: "",
});
// 储存要删除的用户uid
const deleteUid = ref("");
// 修改用户信息时移交按钮的状态
const submitStatus = ref(false);
// 校验规则
const rules = ref({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  address: [{ required: true, message: "请输入地址", trigger: "blur" }],
});
// 控制对话框的显示与隐藏
const dialogVisible = ref(false);
/**
 * @description: 获取用户列表的方法
 * @return {}
 */
const getUserList = async () => {
  const res = await GET_USER_LIST();
  if (res.code == 200) {
    userList.value = res.data.result;
  } else {
    ElMessage.error("获取用户列表失败");
  }
};

/**
 * @description: 搜索用户
 * @param {object} userParams 用户搜索参数
 * @return {}
 */
const search = async () => {
  const res = await GET_SEARCH_USER(userParams.value);
  if (res.code == 200) {
    userList.value = res.data.result;
  } else {
    ElMessage.error("搜索用户失败,请重试");
  }
};

/**
 * @description: 点击重置按钮的回调
 * @return {}
 */
const reset = () => {
  userParams.value = {
    sex: "",
    name: "",
  };
  getUserList();
};

/**
 * @description: 修改用户信息的回调
 * @param {object} userInfo 用户信息
 * @return {}
 */
const editUserInfo = (userInfo) => {
  drawerStatus.value = true;
  // 赋值回显
  editInfo.value.address = userInfo.address;
  editInfo.value.name = userInfo.name;
  editInfo.value.sex = userInfo.sex;
  editInfo.value.username = userInfo.username;
  editInfo.value.uid = userInfo.uid;
};

/**
 * @description: 抽屉取消按钮的回调
 * @return {}
 */
const cancelClick = () => {
  drawerStatus.value = false;
};

/**
 * @description: 修改用户信息方法
 * @param {}
 * @return {}
 */
const updateUserInfo = async () => {
  const res = await EDIT_USER_INFO(editInfo.value);
  if (res.code == 200) {
    ElMessage.success("修改用户信息成功");
    drawerStatus.value = false;
    submitStatus.value = false;
    getUserList();
  } else {
    ElMessage.error("修改用户信息失败");
  }
};

/**
 * @description: 抽屉点击确定按钮的回调
 * @return {}
 */
const confirmClick = () => {
  submitStatus.value = true;
  updateUserInfo();
  drawerStatus.value = false;
};

/**
 * @description:删除用户的方法
 * @param {string|number} uid 用户id
 * @return {}
 */
const deleteUser = async (uid) => {
  const res = await DELETE_USER({ uid });
  if (res.code == 200) {
    ElMessage.success("删除用户成功");
    getUserList();
  } else {
    ElMessage.error("删除用户失败");
  }
};

/**
 * @description: 对话框点击删除按钮的回调
 * @param {}
 * @return {}
 */
const deleteUserHandle = () => {
  deleteUser(deleteUid.value);
  dialogVisible.value = false;
  getUserList();
};

/**
 * @description: 点击删除icon的回调
 * @param {}
 * @return {}
 */
const deleteUserClick = (uid) => {
  dialogVisible.value = true;
  deleteUid.value = uid;
};
</script>

<style lang="scss" scoped>
.user-manage-content {
  width: 100%;
  height: 100%;
  .user-manage-card {
    width: 100%;
    height: calc(100vh - 120px);
    .card-title {
      display: flex;
    }
    .card-filter {
      display: flex;
      justify-content: space-between;
    }
    .user-manage-table {
      max-height: calc(100% - 60px);
      width: 100%;
    }
  }
}
</style>
