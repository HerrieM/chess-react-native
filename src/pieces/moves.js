import React from 'React'
import Pawn from './pawn.js'
import Knight from './knight.js'
import King from './king.js'
import Rook from './rook.js'
import Bishop from './bishop.js'

export default class Moves extends React.Component {

    pawn = new Pawn()
    knight = new Knight()
    king = new King()
    rook = new Rook()
    bishop = new Bishop()

    constructor(props) {
        super(props)
        possibleMoves = new Array()
    }

    // Check for all possible moves
    possibilities(board, pieceSelected) {
        positionOld = board.indexOf(pieceSelected)
        color = pieceSelected[0]
        possibleMoves = []
        switch (pieceSelected[1]) {
            case 'P':
                this.pawn.posMoves(board)
                break
            case 'N':
                this.knight.posMoves()
                break
            case 'K':
                this.king.posMoves()
                break
            case 'R':
                this.rook.posMoves(board)
                break
            case 'B':
                this.bishop.posMoves(board)
                break
            case 'Q':
                this.bishop.posMoves(board)
                this.rook.posMoves(board)
                break
        }
        return possibleMoves
    }
    
    // Validate move for the selected piece
    validateMove(board, spotSelected, pieceSelected, player) {
        if (player[0] === pieceSelected[0].toUpperCase()) {        // Validate if it's the players turn
            if (possibleMoves.includes(board.indexOf(spotSelected)) && spotSelected != undefined) {      // Validate if legal move
                if (!isNaN(spotSelected)) {
                    if (!this.checkMate(board, player)) {
                        return true
                    }
                } else if (isNaN(spotSelected)) {    // Checks for an illegal hit
                    if (spotSelected[0] != pieceSelected[0]) {
                        if (!this.checkMate(board, player)) {
                            return true
                        }
                    }
                }
            }
        }
    }

    // Check for check mate
    checkMate = (tempBoard, player) => {        // FIX ME function is not returning valid checkmate (crashes)
        console.log('checkmate check reached for player: ' + player)
        if (player === 'White') {        // Set which player to check for
            checkFor = ['bP1', 'bP2', 'bP3', 'bP4', 'bP5', 'bP6', 'bP7', 'bP8', 'bR1', 'bR2', 'bN1', 'bN2', 'bB1', 'bB2', 'bQ', 'bK']
            ownPieces = ['wP1', 'wP2', 'wP3', 'wP4', 'wP5', 'wP6', 'wP7', 'wP8', 'wR1', 'wR2', 'wN1', 'wN2', 'wB1', 'wB2', 'wQ', 'wK']
        } else {
            checkFor = ['wP1', 'wP2', 'wP3', 'wP4', 'wP5', 'wP6', 'wP7', 'wP8', 'wR1', 'wR2', 'wN1', 'wN2', 'wB1', 'wB2', 'wQ', 'wK']
            ownPieces = ['bP1', 'bP2', 'bP3', 'bP4', 'bP5', 'bP6', 'bP7', 'bP8', 'bR1', 'bR2', 'bN1', 'bN2', 'bB1', 'bB2', 'bQ', 'bK']
        }
        for (let i = 0; i < checkFor.length; i++) {     // Check if any piece can hit the opposite King
            possibleMoves = this.possibilities(tempBoard, checkFor[i])
            if (possibleMoves.includes(tempBoard.indexOf(player[0].toLowerCase() + 'K'))) {        // If true, check if King can be saved
                return true
            }
            possibleMoves = []
        }
    }
}
