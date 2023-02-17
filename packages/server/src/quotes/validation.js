import Joi from 'joi'

export const validator = Joi.object({
  quote: Joi.string().alphanum().min(3).max(300).required(),
  author: Joi.string().alphanum().min(2).max(30).required(),
  id: Joi.string().alphanum().min(3).max(30),
})

export default validator

/* // Validate the object
const value = validator.validate({
  quote: 'You miss 100% of the shots you don't take.',
  author: 'Wayne Gretzky'
})
*/
