import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button
} from 'react-native';
import { connect } from "react-redux"

import Colors from '../constants/Colors'
import { fetchRecommendations } from '../actions/news'

class NewsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state: { params: { logout }}} = navigation
    return {
      title: 'News',
      headerRight: <Button title={"Logout"} onPress={logout} />
    }
  };

  componentWillMount() {
    const { account: { token }, fetchRecommendations} = this.props
    fetchRecommendations(token)
  }

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


export default connect(
  ({account, news}) => ({
    account,
    news
  }),
  {
    fetchRecommendations
  }
)(NewsScreen)
