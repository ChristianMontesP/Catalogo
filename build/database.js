"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const keys_1 = __importDefault(require("./keys"));
const pool = new pg_1.Pool({
    user: keys_1.default.database.user,
    host: keys_1.default.database.host,
    database: keys_1.default.database.database,
    password: keys_1.default.database.password,
    port: keys_1.default.database.port,
});
pool.connect()
    .then(() => {
    console.log('DB is Connected');
})
    .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.message);
});
exports.default = pool;
