import Logger from './logger';
import { loadGame, saveGame } from './database';

class GameSnapshot {
  hashedMessages = {};
  year = '';
  phase = '';
  readyStates = {
    status: {
      defeated: [],
      ready: [],
      completed: [],
      notreceived: [],
      none: [],
    },
    countries: {},
    readyCount: 0
  };
  initialRun = true
}

const getPreviousState = async (cid) => {
  Logger.info(`Getting previous state for user ${cid}`);
  const game = await loadGame(cid);
  if (game == null) {
    await saveGame(cid, new GameSnapshot());
    return new GameSnapshot();
  }
  return game;
}

export { GameSnapshot, getPreviousState };
