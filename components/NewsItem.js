import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image
} from 'react-native';
import { connect } from "react-redux"
import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors'
import { Months } from '../constants/Types'

export default function Loader({attributes, links, onSelect}) {
  const itemDate = new Date(attributes.date)
  const imageSrc = links.image && links.image[0] && links.image[0].href

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => onSelect()}>
      <View style={styles.wrapper}>
        <View key="NameContainer" style={styles.detailsContainer}>
          <Text style={styles.title}>
            {attributes.title}
          </Text>
          <Text style={styles.subtitle}>
            {attributes.provider}
          </Text>
          <Text style={styles.duration}>
            {`${Math.floor(attributes.duration/60)}:${attributes.duration%60}`}
          </Text>
          <Text style={styles.date}>
            {`${Months[itemDate.getMonth()]} ${itemDate.getDate()}, ${itemDate.getFullYear()}`}
          </Text>
        </View>
        <View key="IconContainer" style={styles.symbolContainer}>
          <Ionicons
            name="ios-play-outline"
            size={48}
            style={styles.itemIcon}
            color={Colors.tintColor}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Colors.backgroundColor,
    borderBottomWidth: 2,
    borderColor: Colors.backgroundColorSecondary
  },
  wrapper: {
    flex: 1,
    flexDirection: "row",
    padding: 10
  },
  detailsContainer: {
    flex: 1,
  },
  symbolContainer: {
    flex: 0,
    flexShrink: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: Colors.textValue
  },
  subtitle: {
    fontSize: 14,
    color: Colors.textValueSecondary
  },
  duration: {
    fontSize: 18,
    color: Colors.textValue
  },
  date: {
    fontSize: 18,
    color: Colors.textValue
  }
});
