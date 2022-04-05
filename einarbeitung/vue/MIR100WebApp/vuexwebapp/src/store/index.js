import { createStore } from 'vuex'
import { state, getters } from './modules/missions';

// Create Store
export const store = createStore({ state, getters })