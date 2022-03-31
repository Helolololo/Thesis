// Tutorial Async JS Crash Course - Callbacks, Promises, Async Await
// https://www.youtube.com/watch?v=PoRJizFvM7s&ab_channel=TraversyMedia

// array
const posts = [
    { title: 'Post One', body: 'This is post one' },
    { title: 'Post Two', body: 'This is post two' }
];

function getPosts() {
    setTimeout(() => {      // takes in a callback
        let output = '';
    posts.forEach((post, index) => {    
            output += `<li>${post.title}</li>`;
        });
        document.body.innerHTML = output;
    }, 1000);
}

function createPost(post, callback) {
    setTimeout(() => {      // takes in a callback
        posts.push(post);
        callback();
    }, 2000);
}

createPost({ title: 'Post Three', body: 'This is post three' }, getPosts);