import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Board from '../components/Board';
import Leaderboard from '../components/Leaderboard';
import { move, windowResize } from '../actions';

class TicTacToe extends Component {
    constructor() {
        super();
        this.state = {
            boardHeight: 0
        };
    }

    componentDidMount() {
        window.addEventListener('resize', this.updateGridHeight.bind(this));
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateGridHeight.bind(this));
    }

    updateGridHeight() {
        const { dispatch } = this.props;

        dispatch(windowResize(this.refs.boardContainer.refs.board.offsetWidth));
    }

    dispatchMoveEvent(colIndex, rowIndex) {
        const { dispatch } = this.props;

        dispatch(move(colIndex, rowIndex));
    }

    render() {
        const { board, frozen, boardHeight, finishedGames } = this.props;

        return (
            <div>
                <Header
                    firstGame={ !finishedGames.length && frozen } />

                <Board
                    ref="boardContainer"
                    board={ board }
                    move={ this.dispatchMoveEvent.bind(this) }
                    frozen={ frozen }
                    height={ boardHeight } />

                <Leaderboard
                    finishedGames={ finishedGames } />
            </div>
        );
    }
}

TicTacToe.propTypes = {
    dispatch: PropTypes.func.isRequired,
    board: PropTypes.array.isRequired,
    frozen: PropTypes.bool.isRequired,
    boardHeight: PropTypes.number.isRequired,
    finishedGames: PropTypes.array.isRequired
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(TicTacToe);
