const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/booking_controller");
router.post('/create/:cid/:sid',bookingController.create);  
router.post('/delete/:cid/:sid',bookingController.delete);  

module.exports = router;