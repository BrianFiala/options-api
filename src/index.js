'use strict'
const fs = require('fs')
const ObjectsToCsv = require('objects-to-csv')
const axios = require('axios')
const querystring = require('querystring')

// (async () => {
//   try {
//     fs.unlinkSync('./results/matches.json')
//     fs.unlinkSync('./results/matches.csv')
//   } catch(err) {}
//   fs.writeFileSync('./results/matches.json', JSON.stringify(sortedOwnerVoterInfo))
//   await (new ObjectsToCsv(sortedOwnerVoterInfo)).toDisk('./results/matches.csv')
// })()

const getSymbol = (symbol) => {
    axios.get('https://api.tdameritrade.com/v1/marketdata/chains', querystring.stringify({
        apiKey: '',
        symbol,
        contractType: 'ALL', // CALL, PUT
        strikeCount: '1', // no default
        includeQuotes: 'FALSE', // TRUE
        strategy: 'ANALYTICAL', // ANALYTICAL, COVERED, VERTICAL, CALENDAR, VERTICAL, CALENDAR, STRANGLE, STRADDLE, BUTTERFLY, CONDOR, DIAGONAL, COLLAR, or ROLL
        interval: '1', // no default
        // strike: 
    }))
}


console.log('loaded')
