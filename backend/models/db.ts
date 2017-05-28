import * as mongoose from 'mongoose';

(<any>mongoose).Promise = require('bluebird');

export const db = mongoose.createConnection('localhost', 'main');
