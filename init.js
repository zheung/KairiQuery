require('babel-register');

global._c = console;

global.ll = _c.log;

global.fs = require('fs');
global.path = require('path');

global.Promise = require('bluebird');

global.dir = __dirname;

ll('init');