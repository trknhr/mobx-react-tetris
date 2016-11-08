import {observable, computed, reaction, action} from 'mobx';
import {BOARD_HEIGHT, BOARD_WIDTH, FRAME_TIME} from '../constants/'
import {I, J, L, O, S, T, Z} from '../types/shapeTypes'
import {pieceSetter} from './boardStore'
import {getRandomShape} from '../utils/TypesUtil'

export default class GameBoardStore {

    @observable piece
    @observable isOver = false

    _interval

    constructor(boardStore){
        this.boardStore = boardStore
        this.setUpNewPiece()
    }

    @computed get board(){
        const board = this.boardStore.currentBoard

        const setter = pieceSetter(board)
        setter(
            this.piece.shape.blocks[this.piece.rotation],
            this.piece.position,
            this.piece.shape.className
        )

        return board
    }

    getShapeData = () => {
        return getPieceData()
    }

    start = () => {
        this._interval = setInterval(() =>
            this.moveDown()
        , FRAME_TIME)
    }

    @action moveDown = () => {
        const newPosition = Object.assign({}, this.piece.position)
        newPosition.y += 1

        if(this.boardStore.isEmptyPosition(this.piece.shape, this.piece.rotation, newPosition)){
            this.piece.position = newPosition
        } else {
            this.lockIn()
        }
    }

    @action moveLeft = () => {
        const newPosition = Object.assign({}, this.piece.position)
        newPosition.x -= 1

        if(this.boardStore.isEmptyPosition(this.piece.shape, this.piece.rotation, newPosition)) {
            this.piece.position = newPosition
        }
    }

    @action moveRight = () => {
        const newPosition = Object.assign({}, this.piece.position)
        newPosition.x += 1

        if(this.boardStore.isEmptyPosition(this.piece.shape, this.piece.rotation, newPosition)) {
            this.piece.position = newPosition
        }
    }

    lockIn = () => {
        this.boardStore.setPiece(this.piece.shape, this.piece.rotation, this.piece.position)
        // todo how to create new piece
        this.setUpNewPiece()
    }

    rotatePiece = () => {
        const newRotation = (this.piece.rotation + 1) % this.piece.shape.blocks.length

        if(this.boardStore.isEmptyPosition(this.piece.shape, newRotation, this.piece.position)) {
            this.piece.rotation = newRotation
        }
    }

    playerLost = () => {
        clearInterval(this._interval)
        console.log('over!!')
        this.isOver = true
    }

    setUpNewPiece = () => {
        const shape = getRandomShape()
        const position = {
                x: (BOARD_WIDTH / 2) - shape.blocks.length / 2,
                y: 0
            }
        const newPiece = {
            shape,
            rotation: 0,
            position
        }
        if(!this.boardStore.isEmptyPosition(newPiece.shape, newPiece.rotation, position)) {
            this.playerLost()
        } else {
            this.piece = newPiece
        }
    }

}

class ShapeStore {
    position = {
        x: BOARD_WIDTH / 2,
        y: 0
    }
    getShapeData = () => {
        return {
            shape: Z,
            rotation: 0,
            position: this.position
        }
    }
    tick = () => {
        const newPosition = Object.assign({}, this.position)
        newPosition.y = 1
    }
}