import {I, J, L, O, S, T, Z} from '../types/shapeTypes'

export const getRandomShape = () => {
    const types = [I, J, L, O, S, T, Z]
    return types[Math.floor(Math.random() * types.length)]
}