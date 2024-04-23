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
            <el-button
              type="primary"
              :icon="Edit"
              @click="openDialog(scope.row)"
              >编辑</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑投诉的弹框 -->
    <el-dialog v-model="dialogVisible" title="Tips" :before-close="handleClose">
      <el-form
        :model="editFormData"
        label-width="auto"
        style="max-width: 600px"
      >
        <el-form-item label="姓名">
          <el-input v-model="editFormData.name" disabled />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editFormData.account" disabled />
        </el-form-item>
        <el-form-item label="投诉对象">
          <el-input v-model="editFormData.manager" disabled />
        </el-form-item>
        <el-form-item label="投诉内容">
          <el-input
            v-model="editFormData.content"
            :autosize="{ minRows: 3, maxRows: 8 }"
            type="textarea"
            disabled
          />
        </el-form-item>
        <el-form-item label="严重等级">
          <el-select v-model="editFormData.level">
            <el-option
              v-for="item in levelOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="editFormData.status">
            <el-option
              v-for="item in statusOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="结果" v-show="editFormData.status == 3">
          <el-input
            v-model="editFormData.result"
            :autosize="{ minRows: 3, maxRows: 8 }"
            type="textarea"
            placeholder="请输入结果"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="submit"> 提交 </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { GET_COMPLAIN_LIST, UPDATE_COMPLAIN } from "@/api/public";
import { ElMessage } from "element-plus";
import { Edit } from "@element-plus/icons-vue";

const complainList = ref([]);

const dialogVisible = ref(false);

const levelOptions = ref([
  { value: 1, label: "重大投诉" },
  { value: 2, label: "重要投诉" },
  { value: 3, label: "轻微投诉" },
]);

const statusOptions = ref([
  { value: 1, label: "未跟进" },
  { value: 2, label: "已跟进" },
  { value: 3, label: "已完成" },
]);

const editFormData = ref({
  id: "",
  name: "",
  account: "",
  manager: "",
  content: "",
  level: "",
  status: "",
  result: "",
});

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

/**
 * @description: 点击编辑按钮打开弹框
 * @param {}
 * @return {}
 */
const openDialog = (item) => {
  editFormData.value.id = item.id;
  editFormData.value.name = item.name;
  editFormData.value.account = item.account;
  editFormData.value.manager = item.manager_name;
  editFormData.value.content = item.content;
  editFormData.value.level = item.level;
  editFormData.value.status = item.status;
  editFormData.value.result = item.result;
  dialogVisible.value = true;
};

/**
 * @description: 点击提交按钮的回调
 * @param {}
 * @return {}
 */
const submit = async () => {
  let params = {
    id: editFormData.value.id,
    level: editFormData.value.level,
    status: editFormData.value.status,
    result: editFormData.value.result,
  };
  const res = await UPDATE_COMPLAIN(params);
  if (res.code == 200) {
    ElMessage({
      type: "success",
      message: "编辑投诉信息成功！",
    });
    getALLComplain();
  } else {
    ElMessage({
      type: "error",
      message: "编辑投诉信息失败，请重试！",
    });
  }
  dialogVisible.value = false;
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
