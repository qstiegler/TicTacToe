import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NamesForm from '../components/NamesForm';
import { startGame } from '../actions';

/**
 * This container renders the header area of the TicTacToe app
 */
const Header = ({ dispatch, firstGame }) => {
    /**
    * If both name parameters are strings,
    * it dispatches the startGame action
    * @param {string} namePlayerOne name of the player one
    * @param {string} namePlayerTwo name of the player two
    */
    const dispatchStartEvent = (namePlayerOne, namePlayerTwo) => {
        if (!namePlayerOne.trim() || !namePlayerTwo.trim()) {
            return;
        }

        dispatch(startGame(namePlayerOne, namePlayerTwo));
    };

    /**
    * It returns differen button texts depending on
    * wether the given prop `firstGame` is true or false
    */
    const makeBtnText = () => {
        return (firstGame) ? 'Start game' : 'Restart game';
    };

    return (
        <div className="jumbotron">
            <h1>Tic Tac Toe</h1>
            <p className="lead">Type in your names</p>
            <NamesForm
                formSubmit={ dispatchStartEvent }
                btnText={ makeBtnText() } />
        </div>
    );
};

Header.propTypes = {
    dispatch: PropTypes.func.isRequired,
    firstGame: PropTypes.bool.isRequired
};

/**
* Maps the state object to the properties of the Header component
* @param {object} redux state of the app
*/
const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Header);
