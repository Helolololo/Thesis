import axios from "axios";

export const state = {
    missions: []
};

export const getters = {
    allMissions(state) { return state.missions }
    // allMissions: (state) => console.log(state) // state.missions
};

export const actions = {
    async fetchMissions({ commit }) {
        const res = await axios.get("http://localhost:3000/missions");

        commit("setMissions", res.data);
    },

};

export const mutations = {
    setMissions: (state, missions) => (state.missions = missions)
};

export default {
    state,
    getters,
    actions,
    mutations,
}