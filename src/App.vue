<template>
  <div id="app">
    <learnVue />
    <LoginModule />
    <UserProfile />
    <Tologin />
    <Search />
    <Page />
    <index />
  </div>
</template>

<script>
import learnVue from './components/learnVue'
import LoginModule from './components/LoginModule'
import UserProfile from './components/UserProfile'
import Tologin from './components/Tologin'
import Search from './components/Search'
import Page from './components/Page'
import index from './components/index'


export default {
  name: 'App',
  components: {
    learnVue,
    LoginModule,
    UserProfile,
    Tologin,
    Search,
    Page,
    index
  }
}
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
