const { Schema, model } = require("mongoose");
const Joi = require("joi");
const { handleMongooseError } = require("../helpers");

const boxSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for box"],
    },
    email: {
      type: String,
      required: true
    },
    message: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user", // Назва колекції
      require: true,
    }
  },
  { versionKey: false, timestamps: true }
);

boxSchema.post("save", handleMongooseError);

const Box = model("boxes", boxSchema);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const putSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  putSchema,
  updateFavoriteSchema,
};

module.exports = {
  Box,
  schemas,
};