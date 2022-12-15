const express = require('express');
const router = express.Router();
const controller= require('../controllers/trips');
const tripscontroller= require('../controllers/trips');
const authController = require('../controllers/authentication');
const jwt = require('express=jwt');
//const auth = jwt({ secret: process.env.JWT_SECRET, userProperty: 'Payload'});
const auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: "payload",
  algorithms: ["HS256"],
});

router  
  .route('/login')
  .post(authController.login);

router
   route('/register')
  .post(authController.register);



/* GET home page. */
router.route('/trips')
.get(controller.tripList)
.post(auth, tripscontroller.tripsAddTrip)
.post(auth, controller.tripsAddTrip)
.put(controller.tripsUpdateTrip)



router.route('/trips/:tripCode')
.get(controller.tripsFindByCode);
//.put(auth, tripscontroller.tripsUpdateTrip);


router.route('/trips/delete/:tripCode').delete(controller.deleteTripByCode);
router.route('/trips/:tripCode').get(controller.tripsFindByCode);
module.exports = router;

