<template>
  <div>
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>通知管理</span>
        </div>
      </template>
      <el-table :data="noticeList" style="width: 100%" max-height="600">
        <el-table-column prop="id" label="通知编号" align="center" />
        <el-table-column label="标题" align="center">
          <template #default="scope">
            <el-text class="w-150px" truncated>
              {{ scope.row.title }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column label="内容" align="center">
          <template #default="scope">
            <el-text class="w-150px" truncated>
              {{ scope.row.text }}
            </el-text>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="发布时间" align="center" />
        <el-table-column prop="author" label="发布人" align="center" />
        <el-table-column prop="author" label="紧急程度" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.level == 1" type="danger" size="small"
              >非常紧急</el-tag
            >
            <el-tag v-if="scope.row.level == 2" type="warning" size="small"
              >紧急</el-tag
            >
            <el-tag v-if="scope.row.level == 3" type="info" size="small"
              >一般</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="default"
              @click="handlerDetail(scope.row.id)"
              >查看详情</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GET_NOTICE } from "@/api/public";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const noticeList = ref([]);

onMounted(() => {
  getNoticeList();
});

/**
 * @description: 获取所有通知的方法
 * @param {}
 * @return {}
 */
const getNoticeList = async () => {
  const res = await GET_NOTICE();
  if (res.code == 200) {
    noticeList.value = res.data;
  }
};

/**
 * @description: 点击查看详情按钮的回调
 * @param {}
 * @return {}
 */
const handlerDetail = (id) => {
  // 路由跳转，带上id，新开页
  const url = router.resolve({
    name: "notice_detail",
    query: {
      id: id,
    },
  });
  window.open(url.href, "_blank");
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
