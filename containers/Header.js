import React from 'react';
import { connect } from 'react-redux';
import NamesForm from '../components/NamesForm';
import { startGame } from '../actions';

const Header = ({ dispatch }) => {
    const formSubmit = (namePlayerOne, namePlayerTwo) => {
        if (!namePlayerOne.trim() || !namePlayerTwo.trim()) {
            return;
        }

        dispatch(startGame(namePlayerOne, namePlayerTwo));
    };

    return (
        <div className="jumbotron">
            <h1>Tic Tac Toe</h1>
            <p className="lead">Type in your names</p>
            <NamesForm
                formSubmit={ formSubmit }
                btnText="Text Text" />
        </div>
    );
};

Header.propTypes = {
    dispatch: React.PropTypes.func
};

const mapStateToProps = (state) => {
    return state;
};

export default connect(mapStateToProps)(Header);
