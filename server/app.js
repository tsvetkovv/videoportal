import path from 'path';
import express from 'express';
import wrench from 'wrench';
import logger from 'morgan';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import compress from 'compression';
import session from 'express-session';
import passport from 'passport';
import config from './config/config';

// import { initDB } from './api/core/helpers/db.helper';

/**
 * Middleware
 */
import notFound from './middleware/notFound';
import serverError from './middleware/serverError';

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport');

const app = express();
app.use(logger('dev')); // TODO: winston https://github.com/winstonjs/winston

// Should be placed before express.static
app.use(compress({
  filter: (req, res) => (/json/).test(res.getHeader('Content-Type')),
  level: 9
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors);

app.use(session({
  saveUninitialized: true,
  resave: true,
  secret: config.session.secret,
  cookie: {
    maxAge: config.session.maxAge,
    httpOnly: config.session.httpOnly/*,
        secure: config.session.secure && config.secure.ssl*/
  },
  key: config.session.key
  // store -> TODO mongoose
}));

app.use(passport.initialize());
app.use(passport.session());

// helmet
app.use(helmet());
app.use(helmet.noCache());

// initDB();

// loading routes
wrench.readdirSyncRecursive('./server/api').filter(file => (/\.(routes.js)$/i).test(file)).map(file => {
  require(path.resolve('./server/api', file)).default(app);
});

// index
app.use(/\//, (req, res, next) => {
  res.setHeader('Content-Type', 'text/html');
  res.send('Service web api works!');
});

// error handlers
app.use(notFound);
app.use(serverError);

export default app;
