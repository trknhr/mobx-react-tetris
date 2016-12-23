import React from 'react';

import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import App from './App';
import GameBoardStore from './stores/gameBoardStore'
import BoardStore from './stores/boardStore'

it('App init view', () => {
    const gameBoardStore = new GameBoardStore(new BoardStore())
    const app = TestUtils.renderIntoDocument(
        <App gameBoardStore={gameBoardStore}/>,
    );

    const appNode = ReactDOM.findDOMNode(app);

    expect(appNode.textContent).toEqual('Game over!Try again');
});

