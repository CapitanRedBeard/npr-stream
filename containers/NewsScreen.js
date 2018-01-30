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
    currentAudio: null,
    isPlaying: false
  }

  componentWillMount() {
    const { account: { token }, fetchRecommendations} = this.props
    fetchRecommendations(token)
  }

  selectAudioItem(item) {
    const { currentAudio, isPlaying } = this.state
    if(currentAudio && currentAudio.attributes.uid === item.attributes.uid) {
      this.setState({isPlaying: !isPlaying})
      console.log("Pause/Play")
    }else {
      this.setState({currentAudio: item, isPlaying: true})
      console.log("New Audio")
    }
  }

  _renderListItem = ({item}) => {
    const { currentAudio, isPlaying } = this.state
    const currentlyPlaying = Boolean(isPlaying && item.attributes.uid === currentAudio.attributes.uid)
    console.log("Is Playing: ", currentlyPlaying, currentAudio && currentAudio.attributes.uid, item.attributes.uid)
    return (
      <NewsItem
        {...item}
        onSelect={() => this.selectAudioItem(item)}
        isPlaying={currentlyPlaying} />
    )
  }

  _keyExtractor = (item) => item.href;

  render() {
    const { news } = this.props
    const { currentAudio, isPlaying } = this.state
    const playingAudio = isPlaying ? currentAudio.attributes.uid : null
    console.log("State: ", Boolean(currentAudio))

    return (
      <View style={styles.container}>

        {
          Boolean(news.length) ? <FlatList
            keyExtractor={this._keyExtractor}
            extraData={playingAudio}
            data={this.props.news}
            renderItem={this._renderListItem}
            initialNumToRender={20}
          /> : <Loader/>
        }
        {
          Boolean(currentAudio) &&
            <AudioControlBar
              {...currentAudio}
              isPlaying={isPlaying}
              onSelect={() => this.selectAudioItem(currentAudio)}
            />
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
