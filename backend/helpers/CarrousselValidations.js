const Joi = require("joi");
const i18n = require("./i18n");
i18n.setLocale("br");

function validateCreateCarroussel(name, images) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("NAME_REQUIRED"),
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
    images,
  });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return errorMessage;
  }
}

module.exports = { validateCreateCarroussel };
