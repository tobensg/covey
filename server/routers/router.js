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

app.delete('/api/users/:userId', route.removeUser);

app.get('/api/users/:coveyId', route.getAllUsers);

app.get('/api/coveys/:userId', route.getAllCoveys);

app.post('/api/coveys', route.addCovey);

app.delete('/api/coveys/:coveyId', route.removeCovey);

app.put('/api/coveys/:coveyId', route.updateCovey);

app.get('/api/coveys/:coveyid', route.getCovey);

app.post('/api/rides', route.addRide);

app.delete('/api/rides/:carId', route.removeRide);

app.get('/api/rides/:coveyId', route.getAllRides);

app.get('/api/riders/:carId', route.getAllRiders);

app.delete('/api/riders/:carId/:userId', route.removeRider);

app.post('/api/riders/:carId/:userId', route.addRider);

app.post('/api/resources', route.addResource);

app.delete('/api/resources/:resourceId', route.removeResource);

app.get('/api/resources/:coveyId', route.getAllResources);

app.get('/api/suppliers/:resourceId', route.getAllSuppliers);

app.delete('/api/suppliers/:carId/:userId', route.removeSupplier);

app.post('/api/suppliers/:carId/:userId', route.addSupplier);

app.post('/api/coveys/:coveyId/:userId', route.addAttendee);

app.delete('/api/coveys/:coveyId/:userId', route.removeAttendee);

module.exports = app;
