import { Tool } from "../db/schema";
import { tools } from "../data/portfolioData";

// Commented SQLite DB imports & getters for zero-dependency / serverless deployments:
/*
import { getDb } from "../db";

export function getAllToolsFromDb(): Tool[] {
  const db = getDb();
  try {
    const rows = db.prepare("SELECT * FROM tools").all() as any[];
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      category: r.category,
      explanation: JSON.parse(r.explanation),
      humanExplanation: r.human_explanation,
      sarcasticJoke: r.sarcastic_joke,
      whyItExists: r.why_it_exists,
      problemItSolves: r.problem_it_solves,
    }));
  } finally {
    db.close();
  }
}
*/

export function getAllTools(): Tool[] {
  return tools;
}
