export function calculatePoints(fgm, ftm) {
  return (fgm * 2) + ftm;
}

export function calculatePercentage(made, attempted) {
  if (!attempted || attempted === 0) return 0;
  return (made / attempted) * 100;
}

export function calculateDerivedStats(game) {
  return {
    pts: calculatePoints(game.fgm, game.ftm),
    fgPercent: calculatePercentage(game.fgm, game.fga),
    ftPercent: calculatePercentage(game.ftm, game.fta),
  };
}

export function calculateSeasonAverages(games) {
  if (!games || games.length === 0) {
    return {
      fgm: 0, fga: 0, ftm: 0, fta: 0,
      reb: 0, ast: 0, stocks: 0, tov: 0, pf: 0,
      pts: 0, fgPercent: 0, ftPercent: 0,
      gamesPlayed: 0,
    };
  }

  const totals = games.reduce((acc, game) => {
    acc.fgm += game.fgm || 0;
    acc.fga += game.fga || 0;
    acc.ftm += game.ftm || 0;
    acc.fta += game.fta || 0;
    acc.reb += game.reb || 0;
    acc.ast += game.ast || 0;
    acc.stocks += game.stocks || 0;
    acc.tov += game.tov || 0;
    acc.pf += game.pf || 0;
    acc.pts += game.pts || calculatePoints(game.fgm, game.ftm);
    return acc;
  }, { fgm: 0, fga: 0, ftm: 0, fta: 0, reb: 0, ast: 0, stocks: 0, tov: 0, pf: 0, pts: 0 });

  const n = games.length;
  return {
    fgm: totals.fgm / n,
    fga: totals.fga / n,
    ftm: totals.ftm / n,
    fta: totals.fta / n,
    reb: totals.reb / n,
    ast: totals.ast / n,
    stocks: totals.stocks / n,
    tov: totals.tov / n,
    pf: totals.pf / n,
    pts: totals.pts / n,
    fgPercent: calculatePercentage(totals.fgm, totals.fga),
    ftPercent: calculatePercentage(totals.ftm, totals.fta),
    gamesPlayed: n,
  };
}

export function calculateRecentAverages(games, count = 5) {
  const recent = games.slice(0, count);
  return calculateSeasonAverages(recent);
}

export function calculateStreaks(games, statKey, threshold) {
  const sorted = [...games].sort((a, b) => new Date(a.date) - new Date(b.date));
  let currentStreak = 0;
  let bestStreak = 0;
  let isCurrentActive = false;

  for (let i = 0; i < sorted.length; i++) {
    const value = statKey === 'pts'
      ? (sorted[i].pts || calculatePoints(sorted[i].fgm, sorted[i].ftm))
      : sorted[i][statKey];

    if (value >= threshold) {
      currentStreak++;
      bestStreak = Math.max(bestStreak, currentStreak);
      if (i === sorted.length - 1) isCurrentActive = true;
    } else {
      currentStreak = 0;
    }
  }

  return {
    current: isCurrentActive ? currentStreak : 0,
    best: bestStreak,
  };
}
