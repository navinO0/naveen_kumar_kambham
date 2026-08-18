// Commented out native SQLite database driver for static / serverless deployment compatibility on GitHub & Vercel.
// All data is dynamically loaded from lib/data/portfolioData.ts.

/*
import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "portfolio.db");

export function getDb() {
  const db = new Database(dbPath);
  db.pragma("journal_mode = WAL");
  return db;
}

export default getDb;
*/

export function getDb(): null {
  return null;
}

export default getDb;
