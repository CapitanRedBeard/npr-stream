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
import { connect } from "react-redux"

import { storeToken } from '../actions/account'
import Colors from '../constants/Colors'
import { authenticate } from '../api/nprAPI'

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  _handleRedirect = event => {
    WebBrowser.dismissBrowser();
    const query = event.url.replace(Constants.linkingUri, '');
    const data = query ? qs.parse(query) : null;
    if(data && data.token) {
      this.props.storeToken(data.token)
    }
  };

  _openWebBrowserAsync = async () => {
    this._addLinkingListener();
    const result = await WebBrowser.openBrowserAsync(`http://localhost:3000/auth?linkingUri=${encodeURIComponent(Constants.linkingUri)}`);
    this._removeLinkingListener();
  };

  _addLinkingListener = () => {
    Linking.addEventListener('url', this._handleRedirect);
  };

  _removeLinkingListener = () => {
    Linking.removeEventListener('url', this._handleRedirect);
  };

  render() {
    const { account } = this.props

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

export default connect(
  ({account}) => ({
    account
  }),
  {
    storeToken
  }
)(LoginScreen)
