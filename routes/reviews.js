const express = require('express');
const route = express.Router({mergeParams: true});
const catchAsync = require('../utils/catchAsync');
const {validateReview,isLoggedIn,isReviewAuthor}=require('../middleware');
const reviews=require('../controllers/review');
const Campground = require('../models/campground');
const Review = require('../models/reviews');

route.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview));

route.delete('/:reviewId',isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview));

module.exports = route;