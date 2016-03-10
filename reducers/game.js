import {
    move,
    createBoard,
    checkForWinner,
    emptyCellsLeft,
    togglePlayer
} from '../helpers';

const intitialState = {
    board: createBoard(3),
    player: 1,
    winner: 0,
    frozen: true,
    names: []
};

const game = (state = intitialState, action) => {
    switch (action.type) {
        case 'START_GAME': {
            console.log('in START reducer');
            return Object.assign({}, state, {
                board: createBoard(3),
                player: 1,
                frozen: false,
                names: action.names
            });
        }
        case 'MOVE': {
            if (state.frozen) {
                return state;
            }

            const board = move(state.board, action.rowIndex, action.colIndex, state.player);
            const winner = checkForWinner(state.board);
            const cellsLeft = emptyCellsLeft(state.board);

            return Object.assign({}, state, {
                board,
                player: togglePlayer(state.player),
                winner,
                frozen: (winner !== 0 || !cellsLeft)
            });
        }
        default: {
            return state;
        }
    }
};

export default game;
