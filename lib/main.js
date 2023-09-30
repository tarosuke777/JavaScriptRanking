import * as fs from "node:fs";

const entlyfilePath = '/home/t-ohsuga/JavaScriptRanking/testdata/ranking/in/game_ently_log.csv';
const scoreFilePath = '/home/t-ohsuga/JavaScriptRanking/testdata/ranking/in/game_score_log.csv';

const entlyFile = fs.readFileSync(entlyfilePath, { encoding: "utf8" });

const entryIdToName = new Map();
entlyFile.split("\n").forEach((line)  => {
  const data = line.split(',');
  entryIdToName.set(data[0], data[1] );
});

console.log(entryIdToName);

const scoreFile = fs.readFileSync(scoreFilePath, { encoding: "utf8" });
const entryIdToScore = new Map();
scoreFile.split("\n").forEach((line)  => {
  const data = line.split(',');
  entryIdToScore.set(data[1], data[2] );
});

console.log(entryIdToScore);

