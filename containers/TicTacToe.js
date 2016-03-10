import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Board from '../components/Board';
import { move } from '../actions';

const TicTacToe = ({ dispatch, board, frozen }) => {
    const dispatchMoveEvent = (colIndex, rowIndex) => {
        dispatch(move(colIndex, rowIndex));
    };

    return (
        <div>
            <Header />
            <Board
                board={ board }
                move={ dispatchMoveEvent }
                frozen={ frozen } />
        </div>
    );
};

TicTacToe.propTypes = {
    dispatch: React.PropTypes.func,
    board: React.PropTypes.array,
    frozen: React.PropTypes.bool
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(TicTacToe);
