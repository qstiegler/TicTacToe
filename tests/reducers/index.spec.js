import reducers from '../../reducers';


describe('reducers', () => {
    let initialState;

    beforeEach(() => {
        initialState = {
            board: [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
            boardHeight: 0,
            player: 1,
            winner: 0,
            frozen: true,
            names: [],
            finishedGames: []
        }
    });


    describe('when action type does not match', () => {

        it('should return the previous state', () => {
            const action = { type: 'FOO_BAR' };
            let result = reducers(undefined, action);

            expect(result).toEqual(initialState);
        });

    });


    describe('when action type is START_GAME', () => {

        describe('and state is undefined', () => {

            it('should update board, player, winner, frozen and add the names from action', () => {
                const action = { type: 'START_GAME', names: ['Hans', 'Peter'] };
                let result = reducers(undefined, action);
                let expectedResult = Object.assign({}, initialState, {
                    frozen: false,
                    names: ['Hans', 'Peter']
                });

                expect(result).toEqual(expectedResult);
            });

        });


        describe('and state is like initial state', () => {

            it('should update board, player, winner, frozen and add the names from action', () => {
                const action = { type: 'START_GAME', names: ['Flo', 'Chris'] };
                let result = reducers(initialState, action);
                let expectedResult = Object.assign({}, initialState, {
                    frozen: false,
                    names: ['Flo', 'Chris']
                });

                expect(result).toEqual(expectedResult);
            });

        });


        describe('and state is already modified', () => {

            it('should update board, player, winner, frozen and add the names from action', () => {
                const action = { type: 'START_GAME', names: ['Flo', 'Chris'] };
                let stateBefore = Object.assign({}, initialState, {
                    boardHeight: 200,
                    player: 2,
                    winner: 1,
                    frozen: false,
                    names: ['Lisa', 'Max'],
                    finishedGames: [{ winner: 1, looser: 2 }]
                });
                let result = reducers(stateBefore, action);
                let expectedResult = Object.assign({}, initialState, {
                    boardHeight: 200,
                    frozen: false,
                    names: ['Flo', 'Chris'],
                    finishedGames: [{ winner: 1, looser: 2 }]
                });

                expect(result).toEqual(expectedResult);
            });

        });

    });


    describe('when action type is MOVE', () => {

        describe('when frozen flag is true', () => {

            it('should return the state without changing when frozen flag is true', () => {
                const action = { type: 'MOVE', colIndex: 0, rowIndex: 2 };
                let stateBefore = Object.assign({}, initialState, {
                    boardHeight: 200,
                    frozen: true
                });
                let result = reducers(stateBefore, action);
                let expectedResult = Object.assign({}, initialState, {
                    boardHeight: 200,
                    frozen: true
                });

                expect(result).toEqual(expectedResult);
            });

        });


        describe('when nobody winns', () => {

            it('should toggle the player and set the move on the board', () => {
                const action = { type: 'MOVE', colIndex: 0, rowIndex: 2 };
                let stateBefore = Object.assign({}, initialState, {
                    frozen: false
                });
                let result = reducers(stateBefore, action);
                let expectedResult = Object.assign({}, initialState, {
                    player: 2,
                    frozen: false,
                    board: [[0, 0, 0], [0, 0, 0], [1, 0, 0]]
                });

                expect(result).toEqual(expectedResult);
            });

        });


        describe('when somebody winns', () => {

            it('should toggle the player, set the winner, freeze the game and add game to fininished Games', () => {
                const moveAction = { type: 'MOVE', colIndex: 2, rowIndex: 2 };
                let stateBefore = Object.assign({}, initialState, {
                    frozen: false,
                    board: [[0, 0, 0], [0, 0, 0], [1, 1, 0]],
                    names: ['Fritz', 'Franz']
                });
                let result = reducers(stateBefore, moveAction);
                let expectedResult = Object.assign({}, initialState, {
                    board: [[0, 0, 0], [0, 0, 0], [1, 1, 1]],
                    player: 2,
                    winner: 1,
                    frozen: true,
                    names: ['Fritz', 'Franz'],
                    finishedGames: [{
                        winner: 'Fritz',
                        looser: 'Franz',
                        startedAt: jasmine.any(String),
                        finishedAt: jasmine.any(String)
                    }]
                });

                expect(result).toEqual(expectedResult);
            });

        });


        describe('when no cells are left', () => {

            it('should toggle the player and freeze the game', () => {
                const moveAction = { type: 'MOVE', colIndex: 2, rowIndex: 2 };
                let stateBefore = Object.assign({}, initialState, {
                    frozen: false,
                    board: [[2, 1, 1], [1, 2, 2], [1, 2, 0]],
                    names: ['Fritz', 'Franz']
                });
                let result = reducers(stateBefore, moveAction);
                let expectedResult = Object.assign({}, initialState, {
                    board: [[2, 1, 1], [1, 2, 2], [1, 2, 1]],
                    player: 2,
                    winner: 0,
                    frozen: true,
                    names: ['Fritz', 'Franz']
                });

                expect(result).toEqual(expectedResult);
            });

        });


        describe('when no cells are left and we have a winner', () => {

            it('should toggle the player and freeze the game', () => {
                const moveAction = { type: 'MOVE', colIndex: 2, rowIndex: 2 };
                let stateBefore = Object.assign({}, initialState, {
                    frozen: false,
                    player: 2,
                    board: [[2, 1, 1], [1, 2, 2], [1, 2, 0]],
                    names: ['Fritz', 'Franz']
                });
                let result = reducers(stateBefore, moveAction);
                let expectedResult = Object.assign({}, initialState, {
                    board: [[2, 1, 1], [1, 2, 2], [1, 2, 2]],
                    player: 1,
                    winner: 2,
                    frozen: true,
                    names: ['Fritz', 'Franz'],
                    finishedGames: [{
                        winner: 'Franz',
                        looser: 'Fritz',
                        startedAt: jasmine.any(String),
                        finishedAt: jasmine.any(String)
                    }]
                });

                expect(result).toEqual(expectedResult);
            });
        });

    });


    describe('when action type is WINDOW_RESIZE', () => {

        it('change the boardHeight depending on the given value if it is a number', () => {
            const action = { type: 'WINDOW_RESIZE', boardHeight: 200 };
            let result = reducers(undefined, action);
            let expectedResult = Object.assign({}, initialState, {
                    boardHeight: 200
                });

            expect(result).toEqual(expectedResult);
        });

        it('should return the previous state if given value is not a number', () => {
            const action = { type: 'WINDOW_RESIZE', boardHeight: 'foo' };
            let result = reducers(undefined, action);

            expect(result).toEqual(initialState);
        });

    })

});
