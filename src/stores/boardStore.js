import {BOARD_HEIGHT, BOARD_WIDTH, FRAME_TIME} from '../constants/'
import {observable, computed, action} from 'mobx';

export default class BoardStore {

    board = new Array(BOARD_HEIGHT).fill(null).map(a => buildGameRow())

    get currentBoard(){
        return this.board.map(a => Object.assign([], a))
    }

    isEmptyPosition = (shape, rotation, position) => {
        var blocks = shape.blocks[rotation];

        for (var x = 0; x < shape.blocks[0].length; x++) {
            for (var y = 0; y < shape.blocks[0].length; y++) {
                var block = blocks[y][x];
                var boardX = x + position.x;
                var boardY = y + position.y;

                // might not be filled, ya know
                if (block) {
                    // make sure it's on the board
                    if (boardX >= 0 && boardX < BOARD_WIDTH && boardY < BOARD_HEIGHT) {
                        // make sure it's available
                        if (this.board[boardY][boardX]) {
                            // that square is taken by the board already
                            return false;
                        }
                    } else {
                        // there's a square in the block that's off the board
                        return false;
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
                var block = blocks[y][x];
                if (block) {
                    var boardX = position.x + x;
                    var boardY = position.y + y;
                    this.board[boardY][boardX] = className;
                }
            }
        }
    }


    @action removeLines = () => {
        const lines = 0
        for (var y = 0; y < this.board.length; y++) {
            // it's a full line
            if (this.board[y].every(a => a)) {
                // so rip it out
                this.board.splice(y, 1);
                this.board.unshift(buildGameRow());
            }
        }
    }
}

export const pieceSetter = (board) => (blocks, position, className) => {
    for (let x = 0; x < blocks[0].length; x++) {
        for (let y = 0; y < blocks[0].length; y++) {
            const block = blocks[y][x];
            if (block) {
                var boardX = position.x + x;
                var boardY = position.y + y;
                board[boardY][boardX] = className;
            }
        }
    }
}

export const buildGameRow = () => {
    return new Array(BOARD_WIDTH).fill(false)
}
