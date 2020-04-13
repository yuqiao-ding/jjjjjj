<template>
  <div id="app">
    <!-- <learnVue />
    <LoginModule />
    <UserProfile />
    <Tologin />
    <Search />-->
    <!-- <Page /> -->
    <GetUsersInfo v-if="isRouterAlive"/>
  </div>
</template>

<script>
// import learnVue from './components/learnVue'
// import LoginModule from './components/LoginModule'
// import UserProfile from './components/UserProfile'
// import Tologin from './components/Tologin'
// import Search from './components/Search'
// import Page from './components/Page'
import GetUsersInfo from "./components/GetUsersInfo";

export default {
  name: "App",
  provide() {
    //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true //控制视图是否显示的变量
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false; //先关闭，
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    }
  },
  components: {
    // learnVue,
    // LoginModule,
    // UserProfile,
    // Tologin,
    // Search,
    // Page,
    GetUsersInfo
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
