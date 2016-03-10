import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Leaderboard component which renders the leaderboard
 * and all entries deplending on the finished games
 */
const Leaderboard = ({ finishedGames }) => {
    return (
        <div className="leaderboard">
            <h2>Leaderboard</h2>

            <table className={classNames(
                'table',
                'table-condensed',
                { hidden: (!finishedGames.length) }
            )}>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Winner</th>
                        <th>Looser</th>
                        <th>Game started at</th>
                        <th>Game finished at</th>
                    </tr>

                    { finishedGames.map((game, index) => {
                        return (
                            <tr key={ index }>
                                <td>{ index + 1 }</td>
                                <td>{ game.winner }</td>
                                <td>{ game.looser }</td>
                                <td>{ game.startedAt }</td>
                                <td>{ game.finishedAt }</td>
                            </tr>
                        );
                    }) }
                </tbody>
            </table>

            <div role="alert" className={classNames(
                'alert',
                'alert-success',
                { hidden: (!!finishedGames.length) }
            )}>
                No round was played yet.
            </div>
        </div>
    );
};

Leaderboard.propTypes = {
    finishedGames: PropTypes.array.isRequired
};

export default Leaderboard;
