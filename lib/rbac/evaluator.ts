export type UserRole = "ADMIN" | "MANAGER" | "EDITOR" | "VIEWER";
export type Action = "READ" | "CREATE" | "UPDATE" | "DELETE" | "DROP_TABLE";
export type Resource = "Project" | "Database" | "UserAccount" | "AuditLog";

export interface RbacEvaluationResult {
  allowed: boolean;
  role: UserRole;
  action: Action;
  resource: Resource;
  decisionReason: string;
  statusCode: number;
  auditMessage: string;
}

const PERMISSION_MATRIX: Record<UserRole, Record<Resource, Action[]>> = {
  ADMIN: {
    Project: ["READ", "CREATE", "UPDATE", "DELETE"],
    Database: ["READ", "CREATE", "UPDATE", "DELETE", "DROP_TABLE"],
    UserAccount: ["READ", "CREATE", "UPDATE", "DELETE"],
    AuditLog: ["READ", "CREATE"],
  },
  MANAGER: {
    Project: ["READ", "CREATE", "UPDATE"],
    Database: ["READ"],
    UserAccount: ["READ", "CREATE", "UPDATE"],
    AuditLog: ["READ"],
  },
  EDITOR: {
    Project: ["READ", "UPDATE"],
    Database: [],
    UserAccount: ["READ"],
    AuditLog: [],
  },
  VIEWER: {
    Project: ["READ"],
    Database: [],
    UserAccount: [],
    AuditLog: [],
  },
};

export function evaluateAccess(role: UserRole, action: Action, resource: Resource): RbacEvaluationResult {
  const allowedActions = PERMISSION_MATRIX[role]?.[resource] || [];
  const allowed = allowedActions.includes(action);

  let decisionReason = "";
  let statusCode = 200;

  if (allowed) {
    statusCode = 200;
    decisionReason = `Role '${role}' explicitly grants '${action}' permission on resource '${resource}'.`;
  } else {
    if (action === "DROP_TABLE" && role !== "ADMIN") {
      statusCode = 403;
      decisionReason = `DENIED: Destructive action 'DROP_TABLE' requires root 'ADMIN' privileges. Role '${role}' lacks system maintenance scope.`;
    } else if (role === "VIEWER") {
      statusCode = 403;
      decisionReason = `DENIED: Role 'VIEWER' has read-only privileges. Action '${action}' on '${resource}' is restricted.`;
    } else {
      statusCode = 403;
      decisionReason = `DENIED: Role '${role}' does not hold required permission bit for '${action}' on '${resource}'.`;
    }
  }

  const auditMessage = `[SECURITY AUDIT] Timestamp=${new Date().toISOString()} Role=${role} Action=${action} Resource=${resource} Outcome=${allowed ? "ALLOWED_200" : "DENIED_403"}`;

  return {
    allowed,
    role,
    action,
    resource,
    decisionReason,
    statusCode,
    auditMessage,
  };
}
