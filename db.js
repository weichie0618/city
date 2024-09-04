const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://jeffy:t0lmZNtl8agxQ25PvSbQUY4hkVydw39r@dpg-cr99lgt6l47c73cjg640-a.singapore-postgres.render.com/stock_system_s7ms',
  ssl: {
    rejectUnauthorized: false
  }
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool
};