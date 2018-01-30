import React from 'react';
import { View, StyleSheet, Text, TouchableHighlight } from 'react-native';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';

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
    const {attributes, isPlaying, onSelect} = this.props
      return (
        <View style={styles.container}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode='tail'
          >{attributes.title}</Text>
          <TouchableHighlight
            key="IconContainer"
            style={styles.symbolContainer}
            onPress={onSelect}>
            {
              isPlaying ?
                <Ionicons
                  name="ios-pause-outline"
                  size={22}
                  style={styles.itemIcon}
                  color={Colors.tintColor}
                /> :
                <Ionicons
                  name="ios-play-outline"
                  size={22}
                  style={styles.itemIcon}
                  color={Colors.tintColor}
                />
            }
          </TouchableHighlight>
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColorSecondary,
  },
  title: {
    flex: 1,
    fontSize: 16,
    color: Colors.textValue,
    marginHorizontal: 10,
  },
  symbolContainer: {
    width: 50,
    marginHorizontal: 10,
    flex: 0,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
