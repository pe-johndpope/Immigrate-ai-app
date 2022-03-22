// @ts-nocheck
import React, {Component, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Alert,
  TextInput
} from 'react-native';
import SearchBar from 'react-native-elements';
import {Headline, withTheme, Title} from 'react-native-paper';
import Card from './Card';
import Categories from './Categories'
import AsyncStorage from  '@react-native-async-storage/async-storage'
import NetInfo from '@react-native-community/netinfo';
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from '../../../components/theme';
import { NavigationContainer } from '@react-navigation/native';
import { themeTools } from 'native-base';
import filter from 'lodash.filter';



const cacheKey = 'CacheData';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastestpost: [],
      searchData: [],
      query: '',       
      isFetching: false,
      page: 1,
      seed: 1,
      offline: false,
    };
  }

  onRefresh() {
    this.setState({isFetching: true}, function() {
      this.fetchLastestPost();
    });
  }
  componentDidMount() {
    this.fetchLastestPost();
    this.NetworkHandler();
  }
  async NetworkHandler() {
    NetInfo.fetch()
      .then(state => {
        if (!state.isConnected) {
          throw new Error('Currently offline.');
        }
      })
      .catch(error => {
        console.log('list error', error);
        Alert.alert(
          'Sorry, something went wrong. Please try again',
          error.message,
        );
      });
  }
  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1,
      },
      () => {
        this.fetchLastestPost();
      },
    );
  };

  async fetchLastestPost() {
    try {
      const networkState = await NetInfo.fetch();

      if (!networkState.isConnected) {
        const _cachedData = await AsyncStorage.getItem(cacheKey);
        if (!_cachedData) {
          throw new Error(
            "You're currently offline and no local data was found.",
          );
        }

        console.log('cachedData', _cachedData);
        const cachedData = JSON.parse(_cachedData);

        this.setState({
          lastestpost: cachedData.post,
          isFetching: false,
        });
      }
      let page = this.state.page;
      const response = await fetch(
        `https://rasa.immigrate.ai/wp-json/wp/v2/posts?per_page=10&page=${page}`,
      );
      const post = await response.json();
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({
          post,
        }),
      );

      this.setState({
        lastestpost: page === 1 ? post : [...this.state.lastestpost, ...post],
        isFetching: false,
      });
    } catch (error) {
      console.log('geoFetch error', error);
      return Promise.reject(error);
    }
  }
  bannerError = e => {
    console.log('banner error: ');
    console.log(e);
  };





  render() {

    return (
      <LinearGradient
      style = {{zIndex:-3, flex: 1}}
      colors={["#B4C6CF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF"]}>
      <SafeAreaView style = {{flex: 1,}}>
        <View style = {{ flexDirection: 'row',justifyContent:'space-between'}}>
        <Title style = {{fontSize: 27.5, fontFamily: "Avenir Next", fontWeight: "700", paddingTop: 20,paddingHorizontal: 20,}}>Explore Canada!</Title>
        <TouchableOpacity 
         onPress={() =>
          this.props.navigation.navigate('Bookmark')}>
          <Icon  style = {{paddingHorizontal: 20, paddingTop: 20,}} name="bookmarks" size={25} color={theme.colors.purple} />
          </TouchableOpacity>      
        </View>
        <Categories  navigation={this.props.navigation}></Categories>
        <View style = {{paddingHorizontal: 20, paddingBottom: 10,}}>
        <TextInput
          style = {{borderRadius: 10, 
            borderWidth: 1, 
            borderColor: "#b2b2b2", 
            padding: 10, 
            fontFamily: 'Avenir Next'}}
          placeholder="Search"
          value = {this.state.query}
          onChangeText = {(text) => text}
        />
          </View>
        <FlatList
          data={this.state.lastestpost}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          onEndReached={this.handleLoadMore}
          onEndReachedThreshold={0.1}
          renderItem={({item}) => (
            <Card
              item={item}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
  </LinearGradient>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === 'ios' ? 30 : 10,
  },
  example: {
    paddingVertical: 10,
  },
  title: {
    margin: 10,
    fontSize: 20,
  },

});
export default withTheme(Feed);