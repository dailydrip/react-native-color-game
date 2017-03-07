import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ScrollView,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Dimensions,
  Button,
  Alert,
  PermissionsAndroid,
  Platform } from 'react-native'

import { Actions } from './Redux/actions'
import Sound from 'react-native-sound'
import {AudioRecorder, AudioUtils} from 'react-native-audio'

// Styles
import Styles from './Styles/GameScreenStyle'

var width = Dimensions.get('window').width / 2
var height = Dimensions.get('window').height / 3

class GameScreen extends Component {

  constructor(props) {
    super(props);
    this.state = { recording: false }
    this.play = this.play.bind(this)
  }

  goBackScreen = () => {
    this.props.exitGame();
  }

  pressKey = (key, props) => {
    props.addColor(key)
  }

  async play (fileName) {
    if (this.state.recording) {
      await this.stop()
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      // var sound = new Sound(this.state.audioPath, '', (error) => {

      var initialPath = (Platform.OS === 'ios') ? AudioUtils.MainBundlePath : AudioUtils.DocumentDirectoryPath
      var sound = new Sound(initialPath + '/' + fileName, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error)
        }
      })

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing')
          } else {
            console.log('playback failed due to audio decoding errors')
          }
        })
      }, 100)
    }, 100)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.justPassed){
      console.log("You've unlocked a new Level! Playing the sound...")
      this.play(this.props.audioFileName)
    }
  }

  pressKey = (key, props) => {
    props.addColor(key)
  }

  render () {
    const props = this.props;
    return (
      <View style={Styles.container}>
        <View style={Styles.header}>
          <Text style={Styles.title}>Simon Game</Text>
        </View>
        <View style={Styles.row}>
          <TouchableHighlight onPress={() => this.pressKey('yellow', props)}>
            <View style={{backgroundColor: 'yellow', width: width, height: height}} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.pressKey('blue', props)}>
            <View style={{backgroundColor: 'blue', width: width, height: height}} />
          </TouchableHighlight>
        </View>

        <View style={Styles.row}>
          <TouchableHighlight onPress={() => this.pressKey('red', props)}>
            <View style={{backgroundColor: 'red', width: width, height: height}} />
          </TouchableHighlight>

          <TouchableHighlight onPress={() => this.pressKey('green', props)}>
            <View style={{backgroundColor: 'green', width: width, height: height}} />
          </TouchableHighlight>
        </View>

        <ScrollView>
          <Text>Phase: {this.props.phase}</Text>
          <Button onPress={()=> props.startGame()} title="START" />
        </ScrollView>
      </View>
    )
  }
}
// delayLongPress
// https://github.com/facebook/react-native/issues/4944

const mapStateToProps = (state) => {
  return {
    phase: state.phase.get('phaseLevel'),
    justPassed : state.phase.get('justPassed'),
    audioFileName: state.phase.get('audioFileName')
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addColor: (color) => dispatch(Actions.addColor(color)),
    startGame: () => dispatch(Actions.startGame())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameScreen)

