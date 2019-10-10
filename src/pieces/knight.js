export default class Knight {

    posMoves = () => {
        // Check for edges and columns next to it
        this.edgeLeft = false
        this.edgeRight = false
        this.leftPlus = false
        this.rightMinus = false
        if (positionOld % 8 === 0) {
            this.edgeLeft = true
        } else if ((positionOld + 1) % 8 === 0) {
            this.edgeRight = true
        } else if ((positionOld - 1) % 8 === 0) {
            this.leftPlus = true
        } else if ((positionOld + 2) % 8 === 0) {
            this.rightMinus = true
        }

        // Check all moves with edge restricion and within 0 and 63
        if (!this.edgeRight) {
            if (positionOld + 17 < 64) {
                possibleMoves.push(positionOld + 17)
            }
            if (positionOld - 15 >= 0) {
                possibleMoves.push(positionOld - 15)
            }
        }
        if (!this.edgeLeft) {
            if (positionOld - 17 >= 0) {
                possibleMoves.push(positionOld - 17)
            }
            if (positionOld + 15 < 64) {
                possibleMoves.push(positionOld + 15)
            }
        }
        if (!this.rightMinus && !this.edgeRight) {
            if (positionOld + 10 < 64) {
                possibleMoves.push(positionOld + 10)
            }
            if (positionOld - 6 >= 0) {
                possibleMoves.push(positionOld - 6)
            }
        }
        if (!this.leftPlus && !this.edgeLeft) {
            if (positionOld - 10 >= 0) {
                possibleMoves.push(positionOld - 10)
            }
            if (positionOld + 6 < 64) {
                possibleMoves.push(positionOld + 6)
            }
        }
        return possibleMoves
    }
}