import React from 'react';

/**
 *  Commponent for Tic Tac Toe game
 */
class Board extends React.Component {

    constructor() {
        super();

        /**
         * @type {object}
         * @property {number} gridHeight Height of the grid
         */
        this.state = {
            gridHeight: 0
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateGridHeight.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateGridHeight.bind(this));
    }

    updateGridHeight() {
        this.setState({ gridHeight: this.refs.board.offsetWidth });
    }

    render() {
        const boardArr = this.props.board;
        const gridStyle = { height: this.state.gridHeight };
        let boardClasses = 'board';

        if (!this.props.gameHasStarted) {
            boardClasses += ' disabled';
        }

        const board = boardArr.map((row, rowIndex) => {
            const cells = row.map((cell, cellIndex) => {
                const coords = `${rowIndex}_${cellIndex}`;
                const clickHandler = this.props.onMove;
                let classString = 'col-xs-4';
                let icon;

                if (cell > 0) {
                    classString += (cell === 1) ?
                        ' cell-p1' :
                        ' cell-p2';

                    icon = (cell === 1) ?
                        <img src="icons/cross.svg" /> :
                        <img src="icons/circle.svg" />;
                } else {
                    classString += ' cell';
                }

                return (
                    <div
                        className={ classString }
                        key={ cellIndex }
                        onClick={ clickHandler }
                        data-cell={ coords }>
                        { icon }
                    </div>
                );
            });

            return (
                <div
                    className="row"
                    key={ rowIndex }>
                    { cells }
                </div>
            );
        });

        return (
            <div
                className={ boardClasses }
                ref="board"
                style={ gridStyle }>
                { board }
            </div>
        );
    }
}

Board.propTypes = {
    board: React.PropTypes.array,
    gameHasStarted: React.PropTypes.bool,
    onMove: React.PropTypes.func
};

export default Board;
