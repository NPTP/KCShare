import React, { Component } from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import Constants from 'expo-constants';
import Amplify from 'aws-amplify';
import Post from './Post.js';
import { SearchBar } from 'react-native-elements';
import { createStackNavigator } from '@react-navigation/stack';

class ExploreHeader extends Component {
  render() {
    return (
      <View style={styles.header}>
        <View style={styles.exploreBarContainer}>
          <SearchBar
            autoFocus 
            containerStyle={styles.exploreBarContainer}
            inputStyle={styles.exploreBarInput}
            inputContainerStyle={styles.exploreBarInputContainer}
          />
        </View>

        <View>
		      <Text style={styles.headerText}>Top Tags</Text>
		    </View>
      </View>
    )
  }
}

export default class ExploreScreen extends Component {
  state = {
    hashtags: [],
  }
  
  componentDidMount() {
    if (this.state.hashtags.length === 0) {
	    Amplify.API.get('getPopularHashtags', "").then( (response) => {
		    this.setState({hashtags: response});
	    }).catch((error) => {
		    console.log(error)
	    })
	  }
  }

  render() {
    return (
      <View style={styles.view}>
        <ExploreHeader  />

        <SafeAreaView style={styles.hashtagsContainer}>
          <FlatList
            data={this.state.hashtags}
            renderItem={({ item }) => <Text style={styles.hashtagText}>#{item.hashtag}</Text>}
            keyExtractor={item => item.postCount}
          />
		    </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: "#110d41"
  },
  container: {
    flex: 8
  },
  exploreBarContainer: {
    flexDirection: 'column',
    backgroundColor: "#110d41",
    paddingTop: 20,
    paddingBottom: 10
  },
  exploreBarInputContainer: {
    padding: 5,
    backgroundColor: '#292753',
    borderRadius: 50,
  },
  exploreBarInput: {
    fontWeight: "normal",
    color: '#FFFFFF',
    flex: 1,
    height: 20,
    fontSize: 18
  },
  header: {
    marginLeft: 20,
    marginRight: 20,
    flexDirection: "column"
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fcfcff"
  },
  hashtagsContainer: {
    flexDirection: "column"
  },
  hashtagText: {
    marginLeft: 20,
    fontSize: 24,
    fontWeight: "bold",
    color: '#FB9B38',
    padding: 6
  }
});
