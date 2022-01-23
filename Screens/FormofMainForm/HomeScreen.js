import react, { useState, useEffect } from "react";
import { View, Text } from 'react-native';
//Import API
import newAPI from '../../config/News';
import NewsCard from '../../Components/NewsCard';

function HomeScreen({ navigation }) {
  const [news, setNews] = useState([])


  useEffect(() => {
    getNewsFromAPI()
  }, [])
  // const newResponse = async () => {
  //   const response = await newAPI.get('top-headlines?country=us&apiKey=842d184e81a84cac840286d25386ad46')
  //   console.log(response.data)
  // }

  function getNewsFromAPI(){
    newAPI.get('top-headlines?country=us&apiKey=842d184e81a84cac840286d25386ad46')
          .then(function(response){
            setNews(response.data.articles)
            console.log(news)
            
          })
          .catch(function(error){
            console.log(error)
          })
  }
  if(!news){
    return null
  }
  return (
    <View>
      <Text>News Screen</Text>
      <NewsCard></NewsCard>
    </View>
  )
}

export default HomeScreen;