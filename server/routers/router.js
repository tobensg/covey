const app = require('../config/server-config.js');
const route = require('./router-helpers');
// can set up different routes for each path
const bodyParser = require('body-parser');
const morgan = require('morgan');

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan('dev'));

app.get('/', route.getUsage);

app.post('/api/signup', route.signup);

app.get('/api/auth/:userId', route.getUser);

app.delete('/api/removeuser/:userId', route.removeUser);

app.get('/api/coveys/:userId', route.getAllCoveys);

app.post('/api/coveys', route.addCovey);

app.delete('/api/coveys/:coveyId', route.removeCovey);

app.put('/api/coveys/:coveyId', route.updateCovey);

app.get('/api/coveys/:coveyid', route.getCovey);

module.exports = app;
