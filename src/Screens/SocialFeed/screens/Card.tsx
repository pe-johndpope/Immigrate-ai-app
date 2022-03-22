// @ts-nocheck
import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity,Text} from 'react-native';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
import HTML from 'react-native-htmlview';
import moment from 'moment';
import RenderHtml from 'react-native-render-html';

export default ({item, navigation, textColor}) => {
  let titleFormatted = item.title.rendered.replace("&#8217;", "'").replace("&#8217;", "'").replace("&#8216;", "'");
  return (
    <TouchableOpacity
      onPress={() =>
          navigation.navigate('SinglePost', {
          post_id: item.id,
        })      }>
      <Card
        style={[
          {
            borderRadius: 10,
            width: '90%',
            alignSelf: 'center',
            marginBottom: 10,
            shadowOpacity: 0.3,
            shadowRadius: 4,
          },
        ]}>
          <View style = {{overflow: 'hidden'}}>
          <Card.Cover style = {{borderRadius: 10}} source={{uri: item.jetpack_featured_media_url}} />
          </View>
        <Card.Content>
          <Title numberOfLines={3} style = {{fontFamily: 'Avenir', paddingTop: 5,}}>{titleFormatted.replace("&#8217;", "'")}</Title>
          <Paragraph style = {{fontFamily: 'Avenir Next'}}>Published on {moment(item.date).fromNow()}</Paragraph>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};