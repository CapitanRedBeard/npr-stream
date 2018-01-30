import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ProgressViewIOS } from 'react-native';
import { Audio } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors'

export default class AudioControlBar extends React.Component {
  constructor(props) {
    super(props)
    this.soundObject = new Audio.Sound();
    this.soundObject.setOnPlaybackStatusUpdate(this._onPlaybackStatusUpdate)
    this.state = {
      progress: 0
    }
  }

  _onPlaybackStatusUpdate = ({didJustFinish, durationMillis, positionMillis}) => {
    if(didJustFinish) {
      this.props.onFinished()
    }
    if (this.refs.audioControlBar) {
      this.setState({progress: positionMillis / durationMillis})
    }
  }

  _playAudio = async ({links}) => {
    if( links && links.audio) {
      const audioFile = links.audio[0].href
      try {
        await this.soundObject.unloadAsync()
        await this.soundObject.loadAsync({ uri: audioFile });
        await this.soundObject.playAsync();
        this.setState({progress: 0})
      } catch (error) {
        console.log("Something went wrong", error)
      }
    }
  }

   _pauseAudio = async () => {
    try {
      await this.soundObject.pauseAsync()
    } catch (error) {
      console.log("Something went wrong with pausing", error)
    }
  }

  _resumeAudio = async () => {
    try {
      await this.soundObject.playAsync();
    } catch (error) {
      console.log("Something went wrong with resuming", error)
    }
  }

  componentWillMount() {
    const { audioFile } = this.props
    this._playAudio(this.props)
  }


  componentWillReceiveProps(nextProps) {
    const {attributes, isPlaying} = this.props
    if(!nextProps.isPlaying) {
      this._pauseAudio()
    }
    if(!isPlaying && nextProps.isPlaying) {
      this._resumeAudio()
    }
    if(nextProps.attributes && nextProps.attributes.uid !== this.props.attributes.uid) {
      this._playAudio(nextProps)
    }
  }

  render() {
    const {attributes, isPlaying, onSelect, height, onFinished} = this.props
    const {progress} = this.state

    return (
      <View ref="audioControlBar" style={[styles.container, {height}]}>
        <ProgressViewIOS
          progress={progress}
          progressTintColor={Colors.tintColor}
        />
        <View style={styles.infoWrapper}>
          <Text
            style={styles.title}
            numberOfLines={1}
            ellipsizeMode='tail'
          >{attributes.title}</Text>
          <TouchableOpacity
            key="PlayPauseContainer"
            style={styles.symbolContainer}
            onPress={onSelect}>
            {
              isPlaying ?
                <Ionicons
                  name="ios-pause-outline"
                  size={32}
                  style={styles.itemIcon}
                  color={Colors.tintColor}
                /> :
                <Ionicons
                  name="ios-play-outline"
                  size={32}
                  style={styles.itemIcon}
                  color={Colors.tintColor}
                />
            }
          </TouchableOpacity>
          <TouchableOpacity
            key="SkipContainer"
            style={styles.symbolContainer}
            onPress={onFinished}>
              <Ionicons
                name="ios-skip-forward-outline"
                size={32}
                style={styles.itemIcon}
                color={Colors.tintColor}
              />
          </TouchableOpacity>
        </View>
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
    flexDirection: "column",
    backgroundColor: Colors.backgroundColorSecondary,
  },
  infoWrapper: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
