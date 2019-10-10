import React from 'react'
import { View, Text } from 'react-native'

export default class Player extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            playerName: 'Marcel'
        }
    }

    render() {
        return (
            <View>
                <Text>{this.state.playerName}</Text>
            </View>
        )
    }
}