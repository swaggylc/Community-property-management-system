<template>
  <div>
    <el-card style="max-width: 100%">
      <template #header>
        <div class="card-header">
          <span>报修管理</span>
          <el-divider />
          <div>
            <!-- 维修状态下拉框 -->
            <el-select placeholder="报修状态" style="width: 240px">
              <el-option
                v-for="item in statusOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>

          </div>
        </div>
      </template>
      <el-table :data="repairList" style="width: 100%">
        <el-table-column type="index" align="center" />
        <el-table-column
          prop="repair_number"
          label="RepairNumber"
          align="center"
        />
        <el-table-column prop="name" label="Name" align="center" />
        <el-table-column prop="account" label="Accound" align="center" />
        <el-table-column prop="address" label="Address" align="center" />
        <el-table-column prop="content" label="Content" align="center" />
        <el-table-column prop="status" label="Status" align="center">
          <template #default="scope">
            <el-tag v-if="scope.row.status === 0" type="danger" effect="dark"
              >未处理</el-tag
            >
            <el-tag
              v-else-if="scope.row.status === 1"
              type="warning"
              effect="dark"
              >处理中</el-tag
            >
            <el-tag
              v-else-if="scope.row.status === 2"
              type="success"
              effect="dark"
              >已处理</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="Rate" align="center" width="200">
          <template #default="scope">
            <el-rate
              v-if="scope.row.status == 2"
              v-model="scope.row.rate"
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']"
              show-score
              disabled
              score-template="{value} points"
            ></el-rate>
            <template v-else>
              <span style="color: #909090">暂无评分</span>
            </template>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="CreateTime" align="center" />
        <el-table-column label="Options" align="center">
          <template #default="scope">
            <div>
              <el-button
                type="primary"
                :icon="Edit"
                @click="handleEdit(scope.row)"
                >Edit</el-button
              >
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
import { ElMessage } from "element-plus";
import { GET_REPAIR_LIST } from "@/api/public";
import { Edit } from "@element-plus/icons-vue";

const repairList = ref([]);

const statusOptions = ref([
  {
    value: 0,
    label: "未处理",
  },
  {
    value: 1,
    label: "处理中",
  },
  {
    value: 2,
    label: "已处理",
  },
]);

onMounted(() => {
  getRepairList();
});

/**
 * @description: 获取所有用户的维修记录
 * @param {}
 * @return {}
 */
const getRepairList = async () => {
  const res = await GET_REPAIR_LIST();
  if (res.code == 200) {
    repairList.value = res.data;
  } else {
    ElMessage({
      type: "error",
      message: "获取失败",
    });
  }
};
</script>

<style lang="scss" scoped></style>
