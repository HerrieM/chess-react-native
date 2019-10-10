export default class Pawn {

    // Get all possible moves
    posMoves = (board) => {
        this.edgeLeft = false
        this.edgeRight = false
        if (positionOld % 8 === 0) {
            this.edgeLeft = true
        } else if ((positionOld + 1) % 8 === 0) {
            this.edgeRight = true
        }
        if (color === 'b') {
            if (positionOld > 7 && positionOld < 16 && !isNaN(board[positionOld + 8]) && !isNaN(board[positionOld + 16])) {
                possibleMoves.push(positionOld + 16)
            }
            if (!isNaN(board[positionOld + 8])) {       // Possible hit
                possibleMoves.push(positionOld + 8)
            }
            if (isNaN(board[positionOld + 7]) && !this.edgeLeft) {
                possibleMoves.push(positionOld + 7)
            }
            if (isNaN(board[positionOld + 9]) && !this.edgeRight) {
                possibleMoves.push(positionOld + 9)
            }
            return possibleMoves
        } else if (color === 'w') {
            if (positionOld > 47 && positionOld < 56 && !isNaN(board[positionOld - 8]) && !isNaN(board[positionOld - 16])) {
                possibleMoves.push(positionOld - 16)
            }
            if (!isNaN(board[positionOld - 8])) {       // Possible hit
                possibleMoves.push(positionOld - 8)
            }
            if (isNaN(board[positionOld - 7]) && !this.edgeRight) {
                possibleMoves.push(positionOld - 7)
            }
            if (isNaN(board[positionOld - 9]) && !this.edgeLeft) {
                possibleMoves.push(positionOld - 9)
            }
            return possibleMoves
        }
    }
}