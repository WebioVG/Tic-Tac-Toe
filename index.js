// Get DOM elements
const cells = document.querySelectorAll('.cell')
const gameBoard = document.querySelector('.game-board')
const endingContainer = document.querySelector('.ending-container')
const winningMessageDOM = document.querySelector('.winning-message')

// Variables & constants
let gameIsRunning = true
let playerTurn = 'cross'
let winningMessage = ''
let gameBoardContent = ['', '', '', '', '', '', '', '', '',]
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Add an event listener on each cell
cells.forEach((cell) => {
    cell.addEventListener('click', (e) => handleClick(e), { once: true })
})

function handleClick(e) {
    if (! gameIsRunning) return

    // Add a cross or a circle on the cell
    if (playerTurn === 'cross') {
        e.target.classList.add('cross')
        gameBoardContent[+ e.target.getAttribute('data-cell')] = 'cross'
    }
    else if (playerTurn === 'circle') {
        e.target.classList.add('circle')
        gameBoardContent[+ e.target.getAttribute('data-cell')] = 'circle'
    }

    // Remove event listener
    e.target.removeEventListener('click', handleClick)
    
    // Check for victory
    if(checkForVictory()) handleVictory()

    // Switch player turn if noone has won
    if (gameIsRunning) handleTurnChange(playerTurn)
}

/**
 * Sets the cross or the circle class to the game board given the player turn ('cross' or 'circle')
 * & switches the playerTurn variable.
 * @param turn 
 */
function handleTurnChange(turn) {
    if (turn === 'cross') setTurnToCircle()
    else if (turn === 'circle') setTurnToCross()
}

/**
 * Sets the game board class to 'circle'
 * & sets the playerTurn variable to 'circle.
 */
function setTurnToCircle() {
    gameBoard.classList.remove('cross')
    gameBoard.classList.add('circle')

    playerTurn = 'circle'
}

/**
 * Sets the game board class to 'cross'
 * & sets the playerTurn variable to 'cross.
 */
function setTurnToCross() {
    gameBoard.classList.remove('circle')
    gameBoard.classList.add('cross')

    playerTurn = 'cross'
}

/**
 * Returns true if there is a winner or false otherwise.
 */
function checkForVictory() {
    let victory = false

    winningCombinations.forEach((winningCombination) => {
        if (
            gameBoardContent[winningCombination[0]] === playerTurn &&
            gameBoardContent[winningCombination[1]] === playerTurn &&
            gameBoardContent[winningCombination[2]] === playerTurn
        ) {
            victory = true
        }
    })

    return victory
}

/**
 * Determines the winner and stops the game.
 */
function handleVictory() {
    // Set the winning message
    if (playerTurn === 'cross') winningMessage = 'The crosses won!'
    else if (playerTurn === 'circle') winningMessage = 'The circles won!'
    winningMessageDOM.textContent = winningMessage

    // Remove hover effects
    gameBoard.classList.remove('cross', 'circle')

    // Set the cursor to not-allowed on every cell
    cells.forEach(cell => cell.style.cursor = 'not-allowed')

    // Show the ending container
    endingContainer.classList.add('show')

    // Remove all event listeners
    gameBoard.replaceWith(gameBoard.cloneNode(true))

    gameIsRunning = false
}