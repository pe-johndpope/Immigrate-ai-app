import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  Text,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  Platform,
} from "react-native";
import { Avatar, Title } from "react-native-paper";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { theme } from "../../components/theme";
import { Center, themeTools } from "native-base";
import Heart from "react-animated-heart";

import { BlogContext } from "../../Contexts"


const { width, height } = Dimensions.get("window");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Why Vancouver is the Perfect Place Why Vancouver is the Perfect Place",
    image: "https://i.postimg.cc/8z2gDZDQ/vancouver.png",
    tag: "LOCATIONS",
    author: "Kendall Chan",
    date: "2020-01-01",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-1",
    title: "Canada Startup Visa new policies shock immigration companies around Ontario ",
    image: "https://i.postimg.cc/nVwZV6yg/image.jpg",
    tag: "NEWS",
    author: "Kendall Chan",
    date: "2020-01-01",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-12",
    title: "10 Things all new Canadian Immigrants should do before landing",
    image: "https://i.postimg.cc/8P1y35XV/charter-citizenship-ceremony-20190417.webp",
    tag: "LIFESTYLE",
    author: "Kendall Chan",
    date: "2020-01-01",
  },
  {
    id: "bd7acbea-c1b1-46c2-aed5-221212",
    title: "Why Vancouver is the Perfect Place",
    image: "https://i.postimg.cc/8z2gDZDQ/vancouver.png",
    tag: "Destinations",
    author: "Kendall Chan",
    date: "2020-01-01",
  },{
    id: "bd7acbea-c1b1-46c2-aed5-1112",
    title: "Why Vancouver is the Perfect Place",
    image: "https://i.postimg.cc/8z2gDZDQ/vancouver.png",
    tag: "Destinations",
    author: "Kendall Chan",
    date: "2020-01-01",
  },
  
];

const SocialFeed = () => {
  const { posts, tags, categories, authors } = useContext(BlogContext)
  
  // see https://developer.wordpress.org/rest-api/ for type information
  // (eg. for posts) https://developer.wordpress.org/rest-api/reference/posts/
  console.log(posts[0])

  const renderItem = ({ item }) =>
      <Item
        id={item.id}
        title={item.title}
        image={item.image}
        tag={item.tag}
        author={item.author}
        date={item.date}
      />



  const Item = ({ id, title, image, tag, date, author }) => (
    <TouchableOpacity>
      <View style={styles.frontContainer}>
        <Image style = {styles.blogImageStyle}source={{ uri: image }}/>
        <View style = {{flexDirection:'row', alignItems: 'center', marginLeft: 7.5, paddingTop: 7.5,}}>
        <Icon name="pricetag" size={12} color={theme.colors.pink} />
        <Text style = {styles.tagStyle}>{tag}  </Text>
        <Icon name="calendar-outline" size={12} color={theme.colors.secondary} />
        <Text style = {styles.dateStyle}>{date}</Text>
        </View>
        <View style = {{flexDirection:'column'}}>
        <Text numberOfLines={2}style={styles.title}>{title}</Text>
 
        </View>
        </View>
    </TouchableOpacity>
  );

  const [isClick, setClick] = useState(false);



  return (
    <LinearGradient
    colors={["#B4C6CF","#FFFFFF","#FFFFFF","#FFFFFF","#FFFFFF",]}>

    <SafeAreaView>
      <View style = {{alignItems: 'center'}}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}

      />
      </View>
      </SafeAreaView>
      </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS == "ios" ? height * 0 : height * 0.06,
    flex:1,
  },
  frontContainer: {
    width: width * 0.8,
    height: height * 0.327,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#E5E5E5",
  },

  title: {
    maxWidth: '90%',
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 7.5,
    paddingHorizontal: 10,
    paddingBottom: 5,
    fontFamily: 'Avenir',

  },
  author: {
    color: theme.colors.secondary,
    fontSize: 13,
    marginLeft: 5,
    fontFamily: 'Avenir Next',
  },
  blogImageStyle:{
    width: '100%',
    height: '70%',
    borderRadius: 10,
  },
  tagStyle: {
    color: theme.colors.pink,
    fontSize: 12,
    marginTop: 1,
    fontFamily: 'Avenir Next',
    fontWeight: '700',
    marginLeft: 5,
  },
  dateStyle: {
    color: theme.colors.secondary,
    fontSize: 12,
    marginTop: 1,
    fontWeight: '400',
    fontFamily: 'Avenir',
    marginLeft: 5,
  }
});

export default SocialFeed;
