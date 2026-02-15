export function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function formatShortDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString + 'T00:00:00');
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
  });
}

export function formatPercent(value) {
  if (value == null || isNaN(value)) return '0.0%';
  return `${value.toFixed(1)}%`;
}

export function formatStat(value) {
  if (value == null || isNaN(value)) return '0';
  return Number.isInteger(value) ? value.toString() : value.toFixed(1);
}

export function todayString() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}
