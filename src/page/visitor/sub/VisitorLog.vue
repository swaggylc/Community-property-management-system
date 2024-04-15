<template>
  <div>
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>访客记录</span>
          <el-divider />
          <div style="display: flex; justify-content: space-between">
            <div>
              <el-select
                v-model="searchFormData.status"
                placeholder="是否离开"
                style="width: 240px; margin-right: 24px"
              >
                <el-option label="已离开" value="1" />
                <el-option label="未离开" value="2" />
              </el-select>
              <el-select
                v-model="searchFormData.manager"
                placeholder="值班人"
                style="width: 240px; margin-right: 24px"
              >
                <el-option
                  v-for="item in managerOptions"
                  :key="item.uid"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
              <el-input
                v-model="searchFormData.name"
                placeholder="请输入访客姓名"
                style="width: 240px; margin-right: 24px"
              ></el-input>
              <el-button @click="reset" style="width: 64px">重置</el-button>
            </div>
            <el-button @click="search" type="primary" style="width: 120px"
              >搜索</el-button
            >
          </div>
        </div>
      </template>
      <el-table :data="tableData" stripe style="width: 100%" max-height="600">
        <el-table-column type="index" align="center" />
        <el-table-column prop="name" label="姓名" align="center" />
        <el-table-column prop="tel_number" label="联系方式" align="center" />
        <el-table-column
          prop="visitor_number"
          label="访客数量"
          align="center"
          width="80"
        />
        <el-table-column prop="address" label="到访地址" align="center" />
        <el-table-column prop="content" label="进入原因" align="center" />
        <el-table-column prop="enter_time" label="进入时间" align="center" />
        <el-table-column prop="out_time" label="离开时间" align="center" />
        <el-table-column
          prop="no_out_result"
          label="未离开原因"
          align="center"
        />
        <el-table-column prop="manager" label="值班人" align="center" />
        <el-table-column prop="other" label="备注" align="center" />
        <el-table-column label="操作" align="center" width="220">
          <template #default="scope">
            <div>
              <el-button
                type="primary"
                :icon="Edit"
                @click="handleEdit(scope.row)"
                >Edit</el-button
              >
              <el-button
                type="danger"
                :icon="Delete"
                @click="handleDelete(scope.row.log_id)"
                >Delete</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogVisible" title="编辑访客记录" width="500">
      <el-form :model="editFormData" label-width="auto">
        <el-form-item label="姓名">
          <el-input v-model="editFormData.name" disabled />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="editFormData.telNumber" disabled />
        </el-form-item>
        <el-form-item label="进入原因">
          <el-input v-model="editFormData.content" disabled />
        </el-form-item>
        <el-form-item label="访客人数">
          <el-input v-model="editFormData.visitorNumber" disabled />
        </el-form-item>
        <el-form-item label="到访地址">
          <el-input v-model="editFormData.address" disabled />
        </el-form-item>
        <el-form-item label="进入时间">
          <el-input v-model="editFormData.enterTime" disabled />
        </el-form-item>
        <el-form-item label="离开时间">
          <el-date-picker
            v-model="editFormData.outTime"
            type="datetime"
            placeholder="选择访客离开时间"
            value-format="YYYY-MM-DD hh:mm:ss a"
          />
        </el-form-item>
        <el-form-item label="未离开原因">
          <el-input
            v-model="editFormData.noOutResult"
            placeholder="请输入未离开原因"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </el-form-item>
        <el-form-item label="值班人">
          <el-input v-model="editFormData.manager" disabled />
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="editFormData.other"
            placeholder="备注"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
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
    <!-- 验证码提示弹窗 -->
    <el-dialog v-model="codeDialogVisible" title="Tips" width="500">
      <div style="display: flex; align-items: center">
        <img
          :src="message"
          alt=""
          style="width: 19px; height: 19px; margin-right: 8px"
        />
        <span>将向超级管理员(15180595913)发送短信，是否继续？</span>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="codeDialogVisible = false">取消</el-button>
          <el-button v-if="!sendStatus" type="primary" @click="handlerSendCode">
            确定
          </el-button>
          <el-button v-else type="primary" disabled>
            {{ time }}s 后重试
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!-- 删除dialog，填写验证码 -->
    <el-dialog v-model="deleteDialogVisible" title="请填写验证码" width="500">
      <el-form :model="deleteForm" label-width="auto" style="max-width: 600px">
        <el-form-item label="验证码">
          <el-input v-model="deleteForm.reqCode" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handlerCodeSubmit">
            确定
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import {
  GET_VISITOR_LIST,
  UPDATE_VISITOR_CHECK,
  GET_CODE,
  DELETE_VISITOR_CHECK,
  GET_MANAGER,
  SEARCH_VISITOR,
} from "@/api/public.js";
import { ElMessage } from "element-plus";
import { Edit, Delete } from "@element-plus/icons-vue";
import useUserStore from "@/store/userInfo.js";
import message from "@/assets/images/message.png";

const userStore = useUserStore();

const tableData = ref([]);

const dialogVisible = ref(false);

