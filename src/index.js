import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import GameBoardStore from './stores/gameBoardStore'
import BoardStore from './stores/boardStore'


const gameBoardStore = new GameBoardStore(new BoardStore())

ReactDOM.render(
  <App gameBoardStore={gameBoardStore}/>,
  document.getElementById('app')
);
