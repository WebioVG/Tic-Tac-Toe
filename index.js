// Get DOM elements
let cells = document.querySelectorAll('.cell')
let gameBoard = document.querySelector('.game-board')
const endingContainer = document.querySelector('.ending-container')
const winningMessageDOM = document.querySelector('.winning-message')
const restartButton = document.querySelector('.restart-button')

// Variables & constants
let gameIsRunning = true
let playerTurn = 'cross'
let winningMessage = ''
let gameBoardContent = ['', '', '', '', '', '', '', '', ''] // stores the current state of the game board
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
    if (checkForVictory()) handleVictory()

    // Check for draw
    if(checkForDraw()) handleDraw()

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

/**
 * Returns true if all cells are filled.
 */
function checkForDraw() {
    return gameBoardContent.includes('') ? false : true
}

/**
 * Stops the game
 */
function handleDraw() {
    // Set the winning message
    winningMessageDOM.textContent = 'Draw!'

    // Show the ending container
    endingContainer.classList.add('show')

    // Remove all event listeners
    gameBoard.replaceWith(gameBoard.cloneNode(true))

    gameIsRunning = false
}

// Add an event listener for the restart button
restartButton.addEventListener('click', () => resetGame())

function resetGame() {
    // Get the new game board and cells
    cells = document.querySelectorAll('.cell')
    gameBoard = document.querySelector('.game-board')

    // Reset variables
    gameIsRunning = true
    playerTurn = 'cross'
    winningMessage = ''
    gameBoardContent = ['', '', '', '', '', '', '', '', '']

    // Add event listeners & reset classes/styles
    cells.forEach((cell) => {
        cell.classList.remove('cross', 'circle')
        cell.style.cursor = ''
        cell.addEventListener('click', (e) => handleClick(e), { once: true })
    })
    gameBoard.classList.remove('circle', 'cross')
    gameBoard.classList.add('cross')
    endingContainer.classList.remove('show')
}