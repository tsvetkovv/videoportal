import passport from 'passport';

import UserModel from './user.model';
import storage from './user.storage';
import errors from './user.errors';

export async function create(req, res) {
  const { login, password } = req.body;
  const user = new UserModel({ login, password });

  if (errors.length) {
    return res.json(400, errors);
  }

  let userId;
  try {
    userId = await storage.create(user);
  } catch (err) {
    return res.status(500).send(err.message);
  }

  if (userId === -1) {
    return res.status(400).send(errors.nonUniqueLogin);
  }
  if (userId > 0) {
    return res.status(201).json(userId);
  }

  return res.status(500).send();
}

export async function read(req, res) {
  const { userId } = req.params;

  let user;
  try {
    user = await storage.getById(userId);
  } catch (err) {
    return res.status(500).send(err.message);
  }

  if (!user) {
    return res.status(404).send(errors.notFound);
  }

  return res.json(user);
}

export async function list(req, res) {
  try {
    return res.json(await storage.getList());
  } catch (err) {
    return res.status(500).send(err.message);
  }
}

export async function login(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(403).json(info);
    }
    req.logIn(user, (err) => {
      if (err) {
        return next(err);
      }

      return res.sendStatus(204);
    });
  })(req, res, next);
}

export async function logout(req, res) {
  req.logout();

  return res.sendStatus(204);
}
