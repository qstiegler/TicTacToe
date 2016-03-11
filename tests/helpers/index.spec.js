import {
    createBoard,
    move,
    togglePlayer,
    checkForWinner,
    emptyCellsLeft,
    updateLeaderboard
} from '../../helpers';

import moment from 'moment';

moment.locale('de');


describe('createBoard', () => {

    it('should create a new board depenting on the given size', () => {
        let expectedBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        expect(createBoard(3)).toEqual(expectedBoard);

        expectedBoard = [[0]];
        expect(createBoard(1)).toEqual(expectedBoard);

        expectedBoard = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
        expect(createBoard(4)).toEqual(expectedBoard);
    });

});


describe('move', () => {

    it('should update the board depending on the coordinates and the player number', () => {
        let boardBefore = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        let row = 1;
        let col = 1;
        let player = 2;
        let expectedBoard = [[0, 0, 0], [0, 2, 0], [0, 0, 0]];

        expect(move(boardBefore, row, col, player)).toEqual(expectedBoard);

        boardBefore = [[1, 0, 2], [0, 2, 0], [0, 2, 0]];
        row = 2;
        col = 0;
        player = 1;
        expectedBoard = [[1, 0, 2], [0, 2, 0], [1, 2, 0]];

        expect(move(boardBefore, row, col, player)).toEqual(expectedBoard);
    });

});


describe('checkForWinner', () => {

    it('should return false if there is no winner', () => {
        let board = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
        expect(checkForWinner(board)).toBe(0);

        board = [[1, 1, 0], [1, 2, 0], [2, 0, 2]];
        expect(checkForWinner(board)).toBe(0);

        board = [[1, 1, 2], [1, 1, 0], [2, 0, 2]];
        expect(checkForWinner(board)).toBe(0);


        board = [[2, 1, 2], [1, 1, 0], [2, 2, 1]];
        expect(checkForWinner(board)).toBe(0);
    });


    it('should return the winners number if there is a winner by a row', () => {
        let board = [[1, 1, 1], [0, 1, 0], [2, 0, 2]];
        expect(checkForWinner(board)).toBe(1);

        board = [[1, 1, 0], [2, 2, 2],[2, 0, 1]];
        expect(checkForWinner(board)).toBe(2);

        board = [[1, 1, 2], [0, 0, 2], [1, 1, 1]];
        expect(checkForWinner(board)).toBe(1);
    });

    it('should return the winners number if there is a winner by a column', () => {
            let board = [[1, 1, 0], [1, 2, 0], [1, 0, 2]];
            expect(checkForWinner(board)).toBe(1);

            board = [[1, 2, 1], [2, 2, 0], [1, 2, 1]];
            expect(checkForWinner(board)).toBe(2);

            board = [[2, 2, 1], [2, 0, 1], [1, 2, 1]];
            expect(checkForWinner(board)).toBe(1);
    });

    it('should return the winners number if there is a winner by a diagonal', () => {
            let board = [[1, 2, 2], [0, 1, 0], [2, 0, 1]];
            expect(checkForWinner(board)).toBe(1);

            board = [[1, 1, 2], [0, 2, 0], [2, 0, 1]];
            expect(checkForWinner(board)).toBe(2);
    });

});


describe('emptyCellsLeft', () => {

    it('should return true if empty cells are left', () => {
        const board = [[1, 1, 1], [0, 1, 0], [2, 0, 2]];
        expect(emptyCellsLeft(board)).toBeTruthy();
    });

    it('should return false if no empty cells are left', () => {
        const board = [[1, 1, 1], [2, 1, 2], [2, 1, 2]];
        expect(emptyCellsLeft(board)).toBeFalsy();
    });

});


describe('updateLeaderboard', () => {

    describe('if there is no winner', () => {

        it('should return the given leaderboard without changes', () => {
            const finishedGames = [{ foo: 'bar' }];
            const names = ['Max', 'Peter'];
            const winner = 0;
            const startedAt = moment().format('Do MMMM YYYY, h:mm:ss');
            const expectedResult = [{ foo: 'bar' }];

            expect(
                updateLeaderboard(finishedGames, names, winner, startedAt)
            ).toEqual(expectedResult);
        });

    });

    describe('if there is a winner', () => {

        it('should return the given leaderboard with the new entry', () => {
            const finishedGames = [];
            const names = ['Max', 'Peter'];
            const startedAt = moment().format('Do MMMM YYYY, h:mm:ss');
            let winner = 1;
            let expectedResult = [{
                    winner: 'Max',
                    looser: 'Peter',
                    startedAt,
                    finishedAt: jasmine.any(String)
                }];

            expect(
                updateLeaderboard(finishedGames, names, winner, startedAt)
            ).toEqual(expectedResult);

            winner = 2;
            expectedResult = [{
                    winner: 'Peter',
                    looser: 'Max',
                    startedAt,
                    finishedAt: jasmine.any(String)
                }];

            expect(
                updateLeaderboard(finishedGames, names, winner, startedAt)
            ).toEqual(expectedResult);
        });

    });

});

