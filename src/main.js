import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
window.axios = require('axios')

import {
  MessageBox
} from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI);

window.axios.interceptors.request.use(
  function(config) {
    // 判断是否存在token，如果存在的话，则每个http header都加上token
    // eslint-disable-next-line no-prototype-builtins
    if (localStorage.hasOwnProperty('echotask_access_token')) {
      config.headers.Authorization =
        'Bearer ' + localStorage.getItem('echotask_access_token')
    }
    return config
  },
  function(error) {
    return Promise.reject(error)
  }
)

window.axios.interceptors.response.use(
  function(response) {
    return response
  },
  function(error) {
    switch (error.response.status) {
      case 401:
        MessageBox('您不是登录状态','标题名称 ',{
        confirmButtonText :'确定',
        callback :() =>{
          window.console.log("知道就行了");
        }
      });
        break
      case 400:
        break
      default:
        window.console.dir(error.response)
        break
    }
    return Promise.reject(error)
  }
)


new Vue({
  render: h => h(App),
}).$mount('#app')
