import React from 'react'
import { StyleSheet, FlatList, TouchableOpacity, View, Button } from 'react-native'
import Helper from './helper'
import Moves from './pieces/moves';

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1
    },
    square: {
        alignItems: 'center',
        height: 50,
        width: 50,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderTopWidth: 1,
        borderLeftWidth: 1,
        flexGrow: 1
    }
})

export default class Board extends React.Component {
    
    myHelper = new Helper()
    moves = new Moves()
    moves2 = new Moves()

    // Set states needed to update and maintain board
    constructor(props) {
        super(props)
        this.state = {
            board: new Array(64),
            gameInitialised: false,
            spotSelected: null,
            moved: false,
            substitute: 65,
            possibleMoves: [],
            pieceSelected: null,
            player: props.player,
            blackPieces: ['bP1', 'bP2', 'bP3', 'bP4', 'bP5', 'bP6', 'bP7', 'bP8', 'bR1', 'bR2', 'bN1', 'bN2', 'bB1', 'bB2', 'bQ', 'bK'],
            whitePieces: ['wP1', 'wP2', 'wP3', 'wP4', 'wP5', 'wP6', 'wP7', 'wP8', 'wR1', 'wR2', 'wN1', 'wN2', 'wB1', 'wB2', 'wQ', 'wK'],
            checkMate: false,
            playerIsCheck: false
        }
    }

    // Function to be called when game starts -> gameInitialised makes sure it's only set when a new game is started
    createBoard = () => {
        let startPositionOuterRows = new Array(8)
        startPositionOuterRows = ['R1', 'N1', 'B1', 'Q', 'K', 'B2', 'N2', 'R2']

        for (let i = 0; i < 64; i++) {
            if (i < 8) {
                this.state.board[i] = 'b' + startPositionOuterRows[i]
            } else if (i > 7 && i < 16) {
                this.state.board[i] = 'bP' + (i - 7)
            } else if (i > 47 && i < 56) {
                this.state.board[i] = 'wP' + (i - 47)
            } else if (i > 55) {
                this.state.board[i] = 'w' + startPositionOuterRows[i - 56]
            } else {
                this.state.board[i] = i
            }
        }
        this.state.gameInitialised = true
    }
    
    // Add images to the view
    addImages(item) {
        return this.myHelper.addImages(item)
    }

    // Function is called after every move to update the board state
    updateBoard = () => {
        this.square = 0     // Set square and row on 0 everytime a board is rebuild, to not overload memory with huge arrays
        this.row = 0
        this.positionOld = this.state.board.indexOf(this.state.pieceSelected)
        this.positionNew = this.state.board.indexOf(this.state.spotSelected)

        if (!isNaN(this.state.spotSelected)) {
            this.state.board[this.positionOld] = this.state.spotSelected
            this.state.board[this.positionNew] = this.state.pieceSelected
            this.state.moved = true

        } else if (isNaN(this.state.spotSelected)) {
            this.state.board[this.positionOld] = this.state.substitute       // If legal hit, update square with unique integer
            this.state.board[this.positionNew] = this.state.pieceSelected
            this.state.moved = true
            this.state.substitute++
            if (this.state.pieceSelected[0] === this.props.player[0].toLowerCase()) {
                if (this.props.player[0].toLowerCase() === 'w') {
                    toBeRemoved = this.state.blackPieces.indexOf(this.state.spotSelected)
                    this.state.blackPieces.splice(toBeRemoved, 1)       // Remove piece from array of available pieces
                } else {
                    toBeRemoved = this.state.whitePieces.indexOf(this.state.spotSelected)
                    this.state.whitePieces.splice(toBeRemoved, 1)       // Remove piece from array of available pieces
                }
            }
        }

        if (this.state.moved) {     // Set color and reset pieces after move
            { this.props.setPlayerTurn(this.state.moved) }       // Update player name in main screen
            this.state.moved = false
            if (this.state.player === 'White') {
                this.state.player = 'Black'
            } else {
                this.state.player = 'White'
            }
            this.setState({ board: this.state.board })
            // if (this.checkMate(this.state.board)) {       // Check for check or check mate situation (Moved to moves.js)
            //     if (!this.allSaveMoves(ownPieces)) {
            //         this.state.checkMate = true
            //         alert('Game Over!')
            //     } else {
            //         this.state.playerIsCheck = true
            //         alert(this.state.player + ' is check')
            //     }
            // }
            this.state.pieceSelected = null
            this.state.spotSelected = null
        }
        this.state.possibleMoves = []
        if (this.props.computerPlayer) {
            if (this.state.player != this.props.player) {
                this.computerMove()
            }
        }
    }

    // Automate move for PC
    computerMove = () => {
        if (this.state.player === 'Black') {
            piecesUsed = this.state.blackPieces
        } else {
            piecesUsed = this.state.whitePieces
        }
        randomPiece = piecesUsed[Math.floor(Math.random() * piecesUsed.length)]
        randomMoveArray = this.moves.possibilities(this.state.board, randomPiece)        // Get all possible moves of piece
        randomMove = randomMoveArray[Math.floor(Math.random() * randomMoveArray.length)]        // Pick one move from array of possible moves
        validateRandomMove = this.moves.validateMove(this.state.board, this.state.board[randomMove], randomPiece, this.state.player)     // Validate this move
        if (validateRandomMove) {        // Check if move is valid
            this.state.spotSelected = this.state.board[randomMove]
            this.state.pieceSelected = randomPiece
            { { this.props.setPiece(this.state.board[randomMove], this.state.board, randomPiece) } }
            this.updateBoard()
        } else {        // If false, restart function
            this.computerMove()
        }
    }

