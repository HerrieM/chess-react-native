import React from 'react'
import { Image } from 'react-native'

export default class Helper {

    // Add Images to the board
    addImages = (item) => {
        switch (item) {
            case 'wK':
                return <Image source={require('./pieces/img/wK.png')} />
            case 'bK':
                return <Image source={require('./pieces/img/bK.png')} />
            case 'wQ':
                return <Image source={require('./pieces/img/wQ.png')} />
            case 'bQ':
                return <Image source={require('./pieces/img/bQ.png')} />
            case 'wB1': case 'wB2':
                return <Image source={require('./pieces/img/wB.png')} />
            case 'bB1': case 'bB2':
                return <Image source={require('./pieces/img/bB.png')} />
            case 'wR1': case 'wR2':
                return <Image source={require('./pieces/img/wR.png')} />
            case 'bR1': case 'bR2':
                return <Image source={require('./pieces/img/bR.png')} />
            case 'wN1': case 'wN2':
                return <Image source={require('./pieces/img/wN.png')} />
            case 'bN1': case 'bN2':
                return <Image source={require('./pieces/img/bN.png')} />
            case 'wP1': case 'wP2': case 'wP3': case 'wP4': case 'wP5': case 'wP6': case 'wP7': case 'wP8':
                return <Image source={require('./pieces/img/wP.png')} />
            case 'bP1': case 'bP2': case 'bP3': case 'bP4': case 'bP5': case 'bP6': case 'bP7': case 'bP8':
                return <Image source={require('./pieces/img/bP.png')} />
        }
    }

    // Show piece names in app
    checkNames = (item) => {
        this.pieceColor = ''
        if (item[0] === 'w') {
            this.pieceColor = ('White')
        } else {
            this.pieceColor = ('Black')
        }
        switch (item[1]) {
            case 'K':
                return this.pieceColor + ' King'
            case 'Q':
                return this.pieceColor + ' Queen'
            case 'B':
                return this.pieceColor + ' Bishop'
            case 'R':
                return this.pieceColor + ' Rook'
            case 'N':
                return this.pieceColor + ' Knight'
            case 'P':
                return this.pieceColor + ' Pawn'
        }
    }

    // Make a two dimensional array to get coordinates
    getCoordinates = (piece, board) => {
        twoDimArray = new Array(8)
        let arrayFiller = 0
        for (let y = 0; y < 8; y++) {
            twoDimArray[y] = new Array(8)
            for (let x = 0; x < 8; x++) {
                twoDimArray[y][x] = board[arrayFiller]
                if (board[arrayFiller] === piece) {
                    switch (y) {
                        case 7:
                            y = 1
                            break
                        case 6:
                            y = 2
                            break
                        case 5:
                            y = 3
                            break
                        case 3:
                            y = 5
                            break
                        case 2:
                            y = 6
                            break
                        case 1:
                            y = 7
                            break
                        case 0:
                            y = 8
                            break
                    }
                    switch (x) {
                        case 0:
                            x = 'A'
                            break
                        case 1:
                            x = 'B'
                            break
                        case 2:
                            x = 'C'
                            break
                        case 3:
                            x = 'D'
                            break
                        case 4:
                            x = 'E'
                            break
                        case 5:
                            x = 'F'
                            break
                        case 6:
                            x = 'G'
                            break
                        case 7:
                            x = 'H'
                            break
                    }
                    return (
                        [x, y]
                    )
                }
                arrayFiller++
            }
        }
    }
}