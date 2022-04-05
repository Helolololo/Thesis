import axios from "axios";


const SERVER = "http://localhost:3000";

export const state = {
    missions: []
};

export const getters = {
    allMissions(state) { return state.missions }
    // allMissions: (state) => console.log(state) // state.missions
};

export const actions = {
    async fetchMissions({ commit }) {
        const res = await axios.get(SERVER + "/missions");

        commit("setMissions", res.data);
    },

    async addMission({ commit }, name) {
        const res = await axios.post(SERVER + "/missions",
            {
                name: name      // TO FIX: ID shall be added before name!
            });

        commit("newMission", res.data);
    },

    async deleteMission({ commit }, id) {
        if (confirm("Delete the task")) {
            await axios.delete(SERVER + `/missions/${id}`);

            commit('removeMission', id);
        }
    }
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