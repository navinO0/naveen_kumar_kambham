import { getDb } from "../db";
import { Tool } from "../db/schema";

export function getAllTools(): Tool[] {
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
