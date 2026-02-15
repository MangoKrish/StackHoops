export function exportGames(games) {
  const data = JSON.stringify(games, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `hoopstats-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function importGames(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const parsed = JSON.parse(e.target.result);
        if (!Array.isArray(parsed)) {
          reject(new Error('Invalid format: expected an array of games'));
          return;
        }

        const requiredFields = ['id', 'date', 'fgm', 'fga'];
        for (const game of parsed) {
          for (const field of requiredFields) {
            if (game[field] === undefined) {
              reject(new Error(`Invalid game data: missing "${field}" field`));
              return;
            }
          }
        }

        resolve(parsed);
      } catch (err) {
        reject(new Error('Failed to parse JSON file'));
      }
    };
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.readAsText(file);
  });
}
