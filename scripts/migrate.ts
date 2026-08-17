import Database from "better-sqlite3";
import path from "path";

const dbPath = path.join(process.cwd(), "portfolio.db");
const db = new Database(dbPath);

console.log("🛠 Running database migrations on portfolio.db...");

db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    one_line TEXT NOT NULL,
    year INTEGER NOT NULL,
    backend_responsibilities TEXT NOT NULL, -- JSON array
    stack TEXT NOT NULL, -- JSON array
    interesting_problem TEXT NOT NULL,
    what_broke TEXT NOT NULL,
    what_i_changed TEXT NOT NULL,
    why_i_chose_it TEXT NOT NULL,
    what_i_learned TEXT NOT NULL,
    github_url TEXT,
    live_url TEXT
  );

  CREATE TABLE IF NOT EXISTS tools (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    explanation TEXT NOT NULL, -- JSON array
    human_explanation TEXT NOT NULL,
    sarcastic_joke TEXT NOT NULL,
    why_it_exists TEXT NOT NULL,
    problem_it_solves TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS learning_topics (
    id TEXT PRIMARY KEY,
    topic TEXT NOT NULL,
    order_index INTEGER NOT NULL,
    status TEXT NOT NULL,
    what_i_understand TEXT NOT NULL,
    what_i_still_need_to_explore TEXT NOT NULL,
    notes TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS trench_notes (
    id TEXT PRIMARY KEY,
    quote TEXT NOT NULL,
    context TEXT NOT NULL,
    category TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS contact_messages (
    id TEXT PRIMARY KEY,
    sender_name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

console.log("✅ Database migrations executed successfully!");
db.close();
