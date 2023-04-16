const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const campgrounds=require('../controllers/campground');
const Campground = require('../models/campground');
const multer=require('multer');
const {storage} = require('../cloudinary');
const upload = multer({storage});
const {isLoggedIn,isAuthor,validateCampground, isCampground} = require('../middleware');

router.route('/')
    .get(catchAsync(campgrounds.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgrounds.createCampground));

router.get('/new',isLoggedIn, campgrounds.renderNewForm);

router.get('/:id/edit',isLoggedIn, isAuthor, catchAsync(campgrounds.editCampground));

router.route('/:id')
    .get(catchAsync(campgrounds.showCampground))
    .put(isLoggedIn,isCampground, isAuthor, upload.array('image'), catchAsync(campgrounds.updateCampground))
    .delete(isLoggedIn, isCampground, isAuthor, catchAsync(campgrounds.deleteCampground));

module.exports = router;