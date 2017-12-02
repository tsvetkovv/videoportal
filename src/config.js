/* eslint-disable max-len */

if (process.env.BROWSER) {
  throw new Error(
    'Do not import `config.js` from inside the client-side code.',
  );
}

if (!process.env.DATABASE_URL) {
  throw new Error('You should set DATABASE_URL in .env file');
}

module.exports = {
  // Node.js app
  port: process.env.PORT || 3000,

  serviceWorker: !__DEV__,

  // API Gateway
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || '',
    // API URL to be used in the server-side code
    serverUrl:
      process.env.API_SERVER_URL ||
      `http://localhost:${process.env.PORT || 3000}`,
  },

  // Database
  // should be set in variables.env
  databaseUrl: process.env.DATABASE_URL,
  // Web analytics
  analytics: {
    // https://analytics.google.com/
    googleTrackingId: process.env.GOOGLE_TRACKING_ID, // UA-XXXXX-X
  },

  // Authentication
  auth: {
    jwt: {
      secret: process.env.JWT_SECRET || 'React Starter Kit',
      expires: 60 * 60 * 24 * 180, // 180 days
    },
  },
};
