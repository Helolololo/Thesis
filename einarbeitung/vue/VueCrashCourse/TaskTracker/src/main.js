// Tutorial: Vue JS Crash Course
// https://www.youtube.com/watch?v=qZXt1Aom3Cs&ab_channel=TraversyMedia

import { createApp } from 'vue'
import App from './App.vue'     // importing root app component
import router from './router'

createApp(App)
    .use(router)
    .mount('#app')
