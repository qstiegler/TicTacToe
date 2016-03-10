import React, { Component } from 'react';
import ReactDOM from 'react-dom';

class NamesForm extends Component {

    render() {
        const { formSubmit, btnText } = this.props;

        const onSubmitHandler = (e) => {
            e.preventDefault();

            const namePlayerOne = ReactDOM.findDOMNode(this.refs.one).value;
            const namePlayerTwo = ReactDOM.findDOMNode(this.refs.two).value;

            formSubmit(namePlayerOne, namePlayerTwo);
        };

        return (
            <form onSubmit={ onSubmitHandler }>
                <div className="form-group">
                    <input
                        type="text"
                        ref="one"
                        className="form-control"
                        required
                        placeholder="Name player one" />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        ref="two"
                        className="form-control"
                        required
                        placeholder="Name player two" />
                </div>
                <button
                    type="submit"
                    className="btn btn-default">
                    { btnText }
                </button>
            </form>
        );
    }
}

NamesForm.propTypes = {
    formSubmit: React.PropTypes.func,
    btnText: React.PropTypes.string
};

export default NamesForm;
