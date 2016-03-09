/**
 * Game board module for Tic Tac Toe game
 */
class Board {
    /**
     * constructor
     */
    constructor() {
        this.board = [];
        this.boardWidth = 3;

        for (let i = 0; i < this.boardWidth; i++) {
            const row = [];
            for (let j = 0; j < this.boardWidth; j++) {
                row.push(0);
            }
            this.board.push(row);
        }
    }

    /**
     * Is returning the value of the position in the grid array
     * @param {number} x coordinate of the board grid
     * @param {number} y coordinate of the board grid
     * @return {number} value of the position
     */
    getCell(x, y) {
        return this.board[x][y];
    }

    /**
     * Checks if all elements of an array are the same value
     * @param {array} arr array to test
     * @return {boolean}
     */
    allEqual(arr) {
        return !arr.some((value, index, array) => (value !== array[0]));
    }

    /**
     * Is updating the value of the position in grid array by the player
     * @param {number} x coordinate of the board grid
     * @param {number} y coordinate of the board grid
     * @param {number} player current player
     */
    move(x, y, player) {
        this.board[x][y] = player;
    }

    /**
     * Is checking all rows for a winner by going through all rows
     * and check if all values in the row are equal an not `0`.
     * @return {number} `0` or the winners number
     */
    checkRowsForWinner() {
        let winner = 0;

        for (let rowIndex = 0; rowIndex < this.boardWidth; rowIndex++) {
            const row = this.board[rowIndex];

            if (this.allEqual(row) && row[0] > 0) {
                winner = row[0];
            }
        }

        return winner;
    }

    /**
     * Is checking all columns for a winner by building all columns
     * and check if all values in the column are equal an not `0`.
     * @return {number} `0` or the winners number
     */
    checkColsForWinner() {
        let winner = 0;

        for (let rowIndex = 0; rowIndex < this.boardWidth; rowIndex++) {
            const column = [];

            for (let columnIndex = 0; columnIndex < this.boardWidth; columnIndex++) {
                column.push(this.getCell(columnIndex, rowIndex));
            }

            if (this.allEqual(column) && column[0] > 0) {
                winner = column[0];
            }
        }

        return winner;
    }

    /**
     * Is checking all diagonals for a winner by building the left and the right one
     * and check if all values in the diagonal are equal an not `0`.
     * @return {number} `0` or the winners number
     */
    checkDiagonalsForWinner() {
        let winner = 0;
        const diagonals = { left: [], right: [] };

        for (let i = 0; i < this.boardWidth; i++) {
            diagonals.left.push(this.getCell(i, i));
            diagonals.right.push(this.getCell(this.boardWidth - i - 1, i));
        }

        for (const key in diagonals) {
            if ({}.hasOwnProperty.call(diagonals, key)) {
                const diagonal = diagonals[key];

                if (this.allEqual(diagonal) && diagonal[0] > 0) {
                    winner = diagonal[0];
                }
            }
        }

        return winner;
    }

    /**
     * Is checking if there is any empty col left.
     * If all cols are set it returns `3`
     * @return {number} `0` or the `3`
     */
    checkForFullBoard() {
        let winner = 0;
        const tie = !this.board
            .reduce((a, b) => a.concat(b))
            .some((cell) => cell === 0);

        if (tie) winner = 3;

        return winner;
    }

    /**
     * Is going step by step through all tests to find the winner.
     * @return {number} can be `0`, `1`, `2` or `3`
     */
    checkForWinner() {
        let winner = 0;

        // Check rows.
        winner = this.checkRowsForWinner();
        if (winner !== 0) return winner;

        // Check columns.
        winner = this.checkColsForWinner();
        if (winner !== 0) return winner;

        // Check diagonals.
        winner = this.checkDiagonalsForWinner();
        if (winner !== 0) return winner;

        // Check tie.
        winner = this.checkForFullBoard();
        return winner;
    }
}

export default Board;
