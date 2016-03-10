import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import NamesForm from '../components/NamesForm';
import { startGame } from '../actions';

const Header = ({ dispatch, firstGame }) => {
    const dispatchStartEvent = (namePlayerOne, namePlayerTwo) => {
        if (!namePlayerOne.trim() || !namePlayerTwo.trim()) {
            return;
        }

        dispatch(startGame(namePlayerOne, namePlayerTwo));
    };

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

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Header);
