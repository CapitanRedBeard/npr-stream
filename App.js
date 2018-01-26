import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'

import LoginScreen from './containers/LoginScreen'
import NewsScreen from './containers/NewsScreen'
import configureStore from './configureStore'
import Colors from './constants/Colors'

const RootNavigation = StackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    },
    NewsScreen: {
      screen: NewsScreen,
    }
  }
);

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Provider store={configureStore()}>
          <RootNavigation />
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColor,
  },
});
