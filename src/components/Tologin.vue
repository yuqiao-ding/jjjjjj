
<template>
  <div>
    <el-card class="Tologin">
      <el-form ref="tologinForm" label-width="90px" :model="tologinForm" :rules="tologinRules">
        <el-form-item prop="mobile" label="手机/账号">
          <el-input v-model="tologinForm.mobile"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码">
          <el-input v-model="tologinForm.password"></el-input>
        </el-form-item>
        <el-button type="primary" style="width:30%" :loading="loading" @click="tologin">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      loading: false,
      tologinForm: {
        mobile: "",
        password: ""
      },
      tologinRules: {
        password: {
          type: "string",
          required: true,
          message: "密码不能为空",
          trigger: "blur"
        },
        mobile: {
          type: "string",
          required: true,
          trigger: "blur",
          validator: (rule, value, callback) => {
            if (!value) {
              callback(new Error("手机号码不能为空!"));
              return;
            }
            if (!/^1[3456789]\d{9}$/.test(value)) {
              callback(new Error("请输入正确的手机号!"));
              return;
            }
          }
        }
      }
    };
  },
  methods: {
    tologin() {
      const self = this;
      axios
        .post("https://taskapi.echotask.cn/api/auth/login", {
          mobile: self.tologinForm.mobile,
          password: self.tologinForm.password
        })
        .then(function(response) {
          console.log(response);
          if (0 === response.data.errCode) {
            self.$message({
              message: "恭喜你，登录成功",
              type: "success"
            });
            localStorage.setItem(
              "echotask_access_token",
              response.data.content.access_token
            );
            localStorage.setItem(
              "echotask_expired_in",
              response.data.content.expired_in
            );
          } else {
            self.$message({
              message: response.data.message
            });
          }
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  }
};
</script>

<style scoped>
.Tologin {
  width: 300px;
  margin-top: 40px;
  margin-left: auto;
  margin-right: auto;
}
</style> 
