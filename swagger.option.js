const options = {
  swaggerDefinition: {
      info: {
          description: 'This is a One12 server',
          title: 'ONE12',
          version: '1.0.0',
      },
      host: 'localhost:3000',
      basePath: '/api',
      produces: [
          "application/json",
          "application/xml"
      ],
      schemes: ['http', 'https'],
      securityDefinitions: {
          JWT: {
              type: 'apiKey',
              in: 'header',
              name: 'Authorization',
              description: "",
          }
      }
  },
  basedir: __dirname, // app absolute path
  files: ['./resources/**/*.js'] // Path to the API handle folder
};

module.exports = options;