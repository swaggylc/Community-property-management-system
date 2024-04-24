<template>
  <div>
    <el-card style="width: 100%">
      <template #header>
        <div style="display: flex; justify-content: space-between">
          <span>通知详情</span>
          <el-tag type="danger" v-if="detailData.level == 1">非常紧急</el-tag>
          <el-tag type="warning" v-if="detailData.level == 2">紧急</el-tag>
          <el-tag type="info" v-if="detailData.level == 3">一般</el-tag>
        </div>
      </template>
      <div class="container">
        <div class="header">
          <div class="title">{{ detailData.title }}</div>
          <div class="title-right author">发布人：{{ detailData.author }}</div>
          <div class="title-right">发布时间：{{ detailData.createTime }}</div>
        </div>
        <div class="content" v-html="detailData.content"></div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GET_NOTICE_DETAIL } from "@/api/public";
import { useRoute } from "vue-router";

const route = useRoute();

const detailData = ref({
  title: "",
  author: "",
  content: "",
  createTime: "",
  level: "",
});

onMounted(() => {
  getNoticeDetail();
});

/**
 * @description:
 * @param {}
 * @return {}
 */
const getNoticeDetail = async () => {
  const res = await GET_NOTICE_DETAIL(route.query.id);
  if (res.code == 200) {
    detailData.value.title = res.data.title;
    detailData.value.author = res.data.author;
    detailData.value.content = res.data.content;
    detailData.value.createTime = res.data.create_time;
    detailData.value.level = res.data.level;
  }
};
</script>

<style lang="scss" scoped>
.container {
  .header {
    .title {
      text-align: center;
      font-size: 22px;
      padding: 4px 0;
    }
    .title-right {
      font-size: 14px;
      color: #909090;
      text-align: end;
      margin-top: 8px;
    }
    .author {
      margin-top: 16px;
    }
  }
  .content {
    margin-top: 24px;
  }
}
</style>
