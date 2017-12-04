import * as jwt from 'jsonwebtoken';
import * as config from '../../config';

export const handleAuth = (req, res) => {
  const { id } = req.user;
  const token = jwt.sign({ id }, config.auth.jwt.secret, {
    expiresIn: config.auth.jwt.expires,
  });
  res.cookie('id_token', token, {
    maxAge: 1000 * config.auth.jwt.expires,
    httpOnly: true,
  });
};
