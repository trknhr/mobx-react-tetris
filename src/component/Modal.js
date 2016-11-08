import React from 'react';
import {observer} from 'mobx-react';
import './Modal.css'

export default class Modal extends React.Component {
    render() {
        const style = this.props.isOver ? {display: 'block'} : {display: 'none'}
        return (
            <div className="modalbg" style={style}>
                <p>Game over!</p>
                <div className="lower">
                    <a className="retry-button" href="">Try again</a>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    gameBoardStore: React.PropTypes.object
};
