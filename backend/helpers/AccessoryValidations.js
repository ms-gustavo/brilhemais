const Joi = require("joi");

function validateCreateAccessory(name, category, price, description, images) {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `O nome é obrigatório`,
    }),
    category: Joi.string().required().messages({
      "any.required": `A categoria é obrigatória`,
    }),
    price: Joi.number().required().messages({
      "any.required": `O preço é obrigatório`,
      "number.base": "O preço deve ser um número!",
    }),
    description: Joi.string().required().messages({
      "any.required": `A descrição é obrigatória`,
    }),
    images: Joi.array().min(1).required().messages({
      "any.required": `A imagem é obrigatória`,
      "array.min": `A imagem é obrigatória`,
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
    name: Joi.string().required().messages({
      "any.required": `O nome é obrigatório`,
    }),
    price: Joi.number().required().messages({
      "any.required": `O preço é obrigatório`,
      "number.base": "O preço deve ser um número!",
    }),
    description: Joi.string().required().messages({
      "any.required": `A descrição é obrigatória`,
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
