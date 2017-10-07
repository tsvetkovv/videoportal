import { Router } from 'express';
import { create, list, login, logout, read } from './user.controller';
import { isAuthenticated } from '../../config/passport';

const router = Router();

export default (app) => {
  router.route('/:userId(\\d+)')
  .get(read);

  router.route('')
  .post(create)
  .get(isAuthenticated, list);

  router.route('/login')
  .post(login);

  router.route('/logout')
  .get(logout);

  app.use('/api/user', router);
};
