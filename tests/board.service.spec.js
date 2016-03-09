import Board from '../src/board.service';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

'use strict';

describe('Board', () => {
    let instance;

    beforeEach(() => {
        instance = new Board();
    });

    it('should exist', () => {
        expect(Board).toBeDefined();
    });

    describe('when instantiated', () => {

        it('should create a new board of arbitrary size', () => {
            const expectedBoard = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
            let { board } = instance;

            expect(board).toEqual(expectedBoard);
        });
    });

    describe('getCell', () => {

        it('should return the value of a given cell', () => {
            instance.board = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];

            expect(instance.getCell(0, 2)).toBe(3);
            expect(instance.getCell(1, 1)).toBe(5);
            expect(instance.getCell(2, 0)).toBe(7);
        });
    });


    describe('allEqual', () => {

        it('should check if all array elements are equal', () => {
            expect(instance.allEqual([3, 3, 3])).toBeTruthy();
            expect(instance.allEqual([4, 3, 4])).toBeFalsy();
        });
    });


    describe('move', () => {

        it('should place a player on the board', () => {
            instance.move(0, 1, 2);

            expect(instance.board[0][1]).toBe(2);
        });
    });


    describe('checkRowsForWinner', () => {

        it('should return winning player if player has three in a row', () => {
            instance.board = [[1, 1, 0], [1, 2, 0], [1, 0, 2]];
            expect(instance.checkRowsForWinner()).toBe(0);

            instance.board = [[1, 1, 1], [0, 1, 0], [2, 0, 2]];
            expect(instance.checkRowsForWinner()).toBe(1);

            instance.board = [[1, 1, 0], [2, 2, 2],[2, 0, 1]];
            expect(instance.checkRowsForWinner()).toBe(2);

            instance.board = [[1, 1, 2], [0, 0, 2], [1, 1, 1]];
            expect(instance.checkRowsForWinner()).toBe(1);
        });
    });


    describe('checkColsForWinner', () => {

        it('should return winning player if player has three in a column', () => {
            instance.board = [[1, 1, 1], [0, 1, 0], [2, 0, 2]];
            expect(instance.checkColsForWinner()).toBe(0);

            instance.board = [[1, 1, 0], [1, 2, 0], [1, 0, 2]];
            expect(instance.checkColsForWinner()).toBe(1);

            instance.board = [[1, 2, 1], [2, 2, 0], [1, 2, 1]];
            expect(instance.checkColsForWinner()).toBe(2);

            instance.board = [[2, 2, 1], [2, 0, 1], [1, 2, 1]];
            expect(instance.checkColsForWinner()).toBe(1);
        });
    });



    describe('checkDiagonalsForWinner', () => {

        it('should return winning player if player has three in a diagonal', () => {
            instance.board = [[1, 1, 1], [0, 1, 0], [2, 0, 2]];
            expect(instance.checkDiagonalsForWinner()).toBe(0);

            instance.board = [[1, 2, 2], [0, 1, 0], [2, 0, 1]];
            expect(instance.checkDiagonalsForWinner()).toBe(1);

            instance.board = [[1, 1, 2], [0, 2, 0], [2, 0, 1]];
            expect(instance.checkDiagonalsForWinner()).toBe(2);
        });
    });


    describe('checkForFullBoard', () => {

        it('should return 3 if all cols are not 0', () => {
            instance.board = [[1, 1, 1], [0, 1, 0], [2, 0, 2]];
            expect(instance.checkForFullBoard()).toBe(0);

            instance.board = [[1, 1, 1], [2, 1, 2], [2, 1, 2]];
            expect(instance.checkForFullBoard()).toBe(3);
        });
    });


    describe('checkForWinner', () => {

        beforeEach(() => {
            spyOn(instance, 'checkRowsForWinner');
            spyOn(instance, 'checkColsForWinner');
            spyOn(instance, 'checkDiagonalsForWinner');
            spyOn(instance, 'checkForFullBoard');
        });


        it('should just checkRowsForWinner if player won by any row', () => {
            instance.checkRowsForWinner.and.returnValue(2);
            const winner = instance.checkForWinner();

            expect(winner).toBe(2);
            expect(instance.checkRowsForWinner).toHaveBeenCalled();
            expect(instance.checkColsForWinner).not.toHaveBeenCalled();
            expect(instance.checkDiagonalsForWinner).not.toHaveBeenCalled();
            expect(instance.checkForFullBoard).not.toHaveBeenCalled();
        });


        it('should just checkRowsForWinner and checkColsForWinner if player won by any col', () => {
            instance.checkRowsForWinner.and.returnValue(0);
            instance.checkColsForWinner.and.returnValue(2);
            const winner = instance.checkForWinner();

            expect(winner).toBe(2);
            expect(instance.checkRowsForWinner).toHaveBeenCalled();
            expect(instance.checkColsForWinner).toHaveBeenCalled();
            expect(instance.checkDiagonalsForWinner).not.toHaveBeenCalled();
            expect(instance.checkForFullBoard).not.toHaveBeenCalled();
        });


        it('should not call checkForFullBoard if player won by any diagonal', () => {
            instance.checkRowsForWinner.and.returnValue(0);
            instance.checkColsForWinner.and.returnValue(0);
            instance.checkDiagonalsForWinner.and.returnValue(2);
            const winner = instance.checkForWinner();

            expect(winner).toBe(2);
            expect(instance.checkRowsForWinner).toHaveBeenCalled();
            expect(instance.checkColsForWinner).toHaveBeenCalled();
            expect(instance.checkDiagonalsForWinner).toHaveBeenCalled();
            expect(instance.checkForFullBoard).not.toHaveBeenCalled();
        });


        it('should not call checkForFullBoard if player won by any diagonal', () => {
            instance.checkRowsForWinner.and.returnValue(0);
            instance.checkColsForWinner.and.returnValue(0);
            instance.checkDiagonalsForWinner.and.returnValue(0);
            instance.checkForFullBoard.and.returnValue(3);
            const winner = instance.checkForWinner();

            expect(winner).toBe(3);
            expect(instance.checkRowsForWinner).toHaveBeenCalled();
            expect(instance.checkColsForWinner).toHaveBeenCalled();
            expect(instance.checkDiagonalsForWinner).toHaveBeenCalled();
            expect(instance.checkForFullBoard).toHaveBeenCalled();
        });
    });
});
