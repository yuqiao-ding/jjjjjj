<template>
  <div class="hello">
    <el-card
      style="width:300px; margin-left:auto; margin-right:auto; text-align:center;"
      class="box-card"
    >
      <el-input style="margin-bottom:10px;" v-model="mobile" placeholder="请输入内容"></el-input>
      <el-input style="margin-bottom:10px;" v-model="password" placeholder="请输入密码"></el-input>
      <el-button type="primary" @click="handleLogin">点击登陆</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      title: "登录",
      mobile: "",
      password: ""
    };
  },
  methods: {
    handleLogin() {
      const self = this;
      axios
        .post("https://taskapi.echotask.cn/api/auth/login", {
          mobile: self.mobile,
          password: self.password
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
