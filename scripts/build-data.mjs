import { writeFileSync, mkdirSync } from 'fs';

const MLB_BASE = 'https://statsapi.mlb.com/api/v1';
const NHL_BASE = 'https://api-web.nhle.com/v1';

function fmtDate(d) {
  return d.toISOString().slice(0, 10);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erreur ${res.status} sur ${url}`);
  return res.json();
}

async function buildBaseball() {
  const today = new Date();
  const games = [];
  for (let offset = -3; offset <= 7; offset++) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    const dateStr = fmtDate(d);
    const json = await fetchJson(`${MLB_BASE}/schedule?sportId=1&date=${dateStr}&hydrate=team,linescore,venue`);
    for (const dateBlock of json.dates || []) {
      for (const game of dateBlock.games || []) {
        games.push({
          id: game.gamePk,
          date: game.gameDate,
          status: game.status?.abstractGameState,
          away: game.teams.away.team.name,
          home: game.teams.home.team.name,
          awayScore: game.teams.away.score ?? null,
          homeScore: game.teams.home.score ?? null,
          venue: game.venue?.name ?? null,
        });
      }
    }
  }
  return games;
}

async function buildHockey() {
  const today = new Date();
  const games = [];
  for (let offset = -3; offset <= 7; offset++) {
    const d = new Date(today);
    d.setDate(d.getDate() + offset);
    const dateStr = fmtDate(d);
    const json = await fetchJson(`${NHL_BASE}/score/${dateStr}`);
    for (const game of json.games || []) {
      games.push({
        id: game.id,
        date: game.startTimeUTC ?? game.gameDate,
        status: game.gameState,
        away: game.awayTeam?.name?.default ?? game.awayTeam?.abbrev,
        home: game.homeTeam?.name?.default ?? game.homeTeam?.abbrev,
        awayScore: game.awayTeam?.score ?? null,
        homeScore: game.homeTeam?.score ?? null,
        venue: game.venue?.default ?? null,
      });
    }
  }
  return games;
}

async function main() {
  mkdirSync('data', { recursive: true });
  const [baseball, hockey] = await Promise.all([buildBaseball(), buildHockey()]);
  writeFileSync('data/baseball.json', JSON.stringify({ updatedAt: new Date().toISOString(), games: baseball }, null, 2));
  writeFileSync('data/hockey.json', JSON.stringify({ updatedAt: new Date().toISOString(), games: hockey }, null, 2));
  console.log(`Baseball: ${baseball.length} matchs, Hockey: ${hockey.length} matchs`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
