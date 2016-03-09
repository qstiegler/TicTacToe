import React from 'react';
import ReactDOM from 'react-dom';

/**
 *  Commponent for Tic Tac Toe game
 */
class Header extends React.Component {

    componentWillReceiveProps(props) {
        if (props.gameState !== 0) {
            console.log('game state changed');
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const names = [
            ReactDOM.findDOMNode(this.refs['name-p1']).value,
            ReactDOM.findDOMNode(this.refs['name-p2']).value
        ];

        this.props.startGame(names);
    }

    render() {
        const handleSubmit = this.handleSubmit.bind(this);
        const btnText = (this.props.gameState === 0) ? 'Start game' : 'Restart game';

        return (
            <div className="jumbotron">
                <h1>Tic Tac Toe</h1>
                <p className="lead">Type in your names</p>

                <form onSubmit={ handleSubmit }>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="namePlayerOne"
                            ref="name-p1"
                            required
                            placeholder="Name player one" />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            id="namePlayerTwo"
                            ref="name-p2"
                            required
                            placeholder="Name player two" />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-default">
                        { btnText }
                    </button>
                </form>
            </div>
        );
    }
}

Header.propTypes = {
    gameState: React.PropTypes.number,
    startGame: React.PropTypes.func
};

export default Header;
