import { Pool } from 'pg';
import keys from './keys';

const pool = new Pool({
  user: keys.database.user,
  host: keys.database.host,
  database: keys.database.database,
  password: keys.database.password,
  port: keys.database.port,
});

pool.connect()
  .then(() => {
    console.log('DB is Connected');
  })
  .catch(err => {
    console.error('Error connecting to PostgreSQL:', err.message);
  });

export default pool;
