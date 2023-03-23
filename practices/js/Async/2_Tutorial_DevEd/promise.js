// Tutorial: Async Java Script Tutorial For Beginners (Callbacks, Promises, Async Await)
// https://www.youtube.com/watch?v=_8gHHBlbziw&ab_channel=DevEd

/*
const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        console.log('got the user');
        resolve({ user: "isa"});
    }, 2000);
})

promise.then(user => {
    console.log(user);
});*/

console.log("Start");

function loginUser(email, password) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve({ userEmail: email});
        }, 2000);
    });
}

function getUserVideos(email) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(["video1", "video2", "video3"]);
        }, 1000);
    });
}

/*
loginUser('test@mail.com', 123456)
.then(user => getUserVideos(user.email))
.then(videos => console.log(videos));
*/


// Async Await
async function displayUser(){
    try{
        const loggedUser = await loginUser('ed', 12345);
        const videos = await getUserVideos(loggedUser.userEmail);

        console.log(videos);
    }
    catch(err){
        console.log("We could not get the videos");
    }
}

displayUser();


// Promise.All
/*const yt = new Promise(resolve => {
    setTimeout(() => {
        console.log('getting stuff from youtube');
        resolve({ videos: [1, 2, 3, 4, 5] });
    })
}, 2000);

const fb = new Promise(resolve => {
    setTimeout(() => {
        console.log('getting stuff from facebook');
        resolve({ user: "name"});
    })
}, 1000);

Promise.all([yt, fb]).then(result => console.log(result));
*/

console.log("Finish");