const rls = require("readline-sync");

const ARRAY_HEADER = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
let missleShots = 30;
const shipMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 1, 1, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
]
const battleMap = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
]


let numHits = 0;
let currentCoords;
let col = [];
let row = [];
let validCol = "";
let hit = "";

console.log("Let's play Battleship!");
console.log("You have " + missleShots + " missiles to fire to sink all 5 ships.");
console.table(battleMap, ARRAY_HEADER);
while (missleShots > 0) {
    //ask for their coordinates
    do {
        currentCoords = rls.question("Choose your target (Ex. A1): ");
        if (currentCoords != "" && currentCoords.length >= 2) {
            col = currentCoords.charAt(0).toUpperCase();
            row = currentCoords.substr(1);
        }
    }
    while (
        !checkIfColValid(col) ||
        !checkIfRowValid(row));
    //check if they hit a ship
    if (checkForHit()) {
        numHits++;
    }
    //update the record of what's been hit
    //tell them hom many missles they have left
    missleShots--;
    console.log("You have ", missleShots, " missles left.");
    //display the map
    console.table(battleMap, ARRAY_HEADER);
    //update the missle count
    if (hit == 16) {
        console.log("YOU SANK MY ENTIRE FLEET!");
        console.log("You had " + hit + " of 17 hits, which sank all the ships.");
        console.log("You won, congratulations!");
        break;
    }
}
if (hit < 16) {
    console.log("GAME OVER.");
    console.log("You had " + hit + " of 17 hits, but didn't sink all the ships.");
    console.log("Better luck next time.");
}













function checkIfColValid(col) {

    if(col == undefined)
        return(false);
    validCol = ARRAY_HEADER.indexOf(col);
    if (validCol >= 0 && validCol <= 9) {
        return true;
    } else {
        return false;
    }
}
function checkIfRowValid(row) {
    if(row == undefined)
        return(false);
    let validRow = row;
    if (validRow >= 0 && validRow <= 9) {
        return true;
    } else {
        return false;
    }
}


function checkForHit() {
    if (shipMap[row][validCol] == 1) {
        hit++;
        console.log("HIT!!!!!");
        console.log(battleMap[row][col] = "X");
    }
    else {
        console.log("Miss")
        console.log(battleMap[row][col] = "O");
    }
}
