'use strict'
const express = require('express')
const axios = require('axios')

const ameritradeApi = 'https://api.tdameritrade.com/v1/marketdata/chains'
const defaultSymbol = 'QQQ'
const defaultNumDaysToStart = 1
const defaultNumDaysToEnd = 2
const authorization = 'Bearer EFK0yvKea0Rzz247fLGqKL2ivlOpfueW4NGbEMD1NJgEXSeRg3kw4hOQ6gygRfHUXOla1mI2d9oNX26pnPjY8xKO4pMNf8EXnBM7PqMFoLWd2IdoB2q7X9g+97R1kMXn9QF3uJmZEC65Zcr6vLlwAkb/0arArKYM2DDZA4vmF130XfTkZipeGeXsOPFTexnRu4IhgTpoNejwxny6yksuH/9+fFfG5kugSr7vWlwWyFibXHdPPCU01Kky8hwfun7XBN1fDo641u7PHc1LHEMhXSS140jFhvV4s1lTdDGAaBW4oedYFVPT3EKEI32H4DuM/5yhmblhwKnCmij2METiU0331lsUUBdhfELtbessPlogzd1prG7qXE6gJ14dtaNW6vogSpKX4uu4I1nL5cNVq6p+3evdqiyAV7I7Bvxxehw9eNn7Ys2d0IMS36GEanysg2O3TlV+e9Kb4B0HP13RDTuKfK6PGXvl1RoOEIfMF41SpeGv7T09Nc/klSxCUai2ZZKL2GHTjuP4HKRBkNZlrX5/fRXfL/Hh4jE3P100MQuG4LYrgoVi/JHHvltaF+50lPR+5uaFmaUuvUBPdag6K1nRcZLOx0AW3RLP16UL3SFrxpuotc6iyC2HQYL/pfRTrBWUEjpl/cFGUmTU6bbWkRkfHqjRRcax4mKS4+LYRgUpYVXzrLYNgkA1rrsw1vnwTsimXbIyuUuZ4sO8g3I23FGakY8l9fK+0UmDDfeu88o5BtAXYfxkNkEaBWFAiWb70Peb4mEZEiGEpBQzIuMA/8FpUK0Oggo1Y478WUDnlpzDBlwiUt0Y7grPi9pIz00h6mIIOqACSDSZuX7Wvb1HDhd3lwR4JA4+vKkcsQAzw4BoEQsocOUi6fQ30rH6Rpv20MA25N+EWn5J/632i4l2iuSOT5hKRMJF3uOw3EG1FkIlzJPvJdNVe9Btf5XVifW5uCqgivUDEJ9jthcGf9IF32ML477vxfbQZjO23AGyCARYrRoc4pCT6CCsU7vmlq0BfuWmoL7caNnVXs1yWI0z01kDc7TSXlB0CpZDU8o3+M4BH4Z2gokZNj2ODwccvhQwRcBXpJgxqmJ2PhoIeVzWymRwcHP6jg6n212FD3x19z9sWBHDJACbC00B75E'
const apiKey = '870GIFG6GRXSVGJZZBPFYOP2BXGKTMOG',

const cli = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const cliOpts = {
    colors: true,
    depth: 5
}

const standardParams = {
    apiKey,
    includeQuotes: true,
    strikeCount: 4,
}

const optionsApi = express()
    // .get()
    // .post()
    // .listen(8093)


function getDateParts(date) {
    return date.toLocaleString().split(',')[0].split('/')
}

function getFutureDateForNumDaysFromNow(numDaysFromNow) {
    const today = new Date()
    const futureDate = new Date()
    futureDate.setDate(today.getDate() + numDaysFromNow)
    return futureDate
}

function getFormattedDateForNumDaysFromNow(numDaysFromNow) {
    const futureDate = getFutureDateForNumDaysFromNow(numDaysFromNow)
    const dateParts = getDateParts(futureDate)
    return [dateParts[2], dateParts[0], dateParts[1]].join('-')
}

function optionsAlgorithm({ data, config }) {
    if (data.status !== 'SUCCESS') console.dir(config.params, cliOpts)
    else {
        // TODO: algorithm logic goes here. for now we just print data
        console.dir(data, cliOpts)
    }
}

cli.question(`What symbol? [${defaultSymbol}]`, (sym) => {
    cli.question(`Starting how many days from now? [${defaultNumDaysToStart}]`, (numDaysUntilStart) => {
        cli.question(`Ending how many days from now? [${defaultNumDaysToEnd}]`, (numDaysUntilEnd) => {
            const symbol = (sym || 'QQQ').toUpperCase()
            const fromDate = getFormattedDateForNumDaysFromNow(Number(numDaysUntilStart) || defaultNumDaysToStart)
            const toDate = getFormattedDateForNumDaysFromNow(Number(numDaysUntilEnd) || defaultNumDaysToEnd)
            const params = { ...standardParams, symbol, fromDate, toDate }
            const headers = { authorization }

            axios.get(ameritradeApi, { params, headers })
                .then(optionsAlgorithm)
                .catch(console.error)

            cli.close()
        })
    })
})

