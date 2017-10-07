const { env } = process;

export default {
  port: env.PORT,
  db: {
    server: env.DB_SERVER,
    database: env.DB_DATABASE,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    port: env.DB_PORT && parseInt(env.DB_PORT),
    debug: env.DB_DEBUG === 'true',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  },
  session: {
    secret: env.SESSION_SECRET,
    maxAge: env.SESSION_MAX_AGE && parseInt(env.SESSION_MAX_AGE),
    httpOnly: true,
    key: env.SESSION_KEY
  }
};
