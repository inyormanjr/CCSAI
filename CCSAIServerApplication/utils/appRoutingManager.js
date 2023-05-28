const auth = require('../routes/auth');
const users = require('../routes/users');
const courses = require('../routes/courses');
const terms = require('../routes/terms');
const enrollment = require('../routes/enrollment');
const enrollmentDetails = require('../routes/enrollmentDetails');
const modules = require('../routes/modules');
const discussions = require('../routes/discussion');
const dashboard = require('../routes/dashboard');
const anouncement = require('../routes/anouncement');
const exercises = require('../routes/exercise');
const assessments = require('../routes/assessment');
const studentRoute = require('../routes/studentRoute');
const apiRouteV1 = '/api/v1/';


function setRoutes(app) {

    app.use(apiRouteV1 + 'auth', auth);
    app.use(apiRouteV1 + 'users', users);
    app.use(apiRouteV1 + 'courses', courses);
    app.use(apiRouteV1 + 'terms', terms);
    app.use(apiRouteV1 + 'enrollment', enrollment);
    app.use(apiRouteV1 + 'enrollmentdetails', enrollmentDetails);
    app.use(apiRouteV1 + 'modules', modules);
    app.use(apiRouteV1 + 'discussions', discussions);
    app.use(apiRouteV1 + 'dashboard', dashboard);
    app.use(apiRouteV1 + 'anouncement', anouncement);
    app.use(apiRouteV1 + 'exercises', exercises);
    app.use(apiRouteV1 + 'assessment', assessments);
    app.use(apiRouteV1 + 'students', studentRoute);

}

module.exports = { setRoutes };