'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_ROOT: '"http://dev-casino-app.famely.com/v1/time/"',
  // API_ROOT: '"https://openapp.win.town/v1/time/"',//线上
  BASE_API: '"http://dev-casino-app.famely.com/v1/time/"'
})
