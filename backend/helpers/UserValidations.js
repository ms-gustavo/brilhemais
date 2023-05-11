const Joi = require("joi");
const i18n = require("./i18n");
i18n.setLocale("br");

function validateRegisterUser(name, email, password, confirmpassword) {
  const schema = Joi.object({
    name: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("NAME_REQUIRED"),
      }),
    email: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("EMAIL_REQUIRED"),
      }),
    password: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("PASSWORD_REQUIRED"),
      }),
    confirmpassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.required": i18n.__("CONFIRMPASSWORD_REQUIRED"),
        "any.only": i18n.__("PASSWORD_EQUALS_CONFIRMPASSWORD"),
      }),
  });

  const { error } = schema.validate({
    name,
    email,
    password,
    confirmpassword,
  });

  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return errorMessage;
  }

  return null;
}

function validateLoginUser(email, password) {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("EMAIL_REQUIRED"),
      }),
    password: Joi.string()
      .required()
      .messages({
        "any.required": i18n.__("PASSWORD_REQUIRED"),
      }),
  });
  const { error } = schema.validate({
    email,
    password,
  });
  if (error) {
    const errorMessage = error.details.map((detail) => detail.message);
    return errorMessage;
  }
  return null;
}

module.exports = { validateRegisterUser, validateLoginUser };
