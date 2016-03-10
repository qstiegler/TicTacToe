import {
    createBoard,
    move,
    togglePlayer,
    checkForWinner,
    emptyCellsLeft,
    updateLeaderboard
} from '../helpers';

const intitialState = {
    board: createBoard(3),
    boardHeight: 0,
    player: 1,
    winner: 0,
    frozen: true,
    names: [],
    finishedGames: []
};

let gameStartedAt;

/**
 * This is the reducer for the TicTacToe game to handle changes
 * on the state. Three action types are defined:
 * * `START_GAME` starts or restarts the game and sets the state
 *   to the start position but without freezing the game.
 * * `MOVE` will be triggered when the players turn is over.
 *   It will update the board, checks if there is a winner
 * * and updates the finishedGames array
 * * `WINDOW_RESIZE` will be called when then window size has changed.
 * * It then updates the height of the board to the width of the board.
 */
const reducers = (state = intitialState, action) => {
    switch (action.type) {
        case 'START_GAME': {
            gameStartedAt = new Date();

            return Object.assign({}, state, {
                board: createBoard(3),
                player: 1,
                winner: 0,
                frozen: false,
                names: action.names
            });
        }
        case 'MOVE': {
            if (state.frozen) {
                return state;
            }

            const board = move(state.board, action.rowIndex, action.colIndex, state.player);
            const cellsLeft = emptyCellsLeft(board);
            const winner = checkForWinner(board);

            return Object.assign({}, state, {
                board,
                player: togglePlayer(state.player),
                winner,
                frozen: (winner !== 0 || !cellsLeft),
                finishedGames: updateLeaderboard(
                    state.finishedGames,
                    state.names,
                    winner,
                    gameStartedAt
                )
            });
        }
        case 'WINDOW_RESIZE': {
            if (typeof action.boardHeight === 'number') {
                return Object.assign({}, state, {
                    boardHeight: action.boardHeight
                });
            }

            return state;
        }
        default: {
            return state;
        }
    }
};

export default reducers;
