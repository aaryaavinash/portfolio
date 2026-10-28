export interface ContributionSeries { data: number[]; endDate: string }

export function parseContributions(value: unknown): ContributionSeries {
  if (!value || typeof value !== 'object' || !('contributions' in value) || !Array.isArray(value.contributions)) throw new Error('Missing contribution history');
  const days = value.contributions as unknown[];
  if (!days.length || days.length > 400) throw new Error('Unexpected contribution history length');
  const data = days.map(day => {
    if (!day || typeof day !== 'object' || !('count' in day) || !('date' in day)) throw new Error('Invalid contribution day');
    const entry = day as { count: unknown; date: unknown };
    if (!Number.isInteger(entry.count) || (entry.count as number) < 0 || typeof entry.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(entry.date)) throw new Error('Invalid contribution day');
    return entry.count as number;
  });
  return { data, endDate: (days.at(-1) as { date: string }).date };
}
