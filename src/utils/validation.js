import { STAT_FIELDS } from '../constants/stats';

export function validateStatChange(currentStats, field, newValue) {
  const warnings = [];
  const autoAdjustments = {};
  const fieldDef = STAT_FIELDS.find(f => f.key === field);

  if (newValue < 0) {
    return { valid: false, warnings: ['Value cannot be negative'], autoAdjustments };
  }

  if (fieldDef && newValue > fieldDef.softMax) {
    warnings.push(`${fieldDef.shortLabel} of ${newValue} is unusually high`);
  }

  if (field === 'fgm' && newValue > currentStats.fga) {
    autoAdjustments.fga = newValue;
  }
  if (field === 'ftm' && newValue > currentStats.fta) {
    autoAdjustments.fta = newValue;
  }

  if (field === 'fga' && newValue < currentStats.fgm) {
    warnings.push('FGA is less than FGM');
  }
  if (field === 'fta' && newValue < currentStats.ftm) {
    warnings.push('FTA is less than FTM');
  }

  if (field === 'pf') {
    if (newValue === 5) warnings.push('Foul trouble!');
    if (newValue >= 6) warnings.push('Fouled out!');
  }

  return { valid: true, warnings, autoAdjustments };
}

export function validateGame(game) {
  const errors = [];

  if (!game.date) {
    errors.push('Date is required');
  }

  if (game.fgm > game.fga) {
    errors.push('Field goals made cannot exceed attempts');
  }

  if (game.ftm > game.fta) {
    errors.push('Free throws made cannot exceed attempts');
  }

  return { valid: errors.length === 0, errors };
}
