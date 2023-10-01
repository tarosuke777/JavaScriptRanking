import * as fs from "node:fs";

const entlyfilePath = '/home/t-ohsuga/JavaScriptRanking/testdata/ranking/in/game_ently_log.csv';
const scoreFilePath = '/home/t-ohsuga/JavaScriptRanking/testdata/ranking/in/game_score_log.csv';

const entlyFile = fs.readFileSync(entlyfilePath, { encoding: "utf8" });

const entryIdToName = entlyFile.split("\n")
  .map((line) => line.split(','))
  .reduce((map, data)  => map.set(data[0], data[1]), new Map());

const scoreFile = fs.readFileSync(scoreFilePath, { encoding: "utf8" });
const playerIdToScore = scoreFile.split("\n")
  .map((line) => line.split(','))
  .reduce((map, data)  => {
      const playerId = data[1];
      const score = data[2];
      const maxScore = map.get(playerId);
      if (maxScore == null || maxScore < score){
        return map.set(playerId, score);
      }
      return map;
    }, new Map());

console.log(entryIdToName);
console.log(playerIdToScore);

