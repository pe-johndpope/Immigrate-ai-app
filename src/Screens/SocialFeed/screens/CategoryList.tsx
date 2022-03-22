// @ts-nocheck
import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Alert, SafeAreaView} from 'react-native';
import {Title, withTheme} from 'react-native-paper';
import Card from './Card';
import NetInfo from '@react-native-community/netinfo';
const cacheKey = 'Categorie';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native';
import Categories from './Categories'
import { Mada_500Medium } from '@expo-google-fonts/dev';

class CategoryList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      posts: [],
    };
  }

  componentDidMount() {
    this.fetchPost();
  }

  async fetchPost() {
    this.setState({loading: true});
    let categorie_id = this.props.route.params.categorie_id;
    ;
    let specific_cat_key = cacheKey + categorie_id;
    try {
      const networkState = await NetInfo.fetch();

      if (!networkState.isConnected) {
        const _cachedData = await AsyncStorage.getItem(specific_cat_key);
        if (!_cachedData) {
          Alert.alert("You're currently offline and no local data was found.");
        }
        const cachedData = JSON.parse(_cachedData);
        this.setState({posts: cachedData.post, loading: false});
        Alert.alert('You still read from cache');
      }
      const response = await fetch(
        `https:rasa.immigrate.ai/wp-json/wp/v2/posts?categories=${categorie_id}`,
      );
      const post = await response.json();
      await AsyncStorage.setItem(
        specific_cat_key,
        JSON.stringify({
          post,
        }),
      );
      this.setState({posts: post, loading: false});
    } catch (error) {
      console.log('got error', error);
      return Promise.reject(error);
    }
  }
  render() {
    let title = this.props.route.params.categorie_name
    return (
      <SafeAreaView style = {{flex: 1,}}>
        <Title style = {{paddingTop: 10, paddingHorizontal: 21, fontSize: 30, fontFamily: "Avenir Next", fontWeight: "700"}}>{title}</Title>  
        <FlatList
          data={this.state.posts}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('SinglePost', {
                  post_id: item.id,
                })
              }>
              <Card
                item={item}
                navigation={this.props.navigation}
              />
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
        </SafeAreaView>
    );
  }
}
export default CategoryList;
