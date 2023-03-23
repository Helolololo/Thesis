// All the require lines on top, so you can easily see the dependencies for the module
const Joi = require('joi');     // class is returned; Upper Letter for class
const express = require('express');      // load express module

const app = express();

app.use(express.json());        // add a piece of middlewear; which will be used by app.use

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

// PORT; read the value of this port environment variable
const port = process.env.PORT || 3000;      // if port env variable is set use that one, otherwise 3000 as default
app.listen(port, () => console.log(`Listening on port ${port}...`));

/* HTTP Methods
app.get()
app.post()
app.put()
app.delete()    */

app.get('/', (req, res) => {        // '/' root of the website, call-back function => goes to
    res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
    res.send(courses); 
});

app.post('/api/courses', (req, res) => {
    // define a schema
    const result = validateCourse(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };

    // In Validate function now
    /*const schema = Joi.object({
        name: Joi.string().min(6).required()
    });

    const result = schema.validate(req.body);

    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };*/

    // usually how to validate without Joi
   /* if (!req.body.name || req.body.length < 3) {    // Input validation shouldnt be too long -> npm joi
        // 400 Bad Request
        res.status(400),send('Name is required and should be minimum 3 characters.')
        return;
    }*/

    const course = {
        id: courses.length + 1,
        name: req.body.name         // presume that the post request has a name attribute in the body
        // we need to enable parsing of JSON objects in the body of the request; by default disabled
    };
    courses.push(course);
    res.send(course);       // per convention reply with the body
});

// /api/courses/1
app.get('/api/courses/:id', (req, res) => {
    //res.send(req.params.id);
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found.');    // 404 - Object not round; restful API convention
    res.send(course);
});

app.get('/api/posts/:year/:month', (req, res) => {
    res.send(req.query);
    //res.send(req.params);
});

app.put('/api/courses/:id', (req, res) => {
    // look up the course
    // if not existing, rturn 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) {
        res.status(404).send('The course with the given ID was not found.');
        return;
        // more elegant:
        // if (!course) return res.status(404).send('The course with the given ID was not found.');
    }

    // validate
    // if invalid, return 400 - bad request
    const result = validateCourse(req.body);
    if (result.error) {
        res.status(400).send(result.error.details[0].message);
        return;
    };

    // update course
    course.name = req.body.name;
    res.send(course);
    // return updated course
});    // put method for updating resources

app.delete('/api/courses/:id', (req, res) => {
    // Look up the course
    // Not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id))
    if (!course) return res.status(404).send('The course with the given ID was not found.')

    // Delete
    const index = courses.indexOf(course);      // find the index of the course
    courses.splice(index, 1);                   // remove 1 object

    // Return the response
    res.send(course);
});

function validateCourse(course) {
    const schema = Joi.object({
        name: Joi.string().min(6).required()
    });

    return schema.validate(course);
}