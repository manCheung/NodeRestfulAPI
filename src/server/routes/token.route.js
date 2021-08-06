import express from 'express';
import tokenCtrl from '../controllers/token.controller';
import paramValidation from '../../config/param-validation';
import { validate } from 'express-validation';

const router = express.Router();

router.route('/')
  .post(validate(paramValidation.getToken, {}, {}), tokenCtrl.tokenPost);

export default router;