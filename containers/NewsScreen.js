import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  FlatList
} from 'react-native';
import { connect } from "react-redux"

import AudioControlBar from '../components/AudioControlBar'
import NewsItem from '../components/NewsItem'
import Loader from '../components/Loader'
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

  state = {
    currentAudio: null
  }

  componentWillMount() {
    const { account: { token }, fetchRecommendations} = this.props
    fetchRecommendations(token)
  }

  selectAudioItem(item) {
    this.setState({currentAudio: item})
  }

  _renderListItem = ({item}) => {
    return (
      <NewsItem {...item} onSelect={() => this.selectAudioItem(item)}/>
    )
  }

  _keyExtractor = (item) => item.href;

  render() {
    const { news } = this.props
    const { currentAudio } = this.state

    return (
      <View style={styles.container}>
        
        {
          Boolean(news.length) ? <FlatList
            keyExtractor={this._keyExtractor}
            data={this.props.news}
            renderItem={this._renderListItem}
            initialNumToRender={20}
          /> : <Loader/>
        }
        {
          currentAudio && <AudioControlBar {...currentAudio}/>
        }
      </View>
    )
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