const codeDialogVisible = ref(false);
// 是否调用短信接口
const sendStatus = ref(false);

const deleteDialogVisible = ref(false);
// 删除访客记录的参数
const deleteForm = ref({
  logId: "",
  reqCode: "", // 验证码
  account: userStore.userInfo.account,
});

let time = ref(10);

const searchFormData = ref({
  status: "", // 是否离开，1已离开，2未离开
  manager: "", // 值班人
  name: "", // 访客姓名
});

const managerOptions = ref([]); // 值班人列表

const editFormData = ref({
  logId: "",
  name: "", //禁用
  telNumber: "", //禁用
  content: "", //禁用
  visitorNumber: "", //禁用
  address: "", //禁用
  enterTime: "", //禁用
  outTime: "",
  noOutResult: "",
  manager: "", //禁用
  other: "",
});

onMounted(() => {
  getVisitorList();
  getManagerList();
});

/**
 * @description:
 * @param {}
 * @return {}
 */
const getVisitorList = async () => {
  const res = await GET_VISITOR_LIST();
  if (res.code == 200) {
    tableData.value = res.data;
  } else {
    ElMessage({
      message: res.msg,
      type: "error",
    });
  }
};

/**
 * @description: 点击编辑按钮的回调
 * @param {object} row 每一行的数据
 * @return {}
 */
const handleEdit = (row) => {
  dialogVisible.value = true;
  editFormData.value.logId = row.log_id;
  editFormData.value.name = row.name;
  editFormData.value.telNumber = row.tel_number;
  editFormData.value.content = row.content;
  editFormData.value.visitorNumber = row.visitor_number;
  editFormData.value.address = row.address;
  editFormData.value.enterTime = row.enter_time;
  editFormData.value.outTime = row.out_time;
  editFormData.value.noOutResult = row.no_out_result;
  editFormData.value.manager = row.manager;
  editFormData.value.other = row.other;
};

/**
 * @description: 更改访客记录的回调
 * @param {}
 * @return {}
 */
const submit = async () => {
  const params = {
    logId: editFormData.value.logId,
    outTime: editFormData.value.outTime,
    noOutResult: editFormData.value.noOutResult,
    other: editFormData.value.other,
  };
  const res = await UPDATE_VISITOR_CHECK(params);
  if (res.code === 200) {
    dialogVisible.value = false;
    getVisitorList();
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

/**
 * @description: 点击删除按钮的回调
 * @param {}
 * @return {}
 */
const handleDelete = async (logId) => {
  deleteForm.value.logId = logId;
  // 先判断是不是超级管理员
  if (userStore.userInfo.account != "15180595913") {
    codeDialogVisible.value = true;
  } else {
    // 如果是超级管理员直接删除
    const res = await DELETE_VISITOR_CHECK(logId);
    if (res.code == 200) {
      ElMessage.success("删除成功");
      getVisitorList();
    }
  }
};

/**
 * @description:点击发送验证码确定按钮的回调
 * @param {}
 * @return {}
 */
const handlerSendCode = async () => {
  const res = await GET_CODE();
  if (res.code == 200) {
    ElMessage.success("发送成功");
    codeDialogVisible.value = false;
    sendStatus.value = true;
    deleteDialogVisible.value = true;
    deleteForm.value.reqCode = res.data;
    // 60s倒计时
    const timer = setInterval(() => {
      // 可能倒计时结束后会变成负数，所以要判断，重新赋值
      if (time.value == 0) {
        time.value = 10;
      }
      time.value--;
      if (time.value == 0) {
        clearInterval(timer);
        sendStatus.value = false;
      }
    }, 1000);
  } else {
    ElMessage.error("发送失败");
  }
};

/**
 * @description: 填写验证码弹窗的确定按钮的回调
 * @param {}
 * @return {}
 */
const handlerCodeSubmit = async () => {
  const res = await DELETE_VISITOR_CHECK(deleteForm.value);
  if (res.code == 200) {
    ElMessage.success("删除成功");
    getVisitorList();
    deleteDialogVisible.value = false;
  } else {
    ElMessage.error("删除失败");
  }
};

/**
 * @description:
 * @param {}
 * @return {}
 */
const getManagerList = async () => {
  const res = await GET_MANAGER();
  if (res.code == 200) {
    // 循环管理员列表
    managerOptions.value = res.data.map((item) => {
      return {
        label: item.name,
        value: item.uid,
      };
    });
  }
};

/**
 * @description: 点击重置按钮的回调
 * @return {}
 */
const reset = () => {
  searchFormData.value.status = "";
  searchFormData.value.manager = "";
  searchFormData.value.name = "";
  getVisitorList();
};

/**
 * @description: 点击搜索按钮的回调
 * @param {}
 * @return {}
 */
const search = async () => {
  const res = await SEARCH_VISITOR(searchFormData.value);
  if (res.code == 200) {
    tableData.value = res.data;
  } else {
    ElMessage.error('搜索失败，请重试！');
  }
};
</script>

<style lang="scss" scoped></style>
