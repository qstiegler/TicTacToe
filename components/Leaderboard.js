import React from 'react';

/**
 *  Commponent for Tic Tac Toe game
 */
class Leaderboard extends React.Component {
    constructor() {
        super();

        /**
         * @type {object}
         * @property {number} gridHeight Height of the grid
         */
        this.state = {
            games: []
        };
    }

    componentWillReceiveProps(props) {
        if (props.winner !== 0) {
            console.log(props);
            this.addToLeaderboard(
                props.winner,
                props.playerNames,
                props.startedAt);
        }
    }

    addToLeaderboard(winner, playerNames) {
        const games = this.state.games;
        // const gameFinished = new Date();
        const newGame = {
            winner: playerNames[winner],
            looser: playerNames[(winner === 1) ? 2 : 1]
        };

        games.push(newGame);

        this.setState({ games });

        console.log(this.state);
    }

    render() {
        const rows = this.state.games.map((row) =>
            (
                <tr>
                    <td>{ row.winner }</td>
                    <td>{ row.looser }</td>
                    <td></td>
                    <td></td>
                </tr>
            )
        );

        return (
            <div className="leaderboard">
                <h2>Leaderboard</h2>

                <table className="table table-condensed">
                    <tbody>
                        <tr>
                            <th>Winner</th>
                            <th>Looser</th>
                            <th>Game started at</th>
                            <th>Game finished at</th>
                        </tr>

                        { rows }
                    </tbody>
                </table>
            </div>
        );
    }
}

Leaderboard.propTypes = {
    winner: React.PropTypes.number,
    playerNames: React.PropTypes.array,
    startedAt: React.PropTypes.number
};

export default Leaderboard;
