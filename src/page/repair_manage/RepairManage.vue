<template>
  <div>
    <el-card style="max-width: 100%">
      <template #header>
        <div class="card-header">
          <span>报修管理</span>
          <el-divider />
          <div style="display: flex; justify-content: space-between">
            <div>
              <!-- 维修状态下拉框 -->
              <el-select
                v-model="searchParams.status"
                placeholder="报修状态"
                style="width: 240px; margin-right: 24px"
              >
                <el-option
                  v-for="item in statusOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-select
                v-model="searchParams.type"
                placeholder="报修种类"
                style="width: 240px; margin-right: 24px"
              >
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <el-input
                v-model="searchParams.repair_number"
                placeholder="请输入报修单号"
                style="width: 240px; margin-right: 24px"
              />
              <el-button @click="reset">重置</el-button>
            </div>
            <el-button @click="searchRepair" type="primary" style="width: 120px"
              >搜索</el-button
            >
          </div>
        </div>
      </template>
      <el-table :data="repairList" style="width: 100%" max-height="600">
        <el-table-column type="index" align="center" />
        <el-table-column prop="repair_number" label="报修单号" align="center" />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="account" label="账号" align="center" />
        <el-table-column prop="address" label="地址" align="center" />
        <el-table-column prop="content" label="报修内容" align="center" />
        <el-table-column label="类型" align="center">
          <template #default="scope">
            <span style="color: #909090">{{ scope.row.type }}</span>
          </template>
        </el-table-column>
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
        <el-table-column label="评分" align="center" width="200">
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
        <el-table-column prop="create_time" label="创建时间" align="center" />
        <el-table-column label="Options" align="center">
          <template #default="scope">
            <div>
              <el-button
                type="primary"
                :icon="Edit"
                @click="handleEdit(scope.row)"
                >编辑</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 修改报修信息等 -->
    <el-dialog title="修改报修信息" v-model="dialogVisible" width="50%">
      <el-form
        :model="editFormData"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="报修单号">
          <el-input v-model="editFormData.repairNumber" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="editFormData.name" disabled></el-input>
        </el-form-item>
        <el-form-item label="报修状态">
          <el-select v-model="editFormData.status" placeholder="报修状态">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="报修内容">
          <el-input
            v-model="editFormData.content"
            style="width: 240px"
            autosize
            type="textarea"
            disabled
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div style="margin-top: 24px">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit" style="width: 120px">
            提交
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import {
  GET_REPAIR_LIST,
  GET_REPAIR_CONDITION,
  UPDATE_REPAIR,
} from "@/api/public";
import { Edit } from "@element-plus/icons-vue";

const repairList = ref([]);
const dialogVisible = ref(false);
const editFormData = ref({
  repairNumber: "",
  status: "",
  name: "",
});
// 维修状态下拉框
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

// 维修类型下拉框
const typeOptions = ref([
  {
    value: 1,
    label: "小区卫生",
  },
  {
    value: 2,
    label: "花坛绿化",
  },
  {
    value: 3,
    label: "管道堵塞",
  },
  {
    value: 4,
    label: "公共水电",
  },
  {
    value: 5,
    label: "楼道电梯",
  },
  {
    value: 6,
    label: "其他",
  },
]);

// 搜索参数
const searchParams = ref({
  repair_number: "",
  status: "",
  type: "",
  content: "",
});

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

/**
 * @description: 点击搜索的回调
 * @param {object} params 查询参数
 * @return {}
 */
const searchRepair = async () => {
  const res = await GET_REPAIR_CONDITION(searchParams.value);
  if (res.code == 200) {
    repairList.value = res.data;
  } else {
    ElMessage({
      type: "error",
      message: "获取失败",
    });
  }
};

/**
 * @description: 点击重置的回调
 * @param {}
 * @return {}
 */
const reset = () => {
  searchParams.value.repair_number = "";
  searchParams.value.status = "";
  searchParams.value.type = "";
  getRepairList();
};

/**
 * @description: 点击编辑的回调
 * @param {object} row 当前行的数据
 * @return {}
 */
const handleEdit = (row) => {
  dialogVisible.value = true;
  editFormData.value.repairNumber = row.repair_number;
  editFormData.value.status = row.status;
  editFormData.value.name = row.name;
  editFormData.value.content = row.content;
};

/**
 * @description: 点击edit弹窗的确定按钮回调
 * @param {}
 * @return {}
 */
const submit = async () => {
  const params = {
    repairNumber: editFormData.value.repairNumber,
    status: editFormData.value.status,
  };
  const res = await UPDATE_REPAIR(params);
  if (res.code === 200) {
    dialogVisible.value = false;
    getRepairList();
    ElMessage({
      message: "修改成功",
      type: "success",
    });
  } else {
    ElMessage({
      message: "修改失败",
      type: "error",
    });
  }
};
</script>

<style lang="scss" scoped></style>
