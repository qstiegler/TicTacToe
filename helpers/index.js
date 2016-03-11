import moment from 'moment';

moment.locale('de');

/**
 * Checks if all elements of an array are the same value
 * @param {array} arr array to test
 * @return {boolean}
 */
const allEqual = (arr) => {
    return !arr.some((value, index, array) => {
        return (value !== array[0]);
    });
};

/**
 * Is checking all rows for a winner by going through all rows
 * and check if all values in the row are equal and not `0`.
 * @param {array} board the grid of the game
 * @return {number} `0` or the winners number
 */
const checkRowsForWinner = (board) => {
    let winner = 0;

    for (const row of board) {
        if (allEqual(row) && row[0] > 0) {
            winner = row[0];
        }
    }

    return winner;
};

/**
 * Is checking all columns for a winner by building all columns
 * and check if all values in the column are equal and not `0`.
 * @param {array} board the grid of the game
 * @return {number} `0` or the winners number
 */
const checkColsForWinner = (board) => {
    let winner = 0;

    for (const rowIndex in board) {
        if ({}.hasOwnProperty.call(board, rowIndex)) {
            const column = [];

            for (const columnIndex in board) {
                if ({}.hasOwnProperty.call(board, rowIndex)) {
                    column.push(board[columnIndex][rowIndex]);
                }
            }

            if (allEqual(column) && column[0] > 0) {
                winner = column[0];
            }
        }
    }

    return winner;
};

/**
 * Is checking all diagonals for a winner by building the left and the right one
 * and check if all values in the diagonal are equal an not `0`.
 * @param {array} board the grid of the game
 * @return {number} `0` or the winners number
 */
const checkDiagonalsForWinner = (board) => {
    const diagonals = { left: [], right: [] };
    let winner = 0;

    for (const i in board) {
        if ({}.hasOwnProperty.call(board, i)) {
            diagonals.left.push(board[i][i]);
            diagonals.right.push(board[board.length - i - 1][i]);
        }
    }

    for (const key in diagonals) {
        if ({}.hasOwnProperty.call(diagonals, key)) {
            const diagonal = diagonals[key];

            if (allEqual(diagonal) && diagonal[0] > 0) {
                winner = diagonal[0];
            }
        }
    }

    return winner;
};

/**
 * Creates a board grid depending on the given param
 * @param {number} [boardWidth = 3] length of rows and cols for the grid
 * @return {array} board the grid of the game
 */
export const createBoard = (boardWidth = 3) => {
    const board = [];

    for (let i = 0; i < boardWidth; i++) {
        const row = [];
        for (let j = 0; j < boardWidth; j++) {
            row.push(0);
        }
        board.push(row);
    }

    return board;
};

/**
 * Is updating the value of the position in grid array by the player
 * @param {array} board the grid of the game
 * @param {number} x coordinate of the board grid
 * @param {number} y coordinate of the board grid
 * @param {number} player current player
 * @return {array} updated board grid
 */
export const move = (board, x, y, player) => {
    return board.map((row, rowIndex) => {
        if (parseInt(x, 10) === rowIndex) {
            return row.map((col, colIndex) => {
                if (parseInt(y, 10) === colIndex) {
                    return player;
                }

                return col;
            });
        }

        return row;
    });
};

/**
 * Is toggling the players number
 * @param {number} previousPlayer
 * @return {number} the other player
 */
export const togglePlayer = (previousPlayer) => {
    return (previousPlayer === 1) ? 2 : 1;
};

/**
 * Is going step by step through all tests to find the winner
 * The tests are:
 * * checkRowsForWinner
 * * checkColsForWinner
 * * checkDiagonalsForWinner
 * @param {array} board the grid of the game
 * @return {number} can be `0` or the players id
 */
export const checkForWinner = (board) => {
    let winner = 0;

    if (Array.isArray(board)) {
        // Check rows.
        winner = checkRowsForWinner(board);
        if (winner !== 0) return winner;

        // Check columns.
        winner = checkColsForWinner(board);
        if (winner !== 0) return winner;

        // Check diagonals.
        winner = checkDiagonalsForWinner(board);
    }

    return winner;
};

/**
 * Is checking if there is any empty col left.
 * @return {boolean} cells empty or not
 */
export const emptyCellsLeft = (board) => {
    return board.reduce((a, b) => {
        return a.concat(b);
    }).some((cell) => {
        return cell === 0;
    });
};

/**
 * Is adding a new dataset to the finishedGames array
 * but just if the winner is not `0`
 * @param {array} finishedGames all in the past finished games
 * @param {array} names array with the payers names
 * @param {boolean} winner winners id
 * @param {string} startedAt formated date string
 * @return {array} the updated finishedGames array
 */
export const updateLeaderboard = (finishedGames, names, winner, startedAt) => {
    if (winner === 0) {
        return finishedGames;
    }

    return [
        ...finishedGames,
        {
            winner: names[winner === 1 ? 0 : 1],
            looser: names[winner === 1 ? 1 : 0],
            startedAt,
            finishedAt: moment().format('Do MMMM YYYY, h:mm:ss')
        }
    ];
};
