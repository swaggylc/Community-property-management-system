<template>
  <div class="repair-history">
    <el-card style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>我的报修记录</span>
        </div>
      </template>
      <!-- 内容（报修列表） -->
      <el-table :data="myRepairList" style="width: 100%" stripe>
        <el-table-column type="index" align="center" />
        <el-table-column prop="name" label="姓名" width="80" />
        <el-table-column prop="account" label="账号" align="center" />
        <el-table-column
          prop="create_time"
          label="创建时间"
          align="center"
        />
        <el-table-column prop="address" label="地址" align="center" />
        <el-table-column prop="content" label="报修内容" align="center" />
        <el-table-column prop="appraise" label="评价" align="center" />
        <el-table-column prop="status" label="报修状态" align="center">
          <template #default="scope">
            <div
              style="
                display: flex;
                align-items: center;
                justify-content: center;
              "
            >
              <span style="color: #999" v-if="scope.row.status == 0">
                已报修
              </span>
              <span style="color: #fa9600" v-if="scope.row.status == 1">
                维修中
              </span>
              <span style="color: #62b548" v-if="scope.row.status == 2">
                维修完成
              </span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template #default="scope">
            <div>
              <el-popconfirm
                title="确定报修已经完成了吗?"
                @confirm="changeRepairStatus(scope.row.repair_number)"
                width="200px"
              >
                <template #reference>
                  <el-button type="primary" v-if="scope.row.status != 2"
                    >已完成</el-button
                  >
                </template>
              </el-popconfirm>
              <el-button
                v-if="scope.row.appraise_status == 0"
                type="default"
                :disabled="scope.row.status != 2"
                @click="goAppraise(scope.row)"
                >去评价</el-button
              >
              <el-button v-if="scope.row.appraise_status == 1" type="default" disabled
                >已评价</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 对话框，用于填写评价 -->
    <el-dialog v-model="dialogVisible" title="填写评价" width="500">
      <el-form label-width="80px" :model="appraiseForm">
        <el-form-item label="报修编号">
          <el-input v-model="appraiseForm.repairNumber" disabled />
        </el-form-item>
        <el-form-item label="报修人">
          <el-input v-model="appraiseForm.name" disabled />
        </el-form-item>
        <el-form-item label="联系方式">
          <el-input v-model="appraiseForm.account" disabled />
        </el-form-item>
        <el-form-item label="评价内容">
          <el-input v-model="appraiseForm.appraise" type="textarea" />
        </el-form-item>
        <el-form-item label="评分">
          <el-rate
            v-model="appraiseForm.rate"
            :max="5"
            :colors="colors"
            show-text
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
import { GET_SELF_REPAIR, UPDATE_REPAIR, ADD_APPRAISE } from "@/api/public";
import useUserStore from "@/store/userInfo.js";
import { ElMessage } from "element-plus";
let userStore = useUserStore();

const myRepairList = ref([]);

const dialogVisible = ref(false);

const colors = ref(["#99A9BF", "#F7BA2A", "#FF9900"]);

const appraiseForm = ref({
  repairNumber: "",
  appraise: "",
  rate: 5,
  name: "",
  account: "",
});

onMounted(() => {
  getMyRepairList();
});

/**
 * @description: 获取我的报修记录
 * @param {number|string} uid 用户id
 * @return {}
 */
const getMyRepairList = async () => {
  let res = await GET_SELF_REPAIR(userStore.userInfo.uid);
  if (res.code == 200) {
    myRepairList.value = res.data;
  } else {
    ElMessage({
      type: "error",
      message: "遇到一点问题，请稍后再试！",
    });
  }
};

/**
 * @description: 更改报修状态的回调
 * @param {}
 * @return {}
 */
const changeRepairStatus = async (id) => {
  const params = { repairNumber: id, status: 2 };
  const res = await UPDATE_REPAIR(params);
  if (res.code == 200) {
    ElMessage.success("维修已完成，感谢您的配合！");
    getMyRepairList();
  } else {
    ElMessage({
      type: "error",
      message: "遇到一点问题，请稍后再试！",
    });
  }
};

/**
 * @description: 点击去评价的回调
 * @param {}
 * @return {}
 */
const goAppraise = (obj) => {
  console.log(obj.repair_number, "obj");
  dialogVisible.value = true;
  appraiseForm.value.repairNumber = obj.repair_number;
  appraiseForm.value.name = obj.name;
  appraiseForm.value.account = obj.account;
};

/**
 * @description:评价提交的回调
 * @param {}
 * @return {}
 */
const submit = async () => {
  dialogVisible.value = false;
  const params = {
    repairNumber: appraiseForm.value.repairNumber,
    appraise: appraiseForm.value.appraise,
    rate: appraiseForm.value.rate,
  };
  const res = await ADD_APPRAISE(params);
  if (res.code == 200) {
    ElMessage.success("评价成功,感谢您的配合！");
    getMyRepairList();
  } else {
    ElMessage.error("遇到一点问题，请稍后再试！");
  }
};
</script>

<style lang="scss" scoped></style>
