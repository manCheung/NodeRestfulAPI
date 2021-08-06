import express from 'express';
import config from './../../config/config';

/**
 * Route
 */
import token from './token.route';
import sakila from './sakila.route';

const router = express.Router();

/* GET localhost:[port]/api page. */
router.get('/', (req, res) => {
  res.send(`Welcome to : localhost:${config.port}/api`);
});

/** Sakila Router */
router.use('/token', token);

/** Sakila Router */
router.use('/sakila', sakila);

export default router;
