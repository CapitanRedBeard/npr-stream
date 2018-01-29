import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';

import Colors from '../constants/Colors'

class NewsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    // headerTitle: 'News',
    // headerRight: (
    //   <Button
    //     title={'Logout'}
    //     onPress={() => setParams({ mode: isInfo ? 'none' : 'info' })}
    //   />
    // ),
    const {state: { params: { logout }}} = navigation
    return {
      title: 'News',
      headerRight: <Button title={"Logout"} onPress={() => {
        console.log("Hmmm? presed", navigation)
        // navigation.dispatch(logout)
        logout()

      }} />
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header} key="header" >List of News</Text>
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

export default NewsScreen
