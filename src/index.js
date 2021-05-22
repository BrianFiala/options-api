'use strict';
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');

// (async () => {
//   try {
//     fs.unlinkSync('./results/matches.json');
//     fs.unlinkSync('./results/matches.csv');
//   } catch(err) {}
//   fs.writeFileSync('./results/matches.json', JSON.stringify(sortedOwnerVoterInfo));
//   await (new ObjectsToCsv(sortedOwnerVoterInfo)).toDisk('./results/matches.csv');
// })();

console.log('loaded');
