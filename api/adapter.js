// eslint-disable-next-line import/no-unresolved
const low = require('lowdb');
// eslint-disable-next-line import/no-unresolved
const FileSync = require('lowdb/adapters/FileSync');
// eslint-disable-next-line import/no-unresolved
const Memory = require('lowdb/adapters/Memory');

const json = require('./db.json');
const isLocal = !process.env.NOW_REGION;
const type = isLocal ? new FileSync('./db.json') : new Memory();

const db = low(type);
db.defaults(json).write();

module.exports = db;
