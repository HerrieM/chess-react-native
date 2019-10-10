export default class Bishop {

    posMoves = (board) => {
        // Check for edge
        this.edgeLeft = false
        this.edgeRight = false
        if (positionOld % 8 === 0) {
            this.edgeLeft = true
        } else if ((positionOld + 1) % 8 === 0) {
            this.edgeRight = true
        }

        // Check all possible paths within 0 and 63
        if (!this.edgeLeft) {
            for (let i = 1; i < 8; i++) {
                if (positionOld - (i * 9) >= 0) {
                    possibleMoves.push(positionOld - (i * 9))
                    if ((positionOld - (i * 9)) % 8 === 0 || isNaN(board[positionOld - (i * 9)])) {
                        i = 8
                    }
                }
            }
            for (let i = 1; i < 8; i++) {
                if (positionOld + (i * 7) < 64) {
                    possibleMoves.push(positionOld + (i * 7))
                    if ((positionOld + (i * 7)) % 8 === 0 || isNaN(board[positionOld + (i * 7)])) {
                        i = 8
                    }
                }
            }
        }

        if (!this.edgeRight) {
            for (let i = 1; i < 8; i++) {
                if (positionOld + (i * 9) < 64) {
                    possibleMoves.push(positionOld + (i * 9))
                    if ((positionOld + (i * 9) + 1) % 8 === 0 || isNaN(board[positionOld + (i * 9)])) {
                        i = 8
                    }
                }
            }
            for (let i = 1; i < 8; i++) {
                if (positionOld - (i * 7) >= 0) {
                    possibleMoves.push(positionOld - (i * 7))
                    if ((positionOld - (i * 7) + 1) % 8 === 0 || isNaN(board[positionOld - (i * 7)])) {
                        i = 8
                    }
                }
            }
        }
        return possibleMoves
    }
}