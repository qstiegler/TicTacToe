import { startGame, move, windowResize } from '../../actions';

describe('startGame', () => {

    it('should return an action object with both parameters as names array', () => {
        const playerOne = 'Peter';
        const playerTwo = 'Hans';
        const expectedResult = {
            type: 'START_GAME',
            names: [playerOne, playerTwo]
        };

        expect(startGame(playerOne, playerTwo)).toEqual(expectedResult);
    });

});

describe('move', () => {

    it('should return an action object with given row and col index', () => {
        const rowIndex = 0;
        const colIndex = 2;
        const expectedResult = {
            type: 'MOVE',
            rowIndex,
            colIndex
        };

        expect(move(rowIndex, colIndex)).toEqual(expectedResult);
    });

});

describe('windowResize', () => {

    it('should return an action object with given board height', () => {
        const boardHeight = 398;
        const expectedResult = {
            type: 'WINDOW_RESIZE',
            boardHeight
        };

        expect(windowResize(boardHeight)).toEqual(expectedResult);
    });

});

