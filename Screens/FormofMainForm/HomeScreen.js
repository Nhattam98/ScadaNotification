import react, { useState, useEffect } from "react";
import { View, Text, FlatList } from 'react-native';
//Import API
import newAPI from '../../config/News';
import NewsCard from '../../Components/NewsCard';

function HomeScreen() {
  const [news, setNews] = useState([])


  useEffect(() => {
    getNewsFromAPI()
  }, [])
  function getNewsFromAPI() {
    newAPI.get('top-headlines?sources=techcrunch&apiKey=842d184e81a84cac840286d25386ad46')
      .then(function (response) {
        setNews(response.data);
        console.log(news)

      })
      .catch(function (error) {
        console.log(error)
      })
  }
  if (!news) {
    return null
  }
  return (
    <View style={{marginBottom: 100}}>
      <FlatList data={news.articles}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({ item }) => {
          return <NewsCard item={item} />
        }} />

    </View>
  )
}

export default HomeScreen;