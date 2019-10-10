import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text, TouchableOpacity } from 'react-native'
import Board from './src/board.js'
import Helper from './src/helper.js'

const styles = StyleSheet.create({
  main: {
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
    flex: 1
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: 50,
    width: '40%',
    borderRadius: 50
  }
})

export default class App extends React.Component {
  
  myHelper = new Helper()

  constructor(props) {
    super(props)
    this.state = {
      pieceSelected: false,
      isLoading: false,
      squareSelected: 'Please select a piece',
      player: 'White',
      gameStarted: false,
      computerPlayer: false,
      onePlayer: false,
      gameTypeSelected: false
    }
    this.setPiece = this.setPiece.bind(this)
    this.setPlayerTurn = this.setPlayerTurn.bind(this)
    this.resetGame = this.resetGame.bind(this)
  }

  // Display piece played
  setPiece(squareSelected, board, piece, human) {
    coordinate = this.myHelper.getCoordinates(squareSelected, board) // Get coordinates on board
    if (isNaN(squareSelected) && human === true) {
      this.setState({
        squareSelected: 'You have selected: ' + this.myHelper.checkNames(squareSelected),
        pieceSelected: true
      })
    } else if (piece != null) {
      this.setState({ squareSelected: this.myHelper.checkNames(piece) + ' moved to: ' + coordinate[0] + coordinate[1] })
      this.state.pieceSelected = false
    }
  }

  // Check players turn
  setPlayerTurn(moved) {
    if (moved) {
      if (this.state.player === 'White') {
        this.state.player = 'Black'
      } else {
        this.state.player = 'White'
      }
    }
  }

  // Reset all values when restart game is pressed
  resetGame = () => {
    this.setState({
      pieceSelected: false,
      isLoading: false,
      squareSelected: 'Please select a piece',
      player: 'White',
      gameStarted: false,
      computerPlayer: false,
      onePlayer: false,
      gameTypeSelected: false
    })
  }

  _onePlayer = () => {
    this.setState({ onePlayer: true, gameTypeSelected: true })
  }

  _playAs = (color) => {
    this.setState({ player: color, computerPlayer: true, gameStarted: true })
  }

  _twoPlayer = () => {
    this.setState({ computerPlayer: false, gameStarted: true, gameTypeSelected: true })
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" />
        </View>
      )
    } else if (!this.state.gameTypeSelected) {    // Show screen for 1 or 2 player selection
      return (
        <View style={[styles.main, { flexDirection: 'row' }]}>
          <TouchableOpacity
            onPress={this._onePlayer}
            style={[styles.button, { backgroundColor: 'blue' }]}>
            <Text style={{ color: 'white' }}>Human vs PC</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={this._twoPlayer}
            style={[styles.button, { backgroundColor: 'green' }]}>
            <Text style={{ color: 'white' }}>Human vs Human</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.onePlayer && !this.state.gameStarted) {   // Show screen for white or black as own color
      return (
        <View style={[styles.main, { flexDirection: 'row' }]}>
          <TouchableOpacity
            onPress={() => this._playAs('White')}
            style={[styles.button, { backgroundColor: 'white' }]}>
            <Text style={{ color: 'black' }}>Play as White</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this._playAs('Black')}
            style={[styles.button, { backgroundColor: 'black' }]}>
            <Text style={{ color: 'white' }}>Play as Black</Text>
          </TouchableOpacity>
        </View>
      )
    } else if (this.state.gameStarted) {    // Start game
      return (
        <View style={styles.main}>
          <View style={{ paddingTop: 100 }}>
            <Text>{this.state.squareSelected}</Text>
          </View>
          <Text>Players turn: {this.state.player}</Text>
          <Board
            computerPlayer={this.state.computerPlayer}
            setPiece={this.setPiece}
            setPlayerTurn={this.setPlayerTurn}
            player={this.state.player}
            resetGame={this.resetGame}>
          </Board>
        </View>
      )
    }
  }
}
