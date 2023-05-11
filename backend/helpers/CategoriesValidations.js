const Joi = require("joi");

function validateCreateCategory(name, image) {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `O nome é obrigatório`,
    }),
    image: Joi.string().required().messages({
      "any.required": `A imagem é obrigatória`,
    }),
  });
  const { error, value } = schema.validate({
    name,
    image,
  });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return errorMessage;
  }
}

module.exports = { validateCreateCategory };
