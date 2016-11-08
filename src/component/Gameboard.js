import React from 'react';
import {observer} from 'mobx-react';
import './gameboard.css'
import key from 'keymaster'
import Modal from './Modal'

@observer
export default class Gameboard extends React.Component {
    componentWillMount(){
        const {gameBoardStore} = this.props;
        this.bindKeyboardEvents()
        gameBoardStore.start()
    }
    render() {
        const {gameBoardStore} = this.props;

        const gameBoard = gameBoardStore.board
        console.log('gameBoardStore.isOver', gameBoardStore.isOver)
        const rows = gameBoard.map((row, i) => {
            const blocksInRows = row.map((block, j) => {
                const classString = 'game-block ' + (block || 'block-empty')
                return (
                    <td key={j} className={classString}/>
                )
            })
            return (
                <tr key={i}>
                    {blocksInRows}
                </tr>
            )
        })
        return (
            <div className="game">
                <Modal isOver={gameBoardStore.isOver}/>
                <table className="game-board">
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        );
    }

    bindKeyboardEvents(){
        const {gameBoardStore} = this.props

        key('down', gameBoardStore.moveDown)
        key('left', gameBoardStore.moveLeft)
        key('right', gameBoardStore.moveRight)
        key('up', gameBoardStore.rotatePiece)
    }
}

