
const http = require('http');

const server = http.createServer((req, res) => {        // create server
    if (req.url ==='/') {          // check for very routes for the application; not applicable with too many if statements --> framework: express
        res.write('Hello World');
        res.end();
    }

    if (req.url === 'api/courses') {
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
});

server.listen(3000);

console.log('Listening on port 3000...');