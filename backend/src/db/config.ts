import mysql, { Pool } from 'mysql2/promise';
require('dotenv').config();

let globalPool: Pool | null = null;
async function client() {
  if (globalPool) {
    return globalPool;
  }
  globalPool = mysql.createPool({
    host: process.env.MYSQL_HOST as string,
    port: process.env.MYSQL_PORT as unknown as number,
    user: process.env.MYSQL_USER as string,
    password: process.env.MYSQL_PASSWORD as string,
    database: process.env.MYSQL_DATABASE as string,
    connectionLimit: 10,
  });
  return globalPool;
}

export default client;
