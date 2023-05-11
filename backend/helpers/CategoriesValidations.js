const Joi = require("joi");
const i18n = require("./i18n");
i18n.setLocale("br");

function validateCreateCategory(name, image) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("NAME_REQUIRED"),
      }),
    image: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("IMAGE_REQUIRED"),
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
