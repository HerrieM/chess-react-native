export default class Rook {

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
        for (let i = 1; i < 8; i++) {
            if (positionOld - (i * 8) >= 0) {
                possibleMoves.push(positionOld - (i * 8))
                if (isNaN(board[positionOld - (i * 8)])) {
                    i = 7
                }
            }
        }
        for (let i = 1; i < 8; i++) {
            if (positionOld + (i * 8) < 64) {
                possibleMoves.push(positionOld + (i * 8))
                if (isNaN(board[positionOld + (i * 8)])) {
                    i = 7
                }
            }
        }

        if (!this.edgeLeft) {
            for (let i = 1; i < 8; i++) {
                if (positionOld - i >= 0) {
                    possibleMoves.push(positionOld - i)
                    if ((positionOld - i) % 8 === 0 || isNaN(board[positionOld - i])) {
                        i = 7
                    }
                }
            }
        }

        if (!this.edgeRight) {
            for (let i = 1; i < 8; i++) {
                if (positionOld + i < 64) {
                    possibleMoves.push(positionOld + i)
                    if ((positionOld + i + 1) % 8 === 0 || isNaN(board[positionOld + i])) {
                        i = 7
                    }
                }
            }
        }
        return possibleMoves
    }
}