import React from 'react';
import {observer} from 'mobx-react';
import Gameboard from './Gameboard'

@observer
export default class Tetris extends React.Component {
    render() {
        const {gameBoardStrore, viewStore} = this.props;
        return (
            <div>
                <Gameboard {...this.props}/>
            </div>
        );
    }
}

Tetris.propTypes = {
    gameBoardStore: React.PropTypes.object
};
