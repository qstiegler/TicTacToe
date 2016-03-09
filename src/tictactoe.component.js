import React from 'react';
import Header from './header.component';
import Board from './board.component';
import Leaderboard from './leaderboard.component';
import BoardService from './board.service';

/**
 *  Commponent for Tic Tac Toe game
 */
class TicTacToe extends React.Component {

    constructor() {
        super();

        /**
         * @type {object}
         * @property {number} player The player with the action.
         * @property {number} winner Reference for the winners id. It could be 0 (no winner), 1 (player one) or 2 (player two).
         * @property {number} game Game state. Could be 0 (game not startet), 1 (game has started) or 2 (game over)
         */
        this.state = {
            player: 1,
            winner: 0,
            game: 0
        };

        this.boardService = new BoardService();
    }

    /**
     * Starting or restarting the game.
     * If game status is not 0 it also resets the board.
     * @property {object} names of the players
     */
    startGame(names) {
        if (this.state.game !== 0) {
            this.boardService = new BoardService();
        }

        this.setState({
            player: 1,
            winner: 0,
            game: 1,
            startTime: new Date(),
            names
        });
    }

    /**
     * Called when the current payer is doing a turn.
     * 1. checks if there is already a winner.
     * 2. if there is no winner it checks if the cell is unused
     * 3. if the cell is unused it calls the move method of the board module.
     * 4. it checks if there is a winner after that turn
     * 5. if there is a winner it updates the state by the winner
     * 6. if there is no winner it toggles the player and updates the state by the new player
     * @param {SytheticEvent} e
     */
    move(e) {
        if (this.state.game === 1 && this.state.winner === 0) {
            const [x, y] = e.target.dataset.cell.split('_');
            const cellUnused = this.boardService.getCell(x, y) === 0;

            if (cellUnused) {
                this.boardService.move(x, y, this.state.player);

                const winner = this.boardService.checkForWinner();

                if (winner !== 0) {
                    this.setState({ game: 2, winner });
                } else {
                    this.togglePlayer();
                }
            }
        }
    }

    /**
     * Toggle between player one and two.
     */
    togglePlayer() {
        this.setState({
            player: (this.state.player === 1) ? 2 : 1
        });
    }

    /**
     * Wraps all DOM elements together
     * @return {ReactElement} markup
     */
    render() {
        const gameHasStarted = (this.state.game === 1);
        const startGame = this.startGame.bind(this);
        const onMove = this.move.bind(this);

        return (
            <div className="game">
                <Header
                    ref="header"
                    gameState={ this.state.game }
                    startGame={ startGame } />

                <Board
                    ref="board"
                    gameHasStarted={ gameHasStarted }
                    board={ this.boardService.board }
                    onMove={ onMove } />

                <Leaderboard
                    ref="leaderboard"
                    winner={ this.state.winner }
                    playerNames={ this.state.names }
                    startedAt={ this.state.startTime } />
            </div>
        );
    }
}

export default TicTacToe;
