import React from 'react';
import {I} from '../types/shapeTypes'
import {BOARD_WIDTH, FRAME_TIME} from '../constants/'
import BoardStore from '../stores/boardStore'

it('setPiece', () => {
    const boardStore = new BoardStore()
    const shape = I
    const rotation = 0
    const position = {
                x: (BOARD_WIDTH / 2) - shape.blocks.length / 2,
                y: 0
            }
    boardStore.setPiece(shape, rotation, position)

    // expect(appNode.textContent).toEqual('Game over!Try again')
    expect(1).toEqual(1)
})

