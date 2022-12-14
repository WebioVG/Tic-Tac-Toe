// Get DOM elements
const cells = document.querySelectorAll('.cell')
const gameBoard = document.querySelector('.game-board')

// Variables
let gameIsRunning = true
let playerTurn = 'cross'

// Add an event listener on each cell
cells.forEach((cell) => {
    cell.addEventListener('click', (e) => handleClick(e), { once: true })
})

function handleClick(e) {
    // Add cross or circle
    if (playerTurn === 'cross') e.target.classList.add('cross')
    else if (playerTurn === 'circle') e.target.classList.add('circle')

    // Remove event listener
    e.target.removeEventListener('click', handleClick)
    
    // Switch player turn
    handleTurnChange(playerTurn)
}

/**
 * Sets the cross or the circle class to the game board given the player turn ('cross' or 'circle')
 * & switches the playerTurn variable
 * @param turn 
 */
function handleTurnChange(turn) {
    if (turn === 'cross') setTurnToCircle()
    else if (turn === 'circle') setTurnToCross()
}

/**
 * Sets the game board class to 'circle'
 * & sets the playerTurn variable to 'circle
 */
function setTurnToCircle() {
    gameBoard.classList.remove('cross')
    gameBoard.classList.add('circle')

    playerTurn = 'circle'
}

/**
 * Sets the game board class to 'cross'
 * & sets the playerTurn variable to 'cross
 */
function setTurnToCross() {
    gameBoard.classList.remove('circle')
    gameBoard.classList.add('cross')

    playerTurn = 'cross'
}