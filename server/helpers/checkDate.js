'use strict'

// const moment = require('moment-timezone')

function checkDate(input){
    
    let today = new Date()
    let future = new Date(input)
    if(future>=today){
        let year = Number(input.substring(0,4))
        let month = Number(input.substring(5,7))
        let day = Number(input.substring(8,10))
        
        // let's limit the maximum usage of this application up to 2025
        if(year<=2025){
            return input
        }else{
            return `2025-${month}-${day}`
        }
    }else{
        return today
    }
}

// testing
// console.log(checkDate('2019-10-10'))
// console.log(checkDate('2018-09-10'))
// console.log(checkDate('2019-10-05'))

// negative testing
// console.log(checkDate('hahaahah')) // words
// console.log(checkDate('10000000')) // string of numbers
// console.log(checkDate(10000000)) // pure numbers
// console.log(checkDate('1009-900-34234')) // false format
// console.log(checkDate('2000-13-12')) // wrong month
// console.log(checkDate('4000-10-12')) // far in the future
// console.log(checkDate('2000-12-40')) // wrong day
module.exports = checkDate