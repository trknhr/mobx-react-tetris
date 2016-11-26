import React, { Component } from 'react';
import './App.css';
import Tetris from './component/Tetris'

class App extends Component {
    render() {
        const {gameBoardStore} = this.props;

        return (
            <Tetris gameBoardStore={gameBoardStore}/>
        );
    }
}

export default App;
