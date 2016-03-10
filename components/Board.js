import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

class Board extends Component {

    render() {
        const { board, move, frozen, height } = this.props;

        const renderIcon = (cell) => {
            let icon;

            if (cell === 1 || cell === 2) {
                icon = (cell === 1) ?
                    <img src="assets/img/cross.svg" /> :
                    <img src="assets/img/circle.svg" />;
            }

            return icon;
        };

        const onMoveHandler = (e) => {
            move(e.target.dataset.row, e.target.dataset.col);
        };

        return (
            <div ref="board"
                className={ classNames('board container', { frozen })}
                style={{ height }}>
                { board.map((row, rowIndex) => {
                    return (
                        <div className="row" key={ rowIndex }>
                            { row.map((cell, cellIndex) => {
                                return (
                                    <div
                                        className={classNames(
                                            'col-xs-4',
                                            { cell: ([1, 2].indexOf(cell) === -1) },
                                            { 'cell-p1': (cell === 1) },
                                            { 'cell-p2': (cell === 2) }
                                        )}
                                        key={ cellIndex }
                                        onClick={ onMoveHandler }
                                        data-col={ cellIndex }
                                        data-row={ rowIndex }>
                                        { renderIcon(cell) }
                                    </div>
                                );
                            }) }
                        </div>
                    );
                }) }
            </div>
        );
    }
}

Board.propTypes = {
    board: PropTypes.array.isRequired,
    move: PropTypes.func.isRequired,
    frozen: PropTypes.bool.isRequired,
    height: PropTypes.number.isRequired
};

export default Board;
