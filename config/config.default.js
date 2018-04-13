'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1522122724144_7125';

  // add your config here
  config.middleware = [];

  config.sequelize = {
    dialect: 'mysql', // support: mysql, mariadb, postgres, mssql
    database: 'peter_blog_api',
    host: 'localhost',
    port: '3306',
    username: 'root',
    password: 'ad66544970123',
  };

  
  config.bodyParser = {
    jsonLimit: '5mb',
    formLimit: '6mb',
  };

  config.view = {
    mapping: {
      '.js': 'assets',
    },
  }

  config.security = {
    xframe: {
      enable: false,
    },

    domainWhiteList: [ 'http://localhost:3000', 'http://admin.jikabao.dev1:3001' ],

    csrf: {
      enable: false,
    },

    cors: {
      origin: '*',
      allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS'
    }
  };

  return config;
};
