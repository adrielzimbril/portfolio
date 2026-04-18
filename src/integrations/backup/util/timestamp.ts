export function generateBackupTimestamp(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}
