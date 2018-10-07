'use strict'

function convertToArrayOfWOrds(input){
    let wordsArray = []
    for(let i = 0; i<input.length;i++){
        let tempArray = input[i].split(' ')
        for(let j = 0;j<tempArray.length;j++){
            wordsArray.push(tempArray[j])
        }
    }
    return wordsArray
}

// testing 
let array = [
    "EDIT HALLO 7th",
    "Let's try again yes 3rd time",
    "well i don't think so",
    "I'm fine hey",
    "Let me share you something",
    "Cooperate with Green Goblin' It;'s a wrap",
    "Third Todo"
]

console.log(convertToArrayOfWOrds(array))