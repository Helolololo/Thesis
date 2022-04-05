import axios from "axios";

export const state = {
    missions: [
        {
            id: "6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc",
            name: "Laden fahren",
            url: "/v2.0.0/missions/6e8dbeaa-79f2-11ec-95f0-94c691a3e2dc"
        },
        {
            id: "56f192d2-a45b-11ec-8ad2-94c691a3e2dc",
            name: "Gebinde Aufnahme Abgabe Test",
            url: "/v2.0.0/missions/56f192d2-a45b-11ec-8ad2-94c691a3e2dc"
        },
        {
            id: "ad397606-a5bd-11ec-afc4-94c691a3e2dc",
            name: "Gebindeabgabe",
            url: "/v2.0.0/missions/ad397606-a5bd-11ec-afc4-94c691a3e2dc"
        }
    ]
};

export const getters = {
    fetchMissions(state) { return state.missions }
    // fetchMissions: (state) => console.log(state) // state.missions
};

export const actions = {};

export const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
}