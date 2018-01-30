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

const CONTROLLER_HEIGHT = 70

class NewsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const {state: { params: { logout }}} = navigation
    return {
      title: 'News',
      headerRight: <Button title={"Logout"} onPress={logout} color={Colors.tintColor}/>
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

  selectAudioItem = (item) =>{
    const { currentAudio, isPlaying } = this.state
    if(currentAudio && currentAudio.attributes.uid === item.attributes.uid) {
      this.setState({isPlaying: !isPlaying})
    }else {
      this.setState({currentAudio: item, isPlaying: true})
    }
  }

  onFinished = () => {
    const { news } = this.props
    const { currentAudio } = this.state

    currentAudioIndex = news.findIndex(item => item.attributes.uid === currentAudio.attributes.uid)
    if(currentAudioIndex !== -1)  {
      this.selectAudioItem(news[(currentAudioIndex + 1)% news.length])
    }
  }

  _renderListItem = ({item}) => {
    const { currentAudio, isPlaying } = this.state
    const currentlyPlaying = Boolean(isPlaying && item.attributes.uid === currentAudio.attributes.uid)

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
    const containerStyles = Boolean(currentAudio) ? [styles.container, {paddingBottom: CONTROLLER_HEIGHT}] : styles.container

    return (
      <View style={containerStyles}>

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
              onFinished={this.onFinished}
              height={CONTROLLER_HEIGHT}
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
    backgroundColor: Colors.backgroundColor
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
