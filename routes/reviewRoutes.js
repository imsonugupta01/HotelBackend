const express = require('express');
const { AddReview, getAllReview } = require("../controllers/reviewController");

const router= express.Router();

router.post("/add" ,AddReview)
router.get("/get",getAllReview)

module.exports=router;