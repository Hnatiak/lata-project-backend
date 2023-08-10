const mongoose = require('mongoose');
const { Schema, model } = require('mongoose');
const Joi = require('joi');

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const buySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    match: emailRegexp,
    require: true,
  },
  phone: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  nameOfBox: {
    type: String,
    required: true,
  },
  sum: {
    type: Number,
    required: true,
  },
  paymentMethod: {
    type: String,
    enum: ['карточка', 'готівка'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  comment: String,
});

const buyValidationSchema = Joi.object({
//   name: Joi.string().required(),
  name: Joi.string().regex(/^\S*$/).required(),
//   surname: Joi.string().required(),
  surname: Joi.string().regex(/^\S*$/).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  address: Joi.string().required(),
  nameOfBox: Joi.string().required(),
  sum: Joi.number().required(),
  paymentMethod: Joi.string().valid('карточка', 'готівка').required(),
  quantity: Joi.number().integer().required(),
  comment: Joi.string(),
});

const buySchemasForPay = {
    buyValidationSchema,
}

const Buy = model('Buy', buySchema);

module.exports = {
  Buy,
  buyValidationSchema,
  buySchemasForPay,
};