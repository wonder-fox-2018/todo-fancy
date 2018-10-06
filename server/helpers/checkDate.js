'use strict'

const moment = require('moment-timezone')

function checkDate(input){

    let today = new Date()
    let future = new Date(input)
    if(future>=today){
        return input
    }else{
        return today
    }
}

// // testing
// console.log(checkDate('2019-10-10'))
// console.log(checkDate('2018-09-10'))
// console.log(checkDate('2019-10-05'))

module.exports = checkDate