export function parseScheduledDate(value: string | null) {
  if (!value) {
    return Number.NEGATIVE_INFINITY;
  }

  const parsed = Date.parse(`${value}, 2026`);
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed;
}
