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

    async addMission({ commit }, name) {
        const res = await axios.post("http://localhost:3000/missions", name);

        commit("newMission", res.data);
    },

};

export const mutations = {
    setMissions: (state, missions) => (state.missions = missions),
    newMission: (state, mission) => state.missions.push(mission),
};

export default {
    state,
    getters,
    actions,
    mutations,
}