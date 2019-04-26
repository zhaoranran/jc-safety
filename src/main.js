// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/common.css'
import Mint from 'mint-ui';

import App from './App.vue'
import router from './router'
import axios from './utils/index';

Vue.use(Mint);
Vue.use(ElementUI);
//  这样就可以通过$axios发起请求了（个人使用喜好）
Vue.prototype.$axios = axios;

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
