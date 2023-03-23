import { createStore } from 'vuex'
import { state, getters, actions, mutations } from './modules/missions';

// Create Store
export const store = createStore({ state, getters, actions, mutations })