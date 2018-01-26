import React from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

import Colors from '../constants/Colors'

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header} key="header" >Login</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: Colors.backgroundColor,
  },
  header: {
    padding: 10,
    marginTop: 30,
    fontSize: 24,
    fontWeight: "600",
  }
});

export default LoginScreen
