// import Vuex from 'vuex';
// import * as Vue from 'vue'

// //import { app } from 'cli';
// import todos from './modules/todos';

// // Load Vuex
// console.log(Vue)
// Vue.use(Vuex);

// // // Create store
// export default new Vuex.Store({
//     modules: {
//         todos
//     }
// });

import { createStore } from 'vuex'
import { state, getters, actions, mutations } from './modules/todos';

export const store = createStore({ state, getters, actions, mutations })