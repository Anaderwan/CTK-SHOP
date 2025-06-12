// server/db.ts
import { Client } from 'pg';

export const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'ctkshop',
  password: '123456', // prilagodi
  port: 5432,
});

db.connect()
  .then(() => console.log('📦 DB connected'))
  .catch((err) => {
    console.error('❌ Error connecting to DB:', err);
    process.exit(1);
  });
