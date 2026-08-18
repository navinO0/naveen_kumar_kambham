import { LearningTopic, TrenchNote } from "../db/schema";
import { learningTopics, trenchNotes } from "../data/portfolioData";

// Commented SQLite DB imports & getters for zero-dependency / serverless deployments:
/*
import { getDb } from "../db";

export function getAllLearningTopicsFromDb(): LearningTopic[] {
  const db = getDb();
  try {
    const rows = db.prepare("SELECT * FROM learning_topics ORDER BY order_index ASC").all() as any[];
    return rows.map((r) => ({
      id: r.id,
      topic: r.topic,
      orderIndex: r.order_index,
      status: r.status,
      whatIUnderstand: r.what_i_understand,
      whatIStillNeedToExplore: r.what_i_still_need_to_explore,
      notes: r.notes,
    }));
  } finally {
    db.close();
  }
}

export function getAllTrenchNotesFromDb(): TrenchNote[] {
  const db = getDb();
  try {
    const rows = db.prepare("SELECT * FROM trench_notes").all() as any[];
    return rows.map((r) => ({
      id: r.id,
      quote: r.quote,
      context: r.context,
      category: r.category,
    }));
  } finally {
    db.close();
  }
}
*/

export function getAllLearningTopics(): LearningTopic[] {
  return learningTopics;
}

export function getAllTrenchNotes(): TrenchNote[] {
  return trenchNotes;
}
