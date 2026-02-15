export const STAT_FIELDS = [
  { key: 'fgm', label: 'Field Goals Made', shortLabel: 'FGM', group: 'shooting', min: 0, softMax: 20, dependsOn: 'fga' },
  { key: 'fga', label: 'Field Goals Attempted', shortLabel: 'FGA', group: 'shooting', min: 0, softMax: 30 },
  { key: 'ftm', label: 'Free Throws Made', shortLabel: 'FTM', group: 'shooting', min: 0, softMax: 15, dependsOn: 'fta' },
  { key: 'fta', label: 'Free Throws Attempted', shortLabel: 'FTA', group: 'shooting', min: 0, softMax: 20 },
  { key: 'reb', label: 'Rebounds', shortLabel: 'REB', group: 'playmaking', min: 0, softMax: 20 },
  { key: 'ast', label: 'Assists', shortLabel: 'AST', group: 'playmaking', min: 0, softMax: 15 },
  { key: 'stocks', label: 'Steals + Blocks', shortLabel: 'STK', group: 'defense', min: 0, softMax: 10 },
  { key: 'tov', label: 'Turnovers', shortLabel: 'TOV', group: 'defense', min: 0, softMax: 10 },
  { key: 'pf', label: 'Personal Fouls', shortLabel: 'PF', group: 'defense', min: 0, softMax: 6 },
];

export const STAT_GROUPS = {
  shooting: { label: 'Shooting', color: 'hoop-orange' },
  playmaking: { label: 'Rebounds & Assists', color: 'hoop-blue' },
  defense: { label: 'Defense & Fouls', color: 'hoop-red' },
};

export const DEFAULT_GAME_STATS = {
  fgm: 0, fga: 0, ftm: 0, fta: 0,
  reb: 0, ast: 0, stocks: 0, tov: 0, pf: 0,
};

export const PRESETS = [
  { label: 'Made 2', changes: { fgm: 1, fga: 1 }, color: 'hoop-green' },
  { label: 'Missed', changes: { fga: 1 }, color: 'hoop-red' },
  { label: 'Made FT', changes: { ftm: 1, fta: 1 }, color: 'hoop-cyan' },
  { label: 'Missed FT', changes: { fta: 1 }, color: 'hoop-yellow' },
  { label: 'And-1', changes: { fgm: 1, fga: 1, ftm: 1, fta: 1 }, color: 'hoop-orange' },
];
