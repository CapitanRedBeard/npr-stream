import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Provider, connect } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'

import LoginScreen from './containers/LoginScreen'
import NewsScreen from './containers/NewsScreen'
import configureStore from './configureStore'
import Colors from './constants/Colors'
import Loader from './components/Loader'
import { ActionTypes } from "./constants/Types"

let { store, persistor } = configureStore()

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
  },
  {
    initialRouteParams: {
      logout: () => { store.dispatch({type: ActionTypes.RESET}) }
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
        <Provider store={store}>
          <PersistGate loading={Loader} persistor={persistor}>
            <RootNavigation />
          </PersistGate>
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
