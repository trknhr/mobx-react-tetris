import {BOARD_HEIGHT, BOARD_WIDTH, FRAME_TIME} from '../constants/'
import {observable, computed, action} from 'mobx';

export default class BoardStore {

    board = new Array(BOARD_HEIGHT).fill(null).map(a => buildGameRow())

    get currentBoard(){
        return this.board.map(a => Object.assign([], a))
    }

    isEmptyPosition = (shape, rotation, position) => {
        const blocks = shape.blocks[rotation];

        for (let x = 0; x < shape.blocks[0].length; x++) {
            for (let y = 0; y < shape.blocks[0].length; y++) {
                const block = blocks[y][x];
                const boardX = x + position.x
                const boardY = y + position.y

                if (block) {
                    if (boardX >= 0 && boardX < BOARD_WIDTH && boardY < BOARD_HEIGHT) {
                        if (this.board[boardY][boardX]) {
                            return false
                        }
                    } else {
                        return false
                    }
                }
            }
        }
        return true;
    }

    setPiece = (shape, rotation, position) => {
        pieceSetter(this.board)(shape.blocks[rotation], position, shape.className)
        this.removeLines()
    }

    _setPiece = (blocks, position, className) => {
        for (var x = 0; x < blocks[0].length; x++) {
            for (var y = 0; y < blocks[0].length; y++) {
                if (blocks[y][x]) {
                    const boardX = position.x + x
                    const boardY = position.y + y
                    this.board[boardY][boardX] = className;
                }
            }
        }
    }


    @action removeLines = () => {
        for (let y = 0; y < this.board.length; y++) {
            if (this.board[y].every(a => a)) {
                this.board.splice(y, 1)
                this.board.unshift(buildGameRow())
            }
        }
    }
}

export const pieceSetter = (board) => (blocks, position, className) => {
    for (let x = 0; x < blocks[0].length; x++) {
        for (let y = 0; y < blocks[0].length; y++) {
            const block = blocks[y][x];
            if (block) {
                const boardX = position.x + x
                const boardY = position.y + y
                board[boardY][boardX] = className
            }
        }
    }
}

export const buildGameRow = () => {
    return new Array(BOARD_WIDTH).fill(false)
}
