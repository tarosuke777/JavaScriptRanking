
import * as fs from "node:fs";

var RANKING = function () {return;};

RANKING.prototype = {
  getEntryIdToName: function (entlyFile){
    return entlyFile.split("\n")
    .map((line) => line.split(','))
    .reduce((map, data, index)  => { 
  
      if (index === 0 || !data[0]){
        return map;
      }
  
      if(data[0]){
        return map.set(data[0], data[1]);;
      }
  
      return map
    }, new Map())
  },
  getPlayerIdToScore: function(scoreFile){
    return scoreFile.split("\n")
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
  },

  getRankingData: function(entryIdToName, playerIdToScoreSorted){
    let prevScore = 0;
    let rank = 0;
    let outRank = 0;
    let rankingData = [];
  
    for(const [playerId, score] of  playerIdToScoreSorted){
      if (entryIdToName.get(playerId) == null){ continue; }
  
      rank += 1;
      if (score != prevScore){ outRank = rank; }
  
      if (outRank > 10){break;}
  
      rankingData.push(`${outRank},${playerId},${entryIdToName.get(playerId)},${score}`);
    }
    
    return rankingData;
  },

  getPlayerIdToScoreSorted: function(playerIdToScore){
    return new Map([...playerIdToScore].sort((a, b) => b[1] - a[1]));
  }

}

const entlyfilePath = process.argv[2];
const scoreFilePath = process.argv[3];

const entlyFile = fs.readFileSync(entlyfilePath, { encoding: "utf8" });
const scoreFile = fs.readFileSync(scoreFilePath, { encoding: "utf8" });

const ranking = new RANKING();
const entryIdToName = ranking.getEntryIdToName(entlyFile);
const playerIdToScore = ranking.getPlayerIdToScore(scoreFile);

const playerIdToScoreSorted = ranking.getPlayerIdToScoreSorted(playerIdToScore);

const rankingData = ranking.getRankingData(entryIdToName, playerIdToScoreSorted)

console.log(rankingData);