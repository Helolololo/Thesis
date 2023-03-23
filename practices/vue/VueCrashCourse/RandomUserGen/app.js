// Tutorial: Vue JS Crash Course
// https://www.youtube.com/watch?v=qZXt1Aom3Cs&ab_channel=TraversyMedia

const app = Vue.createApp({
//    template: '<h1>Hello {{firstName}}</h1>',
    data() {
        return {
            firstName: 'Max',
            lastName: 'Mustermann',
            email: 'mustermann@gmail.com',
            gender: 'male',
            picture: 'https://randomuser.me/api/portraits/men/10.jpg',
        }
    },

    methods: {
        async getUser() {
            const res = await fetch('https://randomuser.me/api');
            const { results } = await res.json();

            this.firstName = results[0].name.first;
            this.lastName = results[0].name.last;
            this.email = results[0].email;
            this.gender = results[0].gender;
            this.picture = results[0].picture.large;
        }
    }
})

app.mount('#app')