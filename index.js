const cells = document.querySelectorAll('.cell')
const gameBoard = document.querySelector('.game-board')

let gameIsRunning = true
let playerTurn = 'cross'

cells.forEach((cell) => {
    cell.addEventListener('click', (e) => handleClick(e), { once: true })
})

function handleClick(e) {
    // Add the cross or circle
    if (playerTurn === 'cross') {
        e.target.classList.add('cross')
    } else if (playerTurn === 'circle') {
        e.target.classList.add('circle')
    }

    // Remove event listener
    e.target.removeEventListener('click', handleClick)
    
    // Switch player turn
    if (playerTurn === 'cross') {
        playerTurn = 'circle'
        gameBoard.classList.remove('cross')
        gameBoard.classList.add('circle')
    } else if (playerTurn === 'circle') {
        playerTurn = 'cross'
        gameBoard.classList.remove('circle')
        gameBoard.classList.add('cross')
    }
}