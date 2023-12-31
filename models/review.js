const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");
const Joi = require('joi'); // Переконайтеся, що ви підключили пакет Joi і встановили його

const reviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: false,
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "user", // Назва колекції
    require: true,
  }
});

const emailRegexp = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/; // Переконайтеся, що ви маєте змінну emailRegexp

const reviewPostSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().pattern(emailRegexp).required(),
  message: Joi.string(),
  rating: Joi.number().min(1).max(5).required(),
});

const schemas = {
  reviewPostSchema,
};

const Review = mongoose.model('Review', reviewSchema);

module.exports = {
  Review,
  schemas,
};
