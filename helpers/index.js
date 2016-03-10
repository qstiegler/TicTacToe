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
 * and check if all values in the row are equal an not `0`.
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
 * and check if all values in the column are equal an not `0`.
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
 * Game board module for Tic Tac Toe game
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
 * @param {number} x coordinate of the board grid
 * @param {number} y coordinate of the board grid
 * @param {number} player current player
 */
export const move = (board, rowIndex, colIndex, player) => {
    return board.map((col, index) => {
        const newCol = col;

        if (parseInt(rowIndex, 10) === index) {
            newCol[colIndex] = player;
        }

        return newCol;
    });
};


export const togglePlayer = (previousPlayer) => {
    return (previousPlayer === 1) ? 2 : 1;
};

/**
 * Is going step by step through all tests to find the winner.
 * @return {number} can be `0`, `1`, `2` or `3`
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
 * If all cols are set it returns `3`
 * @return {number} `0` or the `3`
 */
export const emptyCellsLeft = (board) => {
    return board.reduce((a, b) => {
        return a.concat(b);
    }).some((cell) => {
        return cell === 0;
    });
};
