import * as mongoose from 'mongoose';

mongoose.Promise = require('bluebird');

export const db = mongoose.createConnection('localhost', 'main');
