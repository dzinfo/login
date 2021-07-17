import React from 'react';

class SubmitButton extends React.Component {

    render() {
        return (
            <div className="App">
                <button className='btn' disabled={this.props.disabled} onClick={() => this.props.onClick()}></button>
            </div>
        );
    }


}

export default SubmitButton;

