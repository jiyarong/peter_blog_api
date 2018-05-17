'use strict';
const database = require('./database')
const mail = require('./mail')

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1522122724144_7125';

  // add your config here
  config.middleware = [
    'currentUser'  
  ];

  config.sequelize = database
  config.email = mail

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

    domainWhiteList: [ 
      'http://localhost:3000', 
      'http://admin.jikabao.dev1:3001', 
      'http://blog.peterji.cn',
      'http://www.peterji.cn',
      'https://localhost:3000', 
      'https://admin.jikabao.dev1:3001', 
      'https://blog.peterji.cn',
      'https://www.peterji.cn'
    ],

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
