<template>
  <div>
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>我的投诉</span>
        </div>
      </template>
      <el-table
        :data="myComplainList"
        style="width: 100%"
        stripe
        max-height="600"
      >
        <el-table-column type="index" align="center" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="account" label="联系方式" align="center" />
        <el-table-column prop="manager_name" label="投诉对象" align="center" />
        <el-table-column prop="content" label="投诉内容" align="center" />
        <el-table-column prop="complain_time" label="投诉时间" align="center" />
        <el-table-column prop="level" label="严重等级" align="center" />
        <el-table-column prop="other" label="备注" align="center" />
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 1" type="info" size="small"
              >未跟进</el-tag
            >
            <el-tag v-if="scope.row.status == 2" type="primary" size="small"
              >已跟进</el-tag
            >
            <el-tag v-if="scope.row.status == 3" type="success" size="small"
              >已完成</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="投诉次数" align="center">
          <template #default="scope">
            <el-tag
              v-if="scope.row.repeat_status == 1"
              type="primary"
              size="small"
              round
              >首次</el-tag
            >
            <el-tag
              v-if="scope.row.repeat_status == 2"
              type="danger"
              size="small"
              round
              >多次</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column prop="result" label="结果" align="center" />
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              v-if="scope.row.status == 3"
              link
              type="primary"
              size="small"
              @click="repeatAgain(scope.row.id)"
              >再次投诉</el-button
            >
            <el-popconfirm
              title="确定删除这条投诉吗?"
              width="200px"
              @confirm="deleteComplain(scope.row.id)"
            >
              <template #reference>
                <el-button link type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 更新是否首次投诉 -->
    <el-dialog v-model="dialogVisible" title="Tips" width="500">
      <span>请确认是否要再次投诉！</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="sureRepeatAgain"> 确定 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  GET_SELF_COMPLAIN,
  DELETE_COMPLAIN,
  UPDATE_COMPLAIN_REPEAT,
} from "@/api/public";
import { ElMessage } from "element-plus";
import useUserStore from "@/store/userInfo.js";

const userStore = useUserStore();

const myComplainList = ref([]);

const dialogVisible = ref(false);

const repeatComplainId = ref("");

onMounted(() => {
  getMyComplain();
});

/**
 * @description: 获取我的投诉列表
 * @param {}
 * @return {}
 */
const getMyComplain = async () => {
  const res = await GET_SELF_COMPLAIN(userStore.userInfo.account);
  if (res.code == 200) {
    myComplainList.value = res.data;
  }
};

/**
 * @description: 删除投诉的回调
 * @param {}
 * @return {}
 */
const deleteComplain = async (id) => {
  const res = await DELETE_COMPLAIN({ id });
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "删除投诉成功！",
    });
    getMyComplain();
  }
};

/**
 * @description: 点击再次投诉按钮的回调
 * @param {}
 * @return {}
 */
const repeatAgain = (id) => {
  repeatComplainId.value = id;
  dialogVisible.value = true;
};

/**
 * @description: 确定再次投诉的回调
 * @param {}
 * @return {}
 */
const sureRepeatAgain = async () => {
  const res = await UPDATE_COMPLAIN_REPEAT({ id: repeatComplainId.value });
  if (res.code == 200) {
    dialogVisible.value = false;
    ElMessage({
      type: "success",
      message: "再次投诉成功！",
    });
    // 重新获取列表
    getMyComplain();
  }
};
</script>

<style lang="scss" scoped></style>
