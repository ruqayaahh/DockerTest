import pkg from "pg";
const { Pool } = pkg;
// If you're working on a web application or other software which makes frequent queries you'll want to use a connection pool.

const pool = new Pool({
  connectionString:
    "postgres://xmhhdubx:N59wQRkcd79DCUoGbhgxPbSHxBk722oO@peanut.db.elephantsql.com/xmhhdubx",
});

const db = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};

export { db };
