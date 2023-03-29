const Campground = require('../models/campground');
const Review = require('../models/reviews');

module.exports.createReview = async (req,res,next) => {
    const campground=await Campground.findById(req.params.id);
    const review=new Review(req.body.Review);
    campground.reviews.push(review);
    review.author=req.user._id;
    await campground.save();
    await review.save();
    req.flash('success','Made a new review!');
    res.redirect(`/campgrounds/${campground._id}`);
}

module.exports.deleteReview = async(req,res,next) =>{
    const {id,reviewId} = req.params;
    await Campground.findByIdAndUpdate(id, {$pull: {reviews: reviewId}});
    await Review.findByIdAndDelete(reviewId);
    req.flash('success','Deleted a review!');
    res.redirect(`/campgrounds/${id}`);
}