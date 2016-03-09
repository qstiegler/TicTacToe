import TicTacToe from '../src/tictactoe.component';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

'use strict';

describe('TicTacToe', () => {
    let component;

    beforeEach(() => {
        component = TestUtils.renderIntoDocument(<TicTacToe />);

        spyOn(component, 'move').and.callThrough();
    });


    afterEach(() => {
        ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(component).parentNode);
    });


    it('should exist', () => {
        expect(TicTacToe).toBeDefined();
    });


    describe('when rendered successfully', () => {
        it('should be player one\'s turn', () => {
            expect(component.state.player).toBe(1);
        });


        it('should not have a winner initially', () => {
            expect(component.state.winner).toBe(0);
        });


        it('should not start the game initially', () => {
            expect(component.state.game).toBe(0);
        });


        it('should have a boardService', () => {
            expect(component.boardService).toBeDefined();
        });


        it('should contain a grid', () => {
            const grid = TestUtils.findRenderedDOMComponentWithClass(component, 'game');

            expect(grid).toBeDefined();
        });


        it('should contain the header', () => {
            expect(component.refs.header).toBeDefined();
        });


        it('should contain the board', () => {
            expect(component.refs.board).toBeDefined();
        });


        it('should contain the leaderboard', () => {
            expect(component.refs.leaderboard).toBeDefined();
        });


        it('should contain the correct board elements', () => {
            const rows = TestUtils.scryRenderedDOMComponentsWithClass(component, 'row');
            const cells = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell');

            expect(rows.length).toBe(3);
            expect(cells.length).toBe(9);
        });
    });


    describe('startGame', () => {
        let newNames;
        let oldDate;

        beforeEach(() => {
            oldDate = new Date("October 13, 2014 11:13:00");;
            newNames = ['chris', 'hans'];
        });


        it('should start the game', () => {
            expect(component.state.player).toBe(1);
            expect(component.state.winner).toBe(0);
            expect(component.state.game).toBe(0);
            expect(component.state.startTime).toBeUndefined();
            expect(component.state.names).toBeUndefined();

            component.startGame(newNames);

            expect(component.state.player).toBe(1);
            expect(component.state.winner).toBe(0);
            expect(component.state.game).toBe(1);
            expect(component.state.startTime).not.toEqual(oldDate);
            expect(component.state.names).toBe(newNames);
        });


        describe('when game status is not 0', () => {
            beforeEach(() => {
                let board = component.boardService.board;
                board[0][0] = 1;

                component.setState({
                    player: 2,
                    winner: 1,
                    startTime: oldDate,
                    names: ['max', 'peter']
                });
            });


            it('should reset the boardService', () => {
                component.startGame(newNames);

                expect(component.state.player).toBe(1);
                expect(component.state.winner).toBe(0);
                expect(component.state.game).toBe(1);
                expect(component.state.startTime).not.toEqual(oldDate);
                expect(component.state.names).toBe(newNames);
            });
        });
    });


    describe('move', () => {
        let mockEvent;
        let rows;

        beforeEach(() => {
            mockEvent = { target: { dataset: { cell: '0_0' } } };
            rows = component.boardService.board;
        });


        it('should do nothing if the game has not started yet', () => {
            component.setState({
                game: 0,
                player: 1,
                winner: 0
            });

            expect(rows[0][0]).toBe(0);

            component.move(mockEvent);

            expect(rows[0][0]).toBe(0);
        });


        describe('when game has been started', () => {
            beforeEach(() => {
                component.startGame(['mike', 'molly']);
            });


            it('should do nothing if winner is is already defined', () => {
                component.setState({
                    game: 2,
                    winner: 1
                });

                expect(rows[0][0]).toBe(0);

                component.move(mockEvent);

                expect(rows[0][0]).toBe(0);
            });


            it('should do nothing if cell is not empty', () => {
                component.setState({ player: 1 });
                rows[0][0] = 2;
                component.move(mockEvent);

                expect(rows[0][0]).toBe(2);
            });


            it('should set the winner if by this round somebody won', () => {
                component.setState({ player: 1 });
                rows[0][1] = 1;
                rows[0][2] = 1;

                expect(component.state.winner).toBe(0);

                component.move(mockEvent);

                expect(component.state.winner).toBe(1);
                expect(component.state.game).toBe(2);
                expect(component.state.player).toBe(1);
            });


            it('should switch current player if nobody won', () => {
                component.setState({ player: 1 });
                component.move(mockEvent);

                expect(component.state.winner).toBe(0);
                expect(component.state.player).toBe(2);
            });
        });
    });


    describe('togglePlayer', () => {
        it('should set the other player', () => {
            component.setState({ player: 1 });
            component.togglePlayer();

            expect(component.state.player).toBe(2);

            component.togglePlayer();

            expect(component.state.player).toBe(1);
        });
    });




/*
    describe('cells', () => {

        it('should store the correct coords on the data attribute', () => {
            const cells = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell');

            expect(cells[0].dataset.cell).toBe('0_0');
            expect(cells[4].dataset.cell).toBe('1_1');
        });


        it('should respond to click events if winner is zero', () => {
            const cells = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell');

            expect(component.state.winner).toBe(0);

            component.setState({ player: 1 });

            expect(component.board.getCell(0, 0)).toBe(0);

            TestUtils.Simulate.click(cells[0]);

            expect(component.board.getCell(0, 0)).toBe(1);
            expect(cells[0].classList[0]).toBe('cell-p1');

            component.setState({ player: 2 });

            expect(component.board.getCell(1, 1)).toBe(0);

            TestUtils.Simulate.click(cells[4]);

            expect(component.board.getCell(1, 1)).toBe(2);
            expect(cells[4].classList[0]).toBe('cell-p2');
        });


        it('should not respond to click events if winner is current player 1', () => {
            const cells = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell');
            component.setState({ player: 1 , winner: 1 });

            expect(component.board.getCell(0, 0)).toBe(0);
            expect(cells[0].classList[0]).toBe('cell');
            expect(component.move).not.toHaveBeenCalled();

            TestUtils.Simulate.click(cells[0]);

            expect(component.board.getCell(0, 0)).toBe(0);
            expect(cells[0].classList[0]).toBe('cell');
            expect(component.move).toHaveBeenCalled();
        });


        it('should not respond to click events if winner is current player 2', () => {
            const cells = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell');
            component.setState({ player: 1 , winner: 2 });

            expect(component.board.getCell(0, 0)).toBe(0);
            expect(cells[0].classList[0]).toBe('cell');
            expect(component.move).not.toHaveBeenCalled();

            TestUtils.Simulate.click(cells[0]);

            expect(component.board.getCell(0, 0)).toBe(0);
            expect(cells[0].classList[0]).toBe('cell');
            expect(component.move).toHaveBeenCalled();
        });


        it('should not respond to click events if winner is current player 3', () => {
            const cells = TestUtils.scryRenderedDOMComponentsWithClass(component, 'cell');
            component.setState({ player: 1 , winner: 3 });

            expect(component.board.getCell(0, 0)).toBe(0);
            expect(cells[0].classList[0]).toBe('cell');
            expect(component.move).not.toHaveBeenCalled();


            TestUtils.Simulate.click(cells[0]);

            expect(component.board.getCell(0, 0)).toBe(0);
            expect(cells[0].classList[0]).toBe('cell');
            expect(component.move).toHaveBeenCalled();
        });
    });*/



});
