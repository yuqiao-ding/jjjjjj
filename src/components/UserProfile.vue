<template>
  <div class="hello">
    <el-card class="userProfile">
      <section v-if="userProfile">
         <el-avatar size="medium" :src="userProfile.avatar"></el-avatar>
         <p>昵称: {{userProfile.name}}</p>
         <p>手机号: {{userProfile.mobile}}</p>
         <p>注册时间: {{userProfile.created_at}}</p>
         <p>修改时间: {{userProfile.updated_at}}</p>
         <p>创建任务总数: {{userProfile.created_tasks_count}}</p>
      </section>
      <el-button type="primary" @click="getUserProfile">点击获取当前用户信息</el-button>
    </el-card>
  </div>
</template>

<script>
import axios from "axios"

export default {
  data() {
     return {
       userProfile: undefined
    };
  },
  methods: {
    getUserProfile() {
      const self = this;
      axios.get('https://taskapi.echotask.cn/api/console/personal')
       .then(function (response) {
       window.console.log(response);
       if(0 === response.data.errCode){
         // window.console.log(response.data.content);
         self.userProfile = response.data.content;
            } else {
         window.console.log(response.data.message);
     }
        })
       .catch(function (error) {
        window.console.log(error);
        });
         window.console.log('开始获取当前的登录用户信息');
     }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.userProfile{
width:300px;
margin-top:40px;
margin-left:auto;
margin-right:auto;
margin-align:center;
}
</style>
