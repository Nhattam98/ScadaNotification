import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
function HomeScreen({navigation}) {
 

  return (
    <View style={styles.cardView}>
      <Text style={styles.title}>Heartbreaking video from high school shows slain NYPD officer giving uplifting message - New York Post </Text>
      <Text style={styles.author}>Joe Marino, Jesse O’Neill</Text>
      <Image style={styles.image} />
      <Text style={styles.description}>In a heartfelt video message, then-high school student Jason Rivera urged younger students to work hard or they would make it “nowhere” in life.</Text>
    </View>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  cardView:{
    backgroundColor: 'white',
    margin: width * 0.03,
    borderRadius: width * 0.05,
    shadowColor: '#000',
    shadowOffset: {width: 0.5, height: 0.5},
    shadowOpacity: 0.5,
    shadowRadius: 3
  },
  title: {
    marginHorizontal: width * 0.05,
    marginVertical: width * 0.03,
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold'
  },
  description: {
    marginVertical: width * 0.05,
    marginHorizontal: width * 0.02,
    color: 'gray',
    fontSize: 18
  },
  image: {
    width: width,
    height: height / 6,
    marginLeft: width * 0.05,
    marginRight: width * 0.05,
    marginVertical: height * 0.02
  },
  author: {
    marginBottom: width * 0.0,
    marginHorizontal: width * 0.05,
    fontSize: 15,
    color: 'gray'
  }
})