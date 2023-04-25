/*
We store our game status element here to allow us to more easily 
use it later on 
*/
const statusDisplay = document.querySelector('.game--status');
/*
Here we declare some variables that we will use to track the 
game state throught the game. 
*/
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
/*We will use gameActive to pause the game in case of an end scenario8*/
let gameActive = true;
/*we will store current player here */
let currentPlayer = "x";
/*
We will store our current game state here, the form of empty strings in an array
 will allow us to easily track played cells and validate the game state later on
*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*
here we have declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with 
current data every time we need it.
 */
const winningMessage = ()=>`player ${currentPlayer} has won!`;
const drawMessage = () =>`Game ended in a draw!`;
const currentPlayerTurn = ()=>`its ${currentPlayer} turn`;
/*
We set the inital message to let the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();

function handleCellPlayed(clickedCell,clickedCellIndex) {
gameState[clickedCellIndex] = currentPlayer;
clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer ==="x"? "o":"x";
    statusDisplay.innerHTML= currentPlayerTurn();
}
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];

if (a==='' || b === '' || c === '') {
            continue;
        }

if (a===b && b === c) {
    roundWon = true;
    break
}
    }
if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
}
    let roundDraw = !gameState.includes("");
 if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
 }
 handlePlayerChange();
}
function handleCellClick(clickedCellEvent) {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(
        clickedCell.getAttribute('data-cell-index')
      );
      if(gameState[clickedCellIndex] !== "" || !gameActive){
        return;
      }
      handleCellPlayed(clickedCell,clickedCellIndex);
      handleResultValidation();

}

function handleRestartGame() {
    gameActive = true;
    currentPlayer = "x";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = "");
}
/*
And finally we add our event listeners to the actual game cells, as well as our 
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click',handleCellClick));
document.querySelector('.game--restart').addEventListener('click',handleRestartGame);