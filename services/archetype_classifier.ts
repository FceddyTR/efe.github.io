export type Archetype = 'mage' | 'rogue' | 'tank';

export interface StatPercentages {
  INT: number;
  STR: number;
  DEX: number;
}

export interface ArchetypeResult {
  primary: Archetype;
  label: string;
}

const STAT_PRIORITY: (keyof StatPercentages)[] = ['INT', 'STR', 'DEX'];
const ARCHETYPE_BY_STAT: Record<keyof StatPercentages, Archetype> = {
  INT: 'mage',
  STR: 'tank',
  DEX: 'rogue',
};

function capitalize(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

/**
 * Determine the dominant archetype based on percentage values for INT, STR, and DEX.
 */
export function classifyArchetype(stats: StatPercentages): ArchetypeResult {
  const statEntries = Object.entries(stats) as [keyof StatPercentages, number][];
  const highestValue = Math.max(...statEntries.map(([, value]) => value));
  const topStats = statEntries
    .filter(([, value]) => value === highestValue)
    .map(([stat]) => stat);

  const primaryStat = STAT_PRIORITY.find((stat) => topStats.includes(stat)) ?? topStats[0];
  const primary = ARCHETYPE_BY_STAT[primaryStat];

  const topArchetypes = topStats.map((stat) => ARCHETYPE_BY_STAT[stat]);
  const label =
    topArchetypes.length === 1
      ? capitalize(primary)
      : `Hybrid ${topArchetypes.map(capitalize).join(' / ')}`;

  return { primary, label };
}
