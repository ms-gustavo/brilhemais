const Joi = require("joi");

function validateRegisterUser(name, email, password, confirmpassword) {
  const schema = Joi.object({
    name: Joi.string().required().messages({
      "any.required": `O nome é obrigatório`,
    }),
    email: Joi.string().required().messages({
      "any.required": `O e-mail é obrigatório`,
    }),
    password: Joi.string().required().messages({
      "any.required": `A senha é obrigatória`,
    }),
    confirmpassword: Joi.string()
      .required()
      .valid(Joi.ref("password"))
      .messages({
        "any.required": `A confirmação de senha é obrigatória`,
        "any.only": `A confirmação de senha deve ser igual à senha`,
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
    email: Joi.string().required().messages({
      "any.required": `O e-mail é obrigatório`,
    }),
    password: Joi.string().required().messages({
      "any.required": `A senha é obrigatória`,
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
