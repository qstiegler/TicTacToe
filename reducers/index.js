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
