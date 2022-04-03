//import axios from 'axios';

export const state = {
    todos: [
        {
            id: 1,
            title: 'Todo One'
        },
        {
            id: 2,
            title: 'Todo Two'
        },
        {
            id: 3,
            title: 'Todo Three'
        },
        {
            id: 4,
            title: 'Todo Four'
        },
        {
            id: 5,
            title: 'Todo Five'
        },
    ]
};

export const getters = {
    allTodos(state) { return state.todos }
};

export const actions = {};

export const mutations = {};

export default {
    state,
    getters,
    actions,
    mutations,
};