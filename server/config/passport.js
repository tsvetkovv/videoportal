import passport from 'passport';
import LocalStrategy from 'passport-local';
import UserStorage from '../api/user/user.storage';
import userErrors from '../api/user/user.errors';

passport.serializeUser((user, done) => {
  // done(null, user.id);
});

passport.deserializeUser((id, done) => {
  // UserStorage.getById(id)
  // .then(user => done(null, user))
  // .catch(err => done(err, false));
});

/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy(
  { usernameField: 'login', passwordField: 'password', session: true },
  (login, password, done) => {
    // UserStorage.checkCredentials(login, password)
    // .then(user => {
    //     if (user) {
    //         // success
    //         return done(null, user);
    //     }
    //     return done(null, false, { msg: userErrors.incorrectPassword });
    // }).catch(err => {
    //     return done(null, false, { msg: err.message });
    // });
  }));


/**
 * Login Required middleware.
 */
export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.sendStatus(403);
}
