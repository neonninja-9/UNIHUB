const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://unihubuser:unihubpass@localhost:5432/unihub'
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};