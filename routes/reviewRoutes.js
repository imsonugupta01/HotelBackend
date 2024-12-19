const express = require('express');
const { AddReview } = require("../controllers/reviewController");

const router= express.Router();

router.post("/add" ,AddReview)

module.exports=router;