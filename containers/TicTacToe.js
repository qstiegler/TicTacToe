import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import Board from '../components/Board';
import Leaderboard from '../components/Leaderboard';
import { move, windowResize } from '../actions';

/**
* This is the overall container which wraps
* Header, Board and Leaderboard together
*/
class TicTacToe extends Component {

    /**
    * componentDidMount will be automatically called when the
    * component is successfully mounted. The function adds then
    * a onResize event on the window object to update the height
    * of the fluid grid of the board.
    */
    componentDidMount() {
        window.addEventListener('resize', this.updateGridHeight.bind(this));
    }

    /**
    * componentDidMount will be automatically called when
    * the component gets unmounted. The function then
    * removes the resize event listener from above
    */
    componentWillUnmount() {
        window.removeEventListener('resize', this.updateGridHeight.bind(this));
    }

    /**
    * Every time this function will be called id dispatches
    * the resize action for updating the height of the fluid grid.
    */
    updateGridHeight() {
        const { dispatch } = this.props;

        dispatch(windowResize(this.refs.boardContainer.refs.board.offsetWidth));
    }

    /**
    * Every time this function will be called id dispatches
    * the move event which means the turn of the player is over.
    * @param {number} colIndex index of the column where the player has clicked
    * @param {number} rowIndex index of the row where the player has clicked
    */
    dispatchMoveEvent(colIndex, rowIndex) {
        const { dispatch } = this.props;

        dispatch(move(colIndex, rowIndex));
    }

    /**
    * Renders the overall container for the TicTacToe app
    */
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

/**
* Maps the state object to the properties of the Header component
* @param {object} redux state of the app
*/
const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(TicTacToe);
