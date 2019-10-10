export default class King {

    posMoves = () => {
        // Check if piece is at the edge
        this.edgeLeft = false
        this.edgeRight = false
        if (positionOld % 8 === 0) {
            this.edgeLeft = true
        } else if ((positionOld + 1) % 8 === 0) {
            this.edgeRight = true
        }

        // King can only make one move in each side except for when on the edges, always within 0 and 63
        if (!this.edgeRight) {
            if (positionOld + 9 < 64) {
                possibleMoves.push(positionOld + 9)
            }
            if (positionOld - 7 >= 0) {
                possibleMoves.push(positionOld - 7)
            }
            if (positionOld + 1 < 64) {
                possibleMoves.push(positionOld + 1)
            }
        }
        if (!this.edgeLeft) {
            if (positionOld - 9 >= 0) {
                possibleMoves.push(positionOld - 9)
            }
            if (positionOld + 7 < 64) {
                possibleMoves.push(positionOld + 7)
            }
            if (positionOld - 1 >= 0) {
                possibleMoves.push(positionOld - 1)
            }
        }
        if (positionOld - 8 >= 0) {
            possibleMoves.push(positionOld - 8)
        }
        if (positionOld + 8 < 64) {
            possibleMoves.push(positionOld + 8)
        }
        return possibleMoves
    }
}