import React, { Component } from 'react';
import ReactDOM from 'react-dom';

/**
 * NamesForm component renders the Form
 * for the input of the players names
 */
class NamesForm extends Component {
    render() {
        const { formSubmit, btnText } = this.props;

        /**
        * onSubmitHandler will be called when the form gets submitted.
        * It fetches then the values of the two input fields and pass them
        * as parameters to the formSubmit function which is given by the props.
        * @param {SytheticEvent} e
        */
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
    formSubmit: React.PropTypes.func.isRequired,
    btnText: React.PropTypes.string.isRequired
};

export default NamesForm;
