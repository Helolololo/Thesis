// Tutorial: Async Java Script Tutorial For Beginners (Callbacks, Promises, Async Await)
// https://www.youtube.com/watch?v=_8gHHBlbziw&ab_channel=DevEd

console.log("Start");

function loginUser(email, password, callback) {
    setTimeout(() => {
        callback({ userEmail: email });
    }, 2000);
}

function getUserVideos(email, callback) {
    setTimeout(() => {
        callback(["video1", "video2", "video3"]);
    }, 1000);
}
// => anonymous function; would basically correspond to:
/*async function setTimeout(func, time) {
    // wait time ampount
    func()
}

function getUserVideos(email, callback) {
    function hui () {
        callback([]);
    }
    
    setTimeout(hui, 1000)
}
*/

const user = loginUser('test@mail.com', 123456, (user) => {
    console.log(user);
    getUserVideos(user.userEmail, videos => {
        console.log(videos);
    });
});

console.log("Finish");