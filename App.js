import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux'
import { connect } from "react-redux"

import LoginScreen from './containers/LoginScreen'
import NewsScreen from './containers/NewsScreen'
import configureStore from './configureStore'
import Colors from './constants/Colors'

const RootNavigationNotLoggedIn = StackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen,
    }
  }
);

const RootNavigationLoggedIn = StackNavigator(
  {
    NewsScreen: {
      screen: NewsScreen,
    }
  }
);

const RootNavigation = connect(
  ({account}) => ({
    signedIn: Boolean(account.token)
  }),
)(({signedIn = false}) => signedIn ? <RootNavigationLoggedIn /> : <RootNavigationNotLoggedIn />);

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
