/*import Vue from 'vue';
import App from './App.vue';
import store from './store';

Vue.config.productionTip = false;

new Vue({
    store,
    render: h => h(App)
}).$mount('#app');*/

import { createApp } from 'vue'
import { store } from './store'
import App from './App.vue'

const app = createApp(App)

app.use(store)

app.mount('#app')
