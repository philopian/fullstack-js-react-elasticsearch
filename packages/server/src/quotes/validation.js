import Joi from 'joi'

const validator = Joi.object({
  quote: Joi.string().alphanum().min(3).max(300).required(),
  author: Joi.string().alphanum().min(3).max(30).required(),
})

export default validator

/* // Validate the object
const value = await validator.validateAsync({
  quote: 'You miss 100% of the shots you don't take.',
  author: 'Wayne Gretzky'
})
*/
