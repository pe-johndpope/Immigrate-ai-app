// @ts-nocheck
import React, {Component} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';
import {Card, Title, Paragraph, Headline} from 'react-native-paper';
import HTML from 'react-native-htmlview';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import moment from 'moment';
import {withNavigationFocus} from 'react-navigation';
import NetInfo from '@react-native-community/netinfo';


const cacheKey = 'Bookmark';
class Bookmark extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookmark_post: [],
      isFetching: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.focusListener = navigation.addListener('focus', () => {
      this.fetchBookmark();
    });
  }

  async fetchBookmark() {
    this.setState({isFetching: true});
    let bookmark = await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res != null) {
        const result = res.map(post_id => {
          return 'include[]=' + post_id;
        });
        return result.join('&');
      } else {
        return null;
      }
    });

    try {
      const networkState = await NetInfo.fetch();

      if (!networkState.isConnected) {
        const _cachedData = await AsyncStorage.getItem(cacheKey);
        if (!_cachedData) {
          Alert.alert("You're currently offline and no local data was found.");
        }

        console.log('cachedData', _cachedData);
        const cachedData = JSON.parse(_cachedData);

        this.setState({
          bookmark_post: cachedData.bookmark_post,
          isFetching: false,
        });
        Alert.alert('your still read from cache');
      }
      const response = await fetch(
        `https://rasa.immigrate.ai/wp-json/wp/v2/posts?${bookmark}`,
      );
      const bookmark_post = await response.json();
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({
          bookmark_post,
        }),
      );
      this.setState({bookmark_post: bookmark_post, isFetching: false});
    } catch (error) {
      console.log('Bookmark error', error);
      return Promise.reject(error);
    }
  }

  render() {
    return (
      <View>
        <SafeAreaView>
        {this.state.isFetching ? (
          <View
            style={{
              paddingVertical: 20,
              borderTopWidth: 1,
              borderColor: '#CED0CE',
            }}>
            <ActivityIndicator animating size="large" />
          </View>
        ) : (
          <View>
            <Title style = {{paddingTop: 10, paddingHorizontal: 21, fontSize: 30, fontFamily: "Avenir Next", fontWeight: "700"}}>Favourites</Title>  
            <FlatList
              data={this.state.bookmark_post}
              renderItem={({item}) => (
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SinglePost', {
                      post_id: item.id,
                    })
                  }>
                  <Card
                    style={{
                      width: '90%',
                      borderRadius: 10,
                      alignSelf: 'center',
                      marginBottom: 10,
                    }}>
                    <Card.Cover
                      source={{uri: item.jetpack_featured_media_url}}
                    />
                    <Card.Content>
                      <Title numberOfLines={3} style = {{fontFamily: 'Avenir', paddingTop: 5,}}>{item.title.rendered.replace("&#8217;", "'").replace("&#8217;", "'")}</Title>
                      <Paragraph style = {{fontFamily: 'Avenir Next'}}>Published on {moment(item.date).fromNow()}</Paragraph>
                    </Card.Content>
                 
                    <Card.Content>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
            />
          </View>
        )}
        </SafeAreaView>
      </View>
    );
  }
}
export default Bookmark;
