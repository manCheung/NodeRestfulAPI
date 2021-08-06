import express from 'express';
import sakilaCtrl from '../controllers/sakila.controller';
import paramValidation from '../../config/param-validation';
import { validate, Joi } from 'express-validation';

const router = express.Router();

const ensureToken = (req, res, next) => {
    const bearerHeader = req.headers.authorization;
    if (typeof bearerHeader !== 'undefined') {
      const bearer = bearerHeader.split(' ');
      const bearerToken = bearer[1];
      req.token = bearerToken;
      next();
    } else {
      res.status(403).send(Object.assign({ code: 403 }, { message: 'UNAUTHORIZED！' }));
    }
};


router.route('/')
    .get(sakilaCtrl.sakilaGet)
    .post(validate(paramValidation.querySchema, {}, {}), ensureToken, sakilaCtrl.sakilaPost); 

router.route('/:staff_id')
    .put(sakilaCtrl.sakilaPut) 
    .delete(sakilaCtrl.sakilaDelete);


export default router;