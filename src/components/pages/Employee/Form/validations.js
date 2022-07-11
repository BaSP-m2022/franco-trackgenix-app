import Joi from 'joi';

const moreThan18 = new Date(Date.now() - 1000 * 60 * 60 * 24 * 365 * 18 - 1000 * 60 * 60 * 24 * 4);
const schema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .message('First Name must have at least 3 characters')
    .max(30)
    .message('First Name must be less than 30 characters')
    .regex(/^[a-zA-Z]+$/)
    .message('First Name must have only letters')
    .required(),
  lastName: Joi.string()
    .min(3)
    .message('Last Name must have at least 3 characters')
    .max(30)
    .message('Last Name must be less than 30 characters')
    .regex(/^[a-zA-Z]+$/)
    .message('Last Name must have only letters')
    .required(),
  dni: Joi.string()
    .regex(/^[0-9]+$/)
    .message('You can use only integers numbers')
    .min(7)
    .message('DNI must have between 7 and 8 characters')
    .max(8)
    .message('DNI must have between 7 and 8 characters')
    .required(),
  email: Joi.string()
    .email({
      tlds: {
        allow: [
          'com',
          'org',
          'co',
          'net',
          'email',
          'edu',
          'ru',
          'uk',
          'au',
          'in',
          'de',
          'ir',
          'ca',
          'ar'
        ]
      }
    })
    .message('Your email must be a valid email')
    .required(),
  password: Joi.string()
    .min(8)
    .message('Password must have between 8 and 12 characters')
    .max(12)
    .message('Password must have between 8 and 12 characters')
    .pattern(/[a-zA-Z]/)
    .message('Password must have at least 1 letter')
    .pattern(/[0-9]/)
    .message('Password must have at least 1 number')
    .required(),
  dateOfBirth: Joi.date()
    .max(moreThan18)
    .message('Your age must be greater than 18 years old')
    .required()
});

export default schema;
