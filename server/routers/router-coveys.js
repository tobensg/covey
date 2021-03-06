const Covey = require('../models/covey.js');
const Coveys = require('../collections/coveys.js');
const User = require('../models/user.js');
const knex = require('../config/config.js').knex;

exports.addCovey = (req, res) => {
  const userId = req.body.userId;
  const name = req.body.name;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const location = req.body.location;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const photoUrl = req.body.photoUrl;
  const details = req.body.details;
  const blurb = req.body.blurb;

  Coveys.create({
    name,
    startTime,
    endTime,
    location,
    address,
    city,
    state,
    photoUrl,
    details,
    blurb,
  })
  .then((covey) =>
    knex('coveys_users')
      .returning('covey_id')
      .insert({ user_id: userId, covey_id: covey.id, isOwner: true })
  )
  .then((coveyId) => {
    res.status(201).json({ id: coveyId[0], success: true });
  })
  .catch((err) => {
    res.status(404).json(err);
  });
};

exports.getAllCoveys = (req, res) => {
  const userId = req.params.userId;

  knex.from('coveys')
    .innerJoin('coveys_users', 'coveys.id', 'coveys_users.covey_id')
    .where('user_id', '=', userId)
    .then((coveys) => {
      res.status(200).json(coveys);
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.removeCovey = (req, res) => {
  const coveyId = req.params.coveyId;

  new Covey({ id: coveyId })
    .destroy()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.status(404).json(err);
    });
};

exports.updateCovey = (req, res) => {
  const coveyId = req.params.coveyId;

  const name = req.body.name;
  const startTime = req.body.startTime;
  const endTime = req.body.endTime;
  const location = req.body.location;
  const address = req.body.address;
  const city = req.body.city;
  const state = req.body.state;
  const photoUrl = req.body.photoUrl;
  const details = req.body.details;
  const blurb = req.body.blurb;

  Covey.where({ id: coveyId })
    .fetch()
    .then((covey) => {
      covey.set('name', name);
      covey.set('startTime', startTime);
      covey.set('endTime', endTime);
      covey.set('location', location);
      covey.set('address', address);
      covey.set('city', city);
      covey.set('state', state);
      covey.set('photoUrl', photoUrl);
      covey.set('details', details);
      covey.set('blurb', blurb);
      covey.save()
        .then((updatedCovey) => {
          res.status(201).json({ updatedCovey });
        });
    })
  .catch((err) => {
    res.status(404).json(err);
  });
};

exports.addAttendee = (req, res) => {
  const coveyId = req.params.coveyId;
  const userId = req.params.userId;

  knex('coveys_users')
    .where({
      user_id: userId,
      covey_id: coveyId,
    })
    .then((rows) => {
      if (rows.length !== 0) {
        res.status(409).send();
      } else {
        knex('coveys_users')
            .returning('covey_id')
            .insert({ user_id: userId, covey_id: coveyId })
        .then((coveyIs) => {
          new User({ id: userId })
            .fetch()
            .then((foundUser) => {
              if (foundUser) {
                res.status(201).json({ id: coveyIs[0], user: foundUser });
              } else {
                res.status(404).json('Could not find user in database');
              }
            })
            .catch((err) => {
              res.status(404).json(err);
            });
        })
        .catch((err) => {
          res.status(404).json(err);
        });
      }
    });
};

exports.removeAttendee = (req, res) => {
  const coveyId = req.params.coveyId;
  const userId = req.params.userId;
  /* eslint-disable */
  var carArray;
  var resourceArray;
  /* eslint-enable */

  knex
    .select('id')
    .from('cars')
    .where('covey_id', coveyId)
    .then((cars) => {
      carArray = [];
      cars.forEach((car) => carArray.push(car.id));

      knex('cars_users')
        .whereIn('car_id', carArray)
        .andWhere('user_id', userId)
        .del()
        .then(() => {
          // console.log('cars_users match deleted ', affectedRows);
        })
        .catch((err) => {
          console.log('error in removing attendee from cars: ', err);
        });
    });

  knex
    .select('id')
    .from('resources')
    .where('covey_id', coveyId)
    .then((resources) => {
      resourceArray = [];
      resources.forEach((resource) => resourceArray.push(resource.id));

      knex('resources_users')
        .whereIn('resource_id', resourceArray)
        .andWhere('user_id', userId)
        .del()
        .then(() => {
          // console.log('resources_users match deleted ', affectedRows);
        })
        .catch((err) => {
          console.log('error in removing attendee from resources: ', err);
        });
    });

  knex('coveys_users')
    .where('user_id', userId)
    .andWhere('covey_id', coveyId)
    .del()
    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      console.log('error in deleting coveys_users rows: ', err);
      res.status(404).json(err);
    });
};

exports.getCovey = (req, res) => {
  const coveyId = req.params.coveyId;

  Covey.where({ id: coveyId })
    .fetch()
    .then((covey) => {
      if (covey) {
        res.status(200).json({ covey });
      } else {
        res.status(404).json('Could not find covey in database');
      }
    })
    .catch((err) => {
      console.error('Could not find event in database: ', err);
      res.status(404).json(err);
    });
};
