import * as Joi from 'joi'
import config from './config';

export default {
  getToken: {
    body: Joi.object({ 
        company: Joi.string().valid('Hello').required().error((errors => { errors.forEach(err => { err.message = "incorrect information"; }); return errors })),
        key: Joi.string().valid(config.key).required().error((errors => { errors.forEach(err => { err.message = "incorrect information"; }); return errors })),
        version: Joi.number().valid(config.version).required().error((errors => { errors.forEach(err => { err.message = "incorrect information"; }); return errors })),
    })
  },
  querySchema: {
      body: Joi.object({
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        address_id: Joi.number().required(),
        email: Joi.string().email().trim().required(),
        store_id: Joi.number(),
        picture: Joi.string().allow(null),
        active: Joi.number().required(),
        username: Joi.string().required(),
        password: Joi.string(),
        last_update: Joi.string().optional()
    })
  },
  createUser: {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        address_id: Joi.number().required(),
        picture: Joi.string().min(20).required(),
        email: Joi.string().email().trim().required(),
        store_id: Joi.string(),
        active: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().regex(/[a-zA-Z0-9]{6,30}$/).required(),
        last_update: Joi.string().required()
    }
  }
};