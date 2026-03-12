export type Action = "view" | "create" | "edit" | "delete" | "approve" | "export" | "reopen_period" | "manage_users" | "manage_settings";

const matrix: Record<string, Action[]> = {
  SUPER_ADMIN: ["view", "create", "edit", "delete", "approve", "export", "reopen_period", "manage_users", "manage_settings"],
  COMPANY_ADMIN: ["view", "create", "edit", "delete", "approve", "export", "reopen_period", "manage_users", "manage_settings"],
  ACCOUNTANT: ["view", "create", "edit", "approve", "export"],
  BOOKKEEPER: ["view", "create", "edit", "export"],
  SALES_USER: ["view", "create", "edit"],
  EXPENSE_USER: ["view", "create", "edit"],
  APPROVER: ["view", "approve", "export"],
  AUDITOR_READ_ONLY: ["view", "export"]
};

export function can(role: string, action: Action) {
  return matrix[role]?.includes(action) ?? false;
}
