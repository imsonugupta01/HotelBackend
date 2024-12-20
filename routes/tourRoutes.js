const express = require('express');
// const multer = require('multer');
const { AdddTourPackage, findTours, GetTourDetail, getTourById } = require('../controllers/tourPackageController');
const authenticate = require('../middlewares/authenticate');



const router = express.Router();



router.post('/add',authenticate ,AdddTourPackage);
router.get('/get',findTours);
router.get('/getDetails/:title' ,GetTourDetail);
router.get('/getById',getTourById)
module.exports = router;
