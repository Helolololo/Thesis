import axios from 'axios';

export const state = {
    todos: []
};

export const getters = {
    allTodos(state) { return state.todos }
};

export const actions = {
    async fetchTodos({ commit }) {
        const res = await axios.get('https://jsonplaceholder.typicode.com/todos');

        commit("setTodos", res.data);
    },

    async addTodo({ commit }, title) {
        const res = await axios.post('https://jsonplaceholder.typicode.com/todos', { title, completed: false });

        commit('newTodo', res.data);
    },

    async deleteTodo({ commit }, id) {
        await axios.delete(`https://jsonplaceholder.typicode.com/todos/${id}`);

        commit('removeTodo', id);
    },

    async filterTodos({ commit }, e) {
        // Get selected  number
        const limit = parseInt(
            e.target.options[e.target.options.selectedIndex].innerText
        );

        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?_limit=${limit}`);

        commit("setTodos", res.data);
    },

    async updateTodo({ commit }, updateTodo) {
        const res = await axios.put(`https://jsonplaceholder.typicode.com/todos/${updateTodo.id}`, updateTodo);

        commit('modifyTodo', res.data);
    }
};

export const mutations = {
    setTodos: (state, todos) => (state.todos = todos),
    newTodo: (state, todo) => (state.todos.unshift(todo)),      // to push element in the beginning
    removeTodo: (state, id) => state.todos = state.todos.filter(todo => todo.id !== id),
    modifyTodo: (state, updateTodo) => {
        const index = state.todos.findIndex(todo => todo.id === updateTodo.id);
        if (index !== -1) {
            state.todos.splice(index, 1, updateTodo);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations,
};