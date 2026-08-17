export interface Project {
  id: string;
  name: string;
  oneLine: string;
  year: number;
  backendResponsibilities: string[];
  stack: string[];
  interestingProblem: string;
  whatBroke: string;
  whatIChanged: string;
  whyIChoseIt: string;
  whatILearned: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Tool {
  id: string;
  name: string;
  category: 'api_testing' | 'security' | 'load_testing' | 'database' | 'caching' | 'infrastructure' | 'languages';
  explanation: string[];
  humanExplanation: string;
  sarcasticJoke: string;
  whyItExists: string;
  problemItSolves: string;
}

export interface LearningTopic {
  id: string;
  topic: string;
  orderIndex: number;
  status: 'mastered' | 'building' | 'exploring';
  whatIUnderstand: string;
  whatIStillNeedToExplore: string;
  notes: string;
}

export interface TrenchNote {
  id: string;
  quote: string;
  context: string;
  category: 'security' | 'database' | 'architecture' | 'performance' | 'debugging';
}

export interface SecurityRule {
  id: string;
  topic: string;
  title: string;
  explanation: string;
  flowDescription: string;
  diagramSteps: string[];
  handwrittenNote: string;
}