    // // Check for check mate
    // checkMate = (tempBoard) => {        // FIX ME function is not returning valid checkmate (moved to moves.js)
    //     if (this.state.player === 'White') {        // Set which player to check for
    //         checkFor = this.state.blackPieces
    //         ownPieces = this.state.whitePieces
    //     } else {
    //         checkFor = this.state.whitePieces
    //         ownPieces = this.state.blackPieces
    //     }
    //     for (let i = 0; i < checkFor.length; i++) {     // Check if any piece can hit the opposite King
    //         this.state.possibleMoves = this.moves.possibilities(tempBoard, checkFor[i])
    //         if (this.state.possibleMoves.includes(tempBoard.indexOf(this.state.player[0].toLowerCase() + 'K'))) {        // If true, check if King can be saved
    //             return (
    //                 true,
    //                 ownPieces
    //             )
    //         }
    //         this.state.possibleMoves = []
    //     }
    // }

    allSaveMoves = (ownPieces) => {
        a = 0
        temp = new Array()
        checks = new Array()
        boardBackup = new Array()
        for (let j = 0; j < ownPieces.length; j++) {        // Check for all possible moves with own pieces
            possibleSave = this.moves2.possibilities(this.state.board, ownPieces[j])
            for (let l = 0; l < 63; l++) {
                boardBackup[l] = this.state.board[l]
            }
            for (let k = 0; k < possibleSave.length; k++) {
                if (this.moves2.validateMove(boardBackup, boardBackup[possibleSave[k]], ownPieces[j], this.state.player)) {      // If move is valid, verify if King is save
                    this.positionOld = boardBackup.indexOf(ownPieces[j])
                    this.positionNew = boardBackup.indexOf(boardBackup[possibleSave[k]])
                    if (!isNaN(boardBackup[possibleSave[k]])) {
                        boardBackup[this.positionOld] = possibleSave[k]
                        boardBackup[this.positionNew] = ownPieces[j]
                    } else if (isNaN(boardBackup[possibleSave[k]])) {
                        boardBackup[this.positionOld] = this.state.substitute
                        boardBackup[this.positionNew] = ownPieces[j]
                    }
                    if (this.checkMate(boardBackup)) {      // Fill array with true or false for check
                        checks.push(true)
                    } else {
                        checks.push(false)
                        temp[a] = new Array()
                        for (let q = 0; q < 64; q++) {
                            temp[a][q] = boardBackup[q]
                        }
                        a++
                    }
                }
            }
        }
        if (checks.includes(false)) {       // If false is in array, there are save options
            return (
                true,
                temp
            )
        }
    }

    // Funcion remembers and compares the spot selected and the piece selected
    _onPressSquare = (item) => {
        if (!this.state.checkMate) {
            this.state.spotSelected = item
            { this.props.setPiece(item, this.state.board, this.state.pieceSelected, true) }
            if (!this.state.pieceSelected) {
                if (isNaN(item)) {
                    this.setState({ pieceSelected: item, possibleMoves: this.moves.possibilities(this.state.board, this.state.spotSelected) })
                }
            } else if (this.state.pieceSelected) {
                if (this.state.pieceSelected === this.state.spotSelected) {     // Reset square when double clicked
                    this.setState({ pieceSelected: null, possibleMoves: [] })
                } else if (this.moves.validateMove(this.state.board, this.state.spotSelected, this.state.pieceSelected, this.props.player)) {
                    this.updateBoard()
                } else {
                    console.log('Invalid move')
                    this.setState({ pieceSelected: null, possibleMoves: [], spotSelected: null })
                }
            }
        }
    }

    square = 0
    row = 0
    count = 0
    // FlatList is rendered with touchable squares with If-Else to render chessboard pattern
    _renderItem = ({ item }) => {
        if ((this.square) % 8 === 0) {
            this.row++
        }
        if (item === this.state.pieceSelected) {        // Highlight selected piece
            this.color = 'orange'
        } else if (this.state.possibleMoves.includes(this.count) && item[0] != this.state.pieceSelected[0]) {       // Highlight all possible steps
            if (isNaN(item)) {
                this.color = 'red'      // Highlight possible hits
            } else {
                this.color = 'yellow'       // Highlight possible steps
            }
        } else if (this.square % 2 === 0 && this.row % 2 === 0 || this.row % 2 != 0 && this.square % 2 != 0) {
            this.color = 'grey'
        } else {
            this.color = 'white'
        }
        this.square++
        this.count++
        return (
            <TouchableOpacity
                style={[styles.square, { justifyContent: 'center', backgroundColor: this.color }]}
                onPress={() => this._onPressSquare(item)}>
                {this.addImages(item)}
            </TouchableOpacity>
        )
    }

    componentDidMount() {
        if (this.props.player === 'Black') {
            this.state.player = 'White'
            { this.props.setPlayerTurn(true) }
            this.computerMove()
        }
    }

    // Board creation and rendering
    render() {
        this.count = 0      // Set count to 0 to rerender board
        if (!this.state.gameInitialised) {
            this.createBoard()
        }
        return (
            <View style={[styles.container, { paddingBottom: 100 }]}>
                <FlatList
                    contentContainerStyle={styles.container}
                    numColumns={8}
                    extraData={this.state}
                    data={this.state.board}
                    keyExtractor={(index) => index.toString()}
                    renderItem={this._renderItem}
                />
                <Button
                    onPress={this.props.resetGame}
                    title="Restart Game"
                />
            </View>
        )
    }
}