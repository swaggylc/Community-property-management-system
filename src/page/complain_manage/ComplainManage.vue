<template>
  <div>
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>投诉管理</span>
        </div>
      </template>
      <el-table
        :data="complainList"
        style="width: 100%"
        stripe
        max-height="600"
      >
        <el-table-column type="index" align="center" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="account" label="联系方式" align="center" />
        <el-table-column prop="manager_name" label="投诉对象" align="center" />
        <el-table-column label="投诉内容" align="center" width="150">
          <template #default="scope">
            <el-popover
              placement="top-start"
              title="Title"
              :width="200"
              trigger="hover"
              :content="scope.row.content"
            >
              <template #reference>
                <el-text class="w-150px" truncated>
                  {{ scope.row.content }}
                </el-text>
              </template>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="complain_time" label="投诉时间" align="center" />
        <el-table-column label="严重等级" align="center">
          <template #default="scope">
            <span
              v-if="scope.row.level == 1"
              style="font-weight: bold; color: #ed3737"
              >{{ scope.row.level }}</span
            >
            <span
              v-if="scope.row.level == 2"
              style="font-weight: bold; color: #fa9600"
              >{{ scope.row.level }}</span
            >
            <span
              v-if="scope.row.level == 3"
              style="font-weight: bold; color: #909090"
              >{{ scope.row.level }}</span
            >
          </template>
        </el-table-column>
        <el-table-column prop="other" label="备注" align="center" />
        <el-table-column label="状态" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 1" type="danger" size="small"
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
            <el-button link type="primary" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑投诉的弹框 -->
    <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="500"
      :before-close="handleClose"
    >
      <span>This is a message</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogVisible = false">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GET_COMPLAIN_LIST } from "@/api/public";
import { ElMessage } from "element-plus";

const complainList = ref([]);

onMounted(() => {
  getALLComplain();
});

/**
 * @description: 获取所有投诉信息
 * @param {}
 * @return {}
 */
const getALLComplain = async () => {
  const res = await GET_COMPLAIN_LIST();
  if (res.code == 200) {
    complainList.value = res.data;
  }
};
</script>

<style lang="scss" scoped>
.el-table {
  :deep(.cell) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
