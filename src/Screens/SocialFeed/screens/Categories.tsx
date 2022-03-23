// @ts-nocheck
import React from 'react';
import {
  FlatList,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {Card, Title} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
const cacheKey = 'CategoriesCache';
import AsyncStorage from  '@react-native-async-storage/async-storage'
import { Center } from 'native-base';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from "react-native-vector-icons/Ionicons";
import { theme } from "../../../components/theme";
import { LinearGradient } from 'expo-linear-gradient';

export default class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      categories: [],
    };
  }
  componentDidMount() {
    this.fetchCategorie();
  }
  async fetchCategorie() {
    this.setState({loading: true});
    try {
      const networkState = await NetInfo.fetch();

      if (!networkState.isConnected) {
        const _cachedData = await AsyncStorage.getItem(cacheKey);
        if (!_cachedData) {
          Alert.alert("You're currently offline and no local data was found.");
        }

        const categories = JSON.parse(_cachedData);
        console.log('cachedData', _cachedData);
        this.setState({
          categories: categories.categories,
          isFetching: false,
        });
        Alert.alert('your still read from cache')
      }
      const response = await fetch(`https://rasa.immigrate.ai/wp-json/wp/v2/categories`);
      const categories = await response.json();
      await AsyncStorage.setItem(
        cacheKey,
        JSON.stringify({
          categories,
        }),
      );

      this.setState({
        categories: categories,
        isFetching: false,
      });
    } catch (error) {
      console.log('geoFetch error', error);
      return Promise.reject(error);
    }
  }
  render() {
    return (
      <View style = {{alignItems: "center", marginBottom: 5,}}>
        <View style = {{flexDirection:'row'}}>
        </View>
        <FlatList
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          data={this.state.categories}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate('CategoryList', {
                  categorie_id: item.id,
                  categorie_name: item.name
                })
              }>
 
              <LinearGradient
            colors={["#0060ff", theme.colors.purple]}
            style={styles.buttonStyle}
          >
            <Text
              style={{padding: 10, fontFamily: 'Avenir Next', fontWeight: '700', color: "#ffffff" }}
            >
              {item.name}
            </Text>
          </LinearGradient>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index}
        />
        </View>
        
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 25, 
    fontFamily: "Avenir Next", 
    fontWeight: "bold", 
    color: "#493d8a"
  },
  buttonStyle:{
    marginHorizontal: 2, 
    marginVertical: 5,
    borderRadius: 10, 
    shadowOpacity: 0.4,
    shadowRadius: 5,
  }
});