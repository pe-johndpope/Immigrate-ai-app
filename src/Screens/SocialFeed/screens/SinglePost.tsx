// @ts-nocheck
import React, {Component} from 'react';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  List,
  withTheme,
} from 'react-native-paper';
import {
  View,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  TouchableOpacity,
  Share,
  Text,
  StyleSheet,
  Alert,
  ImageBackground,
} from 'react-native';
import HTML from 'react-native-htmlview';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import moment from 'moment';
import NetInfo from '@react-native-community/netinfo';
import Icon from "react-native-vector-icons/Ionicons";
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { theme } from '../../../components/theme';
import { NavigationContainer } from '@react-navigation/native';
const cacheKey = 'CacheData';
const { width, height } = Dimensions.get("window");
class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: true,
      offline: false,
      post: [],
      bookmark: false,
    };
  }
  componentDidMount() {
    this.fetchPost().then(()=>{
       this.renderBookMark(this.props.route.params.post_id);
    });
  }

  saveBookMark = async post_id => {
    this.setState({bookmark: true});
    await AsyncStorage.getItem('bookmark').then(token => {
      const res = JSON.parse(token);
      if (res !== null) {
        let data = res.find(value => value === post_id);
        if (data == null) {
          res.push(post_id);
          AsyncStorage.setItem('bookmark', JSON.stringify(res));
        }
      } else {
        let bookmark = [];
        bookmark.push(post_id);
         AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
      }
    });
  };

    renderBookMark = async post_id => {
      await AsyncStorage.getItem('bookmark').then(token => {
          const res = JSON.parse(token);
          let data = res.find(value => value === post_id);
          if (data !== null) {
              let data = res.find(value => value === post_id);
              return data == null
                  ? this.setState({ bookmark: false })
                  : this.setState({ bookmark: true });
          }
      });
  };

  removeBookMark = async post_id => {
    this.setState({ bookmark: false });
    const bookmark = await AsyncStorage.getItem('bookmark').then(token => {
        const res = JSON.parse(token);
        return res.filter(e => e !== post_id);
    });
    await AsyncStorage.setItem('bookmark', JSON.stringify(bookmark));
};

  async fetchPost() {
    this.setState({isloading: true});
    let post_id = this.props.route.params.post_id;
    try {
      const networkState = await NetInfo.fetch();

      if (!networkState.isConnected) {
        const _cachedData = await AsyncStorage.getItem(cacheKey);
        if (!_cachedData) {
          alert(
            "You're currently offline and no local data was found.",
          );
        }
        const cachedData = JSON.parse(_cachedData);

        let post = cachedData.post.filter(value => value.id === post_id);

        this.setState({
          post: post,
          isloading: false,
          offline: true,
        });
        Alert.alert('You still read from cache')
      }

      const response = await fetch(
        `https://rasa.immigrate.ai/wp-json/wp/v2/posts?_embed&include=${post_id}`,
      );
      const post = await response.json();
      this.setState({
        post: post,
        isloading: false,
      });
    } catch (error) {
      console.log('got error', error);
      return Promise.reject(error);
    }
  }
  onShare = async (title, uri) => {
    console.log(uri);
    Share.share({
      title: title,
      url: uri,
    });
  };


  render() {
    let post = this.state.post;
    const postImage = {}
    const AuthorName = {}
    const datePosted = {}
    const articleContent = {}
    const authorUserImage = {}
    return (
      <ScrollView>
        {this.state.isloading ? (
          <View
            style={{
              paddingVertical: 50,
              borderTopWidth: 1,
            }}>
            <ActivityIndicator animating size="large" />
          </View>
        ) : (
          
          <View>
             <StatusBar style="light" />
            <ImageBackground style = {styles.blogImageStyle} 
            source = {{uri: post[0].jetpack_featured_media_url}}>
              <View style = {styles.innerView}>
                <View style = {{flex: 1, flexDirection: 'column-reverse'}}>
                <List.Item
                right={props => {
                  if (this.state.bookmark == false) {
                    return (
                      <View style = {{flexDirection: 'row',justifyContent: 'center',}}>
                         <TouchableOpacity
                        onPress={() => this.saveBookMark(post[0].id)}>
                         <Icon style = {{paddingHorizontal: '1%', paddingVertical: '1%'}}
                          name="heart-outline" size={30} color="#ffffff"/>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() =>
                        this.onShare(post[0].title.rendered, post[0].link)
                      }>
                     <Icon style = {{paddingHorizontal: '1%', paddingVertical: '1%'}}
                                name="arrow-redo-outline" size={30} color="#ffffff"/>             
                    </TouchableOpacity>
                      </View>
                    );
                  } else {
                    return (
                      <View style = {{flexDirection: 'row',justifyContent: 'center',}}>
                      <TouchableOpacity
                        onPress={() => this.removeBookMark(post[0].id)}>
                     <Icon style = {{paddingHorizontal: '1%', paddingVertical: '1%'}}
                          name="heart" size={30} color="red"/>
                      </TouchableOpacity>
                      <TouchableOpacity
                      onPress={() =>
                        this.onShare(post[0].title.rendered, post[0].link)
                      }>
                      <Icon style = {{paddingHorizontal: '1%', paddingVertical: '1%'}}
                                name="arrow-redo-outline" size={30} color="#ffffff"/>                    
                    </TouchableOpacity>
                     </View>
                    );
                  }
                }
              }
              />
                  
                </View>
                </View>
            </ImageBackground>
                <Text style = {styles.titleStyle}>{post[0].title.rendered.replace("&#8217;", "'").replace("&#8217;", "'").replace("&#8216;", "'")}</Text>
                <View style = {{flexDirection: 'row', paddingHorizontal: 20, alignItems: 'center'}}>
                <Avatar.Image
                      size={40}
                      source={{
                        uri: `${
                          this.state.offline
                            ? ''
                            : post[0]._embedded.author[0].avatar_urls[96]
                        }`,
                      }}
                    />
                    <Text  style = {styles.authorStyle}>
                      {this.state.offline ? '' : post[0]._embedded.author[0].name}
                    </Text>
                    <Text  style = {styles.authorStyle}>  |</Text>
                    <Text  style = {styles.authorStyle}>   
                        {`  Published on ${
                          post[0].date}`}
                    </Text>
                
                </View>
                <Card>
                  <Card.Content>
                  <HTML value={post[0].content.rendered} addLineBreaks={false} stylesheet = {styles}/>
                  </Card.Content>
                </Card>

          </View>
        )}
      </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 4,
  },
  card: {
    margin: 4,
  },
  p:{
    fontSize: 17,
    fontFamily: 'Avenir Next',
  },

  blogImageStyle:{
    width: '100%',
    height: height * 0.3,
  },
  titleStyle: {
      padding: 20,
      fontSize: 25,
      fontWeight: "bold",
      fontFamily: theme.fontType.primary,
  },
  authorStyle: {
      left: 15,
      fontFamily: theme.fontType.primary,
      fontSize: 14,
      color: theme.colors.secondary,
  },
  innerView: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },

});

export default SinglePost;