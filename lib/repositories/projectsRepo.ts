import { getDb } from "../db";
import { Project } from "../db/schema";

export function getAllProjects(): Project[] {
  const db = getDb();
  try {
    const rows = db.prepare("SELECT * FROM projects ORDER BY year DESC").all() as any[];
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      oneLine: r.one_line,
      year: r.year,
      backendResponsibilities: JSON.parse(r.backend_responsibilities),
      stack: JSON.parse(r.stack),
      interestingProblem: r.interesting_problem,
      whatBroke: r.what_broke,
      whatIChanged: r.what_i_changed,
      whyIChoseIt: r.why_i_chose_it,
      whatILearned: r.what_i_learned,
      githubUrl: r.github_url,
      liveUrl: r.live_url,
    }));
  } finally {
    db.close();
  }
}

export function getProjectById(id: string): Project | null {
  const db = getDb();
  try {
    const r = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as any;
    if (!r) return null;
    return {
      id: r.id,
      name: r.name,
      oneLine: r.one_line,
      year: r.year,
      backendResponsibilities: JSON.parse(r.backend_responsibilities),
      stack: JSON.parse(r.stack),
      interestingProblem: r.interesting_problem,
      whatBroke: r.what_broke,
      whatIChanged: r.what_i_changed,
      whyIChoseIt: r.why_i_chose_it,
      whatILearned: r.what_i_learned,
      githubUrl: r.github_url,
      liveUrl: r.live_url,
    };
  } finally {
    db.close();
  }
}
