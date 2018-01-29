import React from 'react';
import { Constants, WebBrowser } from 'expo';
import qs from 'qs';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import Colors from '../constants/Colors'
import { authenticate } from '../api/nprAPI'

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    redirectData: null,
  };

  _handleRedirect = event => {
    console.log("_handleRedirect")

    WebBrowser.dismissBrowser();

    let query = event.url.replace(Constants.linkingUri, '');
    let data;
    if (query) {
      data = qs.parse(query);
    } else {
      data = null;
    }
    console.log("RedirectData: ", data)
    this.setState({ redirectData: data });
  };

  _openWebBrowserAsync = async () => {
    this._addLinkingListener();
    console.log("waiting on result for : ", `[${Constants.linkingUri}]`, `[${encodeURIComponent(Constants.linkingUri)}]`)

    let result = await WebBrowser.openBrowserAsync(`http://localhost:3000/auth?linkingUri=${encodeURIComponent(Constants.linkingUri)}`);
    console.log("Result is: ", result)
    this._removeLinkingListener();
    this.setState({ result });
  };

  _addLinkingListener = () => {
    console.log("_addLinkingListener")

    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };

  _maybeRenderRedirectData = () => {
    if (!this.state.redirectData) {
      return;
    }

    return <Text>{JSON.stringify(this.state.redirectData)}</Text>;
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={this._openWebBrowserAsync}>
          <Text style={styles.header} key="header" >Login</Text>

        </TouchableOpacity>
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
    color: "blue"
  }
});

export default LoginScreen
