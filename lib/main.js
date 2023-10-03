import * as fs from "node:fs";

const entlyfilePath = '/home/t-ohsuga/JavaScriptRanking/testdata/ranking/in/game_ently_log.csv';
const scoreFilePath = '/home/t-ohsuga/JavaScriptRanking/testdata/ranking/in/game_score_log.csv';

const entlyFile = fs.readFileSync(entlyfilePath, { encoding: "utf8" });

const entryIdToName = entlyFile.split("\n")
  .map((line) => line.split(','))
  .reduce((map, data, index)  => { 

    if (index === 0 || !data[0]){
      return map;
    }

    if(data[0]){
      return map.set(data[0], data[1]);;
    }

    return map
  }, new Map());

const scoreFile = fs.readFileSync(scoreFilePath, { encoding: "utf8" });
const playerIdToScore = scoreFile.split("\n")
  .map((line) => line.split(','))
  .reduce((map, data, index)  => {
      const playerId = data[1];
      const score = parseInt(data[2]);
      const maxScore = map.get(playerId);

      if (index === 0 || !playerId){
        return map;
      }

      if (maxScore == null || maxScore < score){
        return map.set(playerId, score);
      }

      return map;
    }, new Map());

const playerIdToScoreSorted = new Map([...playerIdToScore].sort((a, b) => b[1] - a[1]));

console.log(entryIdToName);
console.log(playerIdToScore);
console.log(playerIdToScoreSorted);
