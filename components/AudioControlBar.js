import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Audio } from 'expo';

import Colors from '../constants/Colors'

export default class AudioControlBar extends React.Component {
  constructor(props) {
    super(props)
    this.soundObject = new Audio.Sound();
  }

  componentWillMount() {
    const { audioFile } = this.props
    try {
      await this.soundObject.loadAsync(require(audioFile));
      await this.soundObject.playAsync();
    } catch (error) {
      console.log("Something went wrong", error)
    }
  }

  render() {
      return (
        <View
          style={styles.container}
        >
          <Text>{title}</Text>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    height: 50,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Colors.backgroundColor,
  },
});
