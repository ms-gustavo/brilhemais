const Joi = require("joi");
const i18n = require("./i18n");
i18n.setLocale("br");

function validateCreateAccessory(name, category, price, description, images) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("NAME_REQUIRED"),
      }),
    category: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("CATEGORY_REQUIRED"),
      }),
    price: Joi.number()
      .required()
      .messages({
        "any.required": i18n.__("PRICE_REQUIRED"),
        "number.base": i18n.__("PRICE_IS_NUMBER"),
      }),
    description: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("DESCRIPTION_REQUIRED"),
      }),
    images: Joi.array()
      .min(1)
      .required()
      .messages({
        "any.required": i18n.__("IMAGE_REQUIRED"),
        "array.min": i18n.__("IMAGE_REQUIRED"),
      }),
  });

  const { error } = schema.validate({
    name,
    category,
    price,
    description,
    images,
  });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return errorMessage;
  }
}

function validateUpdateAccessory(name, price, description) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("NAME_REQUIRED"),
      }),
    price: Joi.number()
      .required()
      .messages({
        "any.required": i18n.__("PRICE_REQUIRED"),
        "number.base": i18n.__("PRICE_IS_NUMBER"),
      }),
    description: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("DESCRIPTION_REQUIRED"),
      }),
  });
  const { error, value } = schema.validate({
    name,
    price,
    description,
  });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return {
      error: errorMessage,
      value: null,
    };
  }
  return {
    error: null,
    value: {
      name: value.name,
      price: value.price,
      description: value.description,
    },
  };
}

module.exports = { validateCreateAccessory, validateUpdateAccessory };
