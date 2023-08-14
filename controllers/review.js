const { Review } = require('../models/review');
// const { HttpError, ctrlWrapper } = require("../helpers");

const getReviews = async (req, res) => {
    try {
      const reviews = await Review.find(); // Use `find()` to get all reviews from the database
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ message: 'Помилка при отриманні відгуків' });
    }
  };
  
  const addReview = async (req, res) => {
    const {_id: owner} = req.user;
    const result = await Review.create({...req.body, owner});
    res.status(201).json(result);
  };


  const editReview = async (req, res) => {
    const owner = req.params.id;
    const { name, email, comment } = req.body;
    
    try {
      const review = await Review.findById(owner);
      if (!review) {
        throw new Error('Відгук не знайдено');
      }
  
      // Check if the authenticated user is the owner of the review
      if (review.owner.toString() !== req.user._id.toString()) {
        throw new Error('У вас немає дозволу на редагування цього відгуку');
      }
  
      review.name = name;
      // review.email = email;
      review.comment = comment;
      const updatedReview = await review.save();
      res.json(updatedReview);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

const deleteReview = async (req, res) => {
    const reviewId = req.params.id;
  
    try {
      const review = await Review.findById(reviewId);
      if (!review) {
        throw new Error('Відгук не знайдено');
      }
  
      // Check if the authenticated user is the owner of the review
      if (review.owner.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: 'У вас немає дозволу на видалення цього відгуку' });
      }
  
      // Delete the review
      await Review.findByIdAndDelete(reviewId);
      res.json({ message: 'Відгук успішно видалено' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };
  

module.exports = {
  getReviews,
  addReview,
  editReview,
  deleteReview,
};