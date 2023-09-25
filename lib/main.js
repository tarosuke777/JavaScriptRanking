import * as fs from "node:fs/promises";

const filePath = '/home/t-ohsuga/JavaScriptRanking/testdata/ranking/in/game_score_log.csv';

fs.readFile(filePath, 'utf8', function(err, data) {
  console.log(data);
})

// fs.readFile(filePath).then(file => {
//   console.log(file);
// }).catch(err => {
//   console.error(err);
// });