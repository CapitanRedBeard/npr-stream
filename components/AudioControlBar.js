import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo';

import Colors from '../constants/Colors'

export default class AudioControlBar extends React.Component {
  constructor(props) {
    super(props)
    this.soundObject = new Audio.Sound();
  }

  async _playAudio({links}) {
    if( links && links.audio) {
      const audioFile = links.audio[0].href
      try {
        await this.soundObject.unloadAsync()
        await this.soundObject.loadAsync({ uri: audioFile });
        await this.soundObject.playAsync();
      } catch (error) {
        console.log("Something went wrong", error)
      }
    }
  }

  async _pauseAudio() {
    try {
      await this.soundObject.pauseAsync()
    } catch (error) {
      console.log("Something went wrong with pausing", error)
    }
  }

  componentWillMount() {
    const { audioFile } = this.props
    this._playAudio(this.props)
  }


  componentWillReceiveProps(nextProps) {
    if(!nextProps.isPlaying) {
      this._pauseAudio()
    }
    if(nextProps.attributes && nextProps.attributes.uid !== this.props.attributes.uid) {
      this._playAudio(nextProps)
    }
  }

  render() {
    const {attributes} = this.props
      return (
        <View style={styles.container}>
          <Text style={styles.title}>{attributes.title}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    flexDirection: "row",
    height: 70,
    borderWidth: 1,
    borderColor: "red",
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Colors.backgroundColor,
  },
  title: {
    fontSize: 16,
    color: Colors.textValue
  }
});
