import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

const API_URL = 'https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=88ac4a0c33c94d0e938fb762c95499c4';

const  Cafe= () => {
  const [articles, setArticles] = useState([]);

  const fetchData = () => {
    // Fetch data from the API
    console.warn('Fetching data...');
    fetch(API_URL)
      .then((response) => response.json())
      .then((data) => setArticles(data.articles))
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    
    fetchData();
    const refreshInterval = setInterval(fetchData, 2* 60 * 1000);
    return () => {
      clearInterval(refreshInterval);
    };
  }, []);

  const limitedArticles = articles.slice(0, 5); // Limit to the first 5 articles

  const renderItem = ({ item }) => (
    <View style={styles.articleContainer}>
      <Image style={styles.articleImage} source={{ uri: item.urlToImage }} />
      <Text style={styles.articleTitle}>{item.title}</Text>
      <Text style={styles.articleDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={limitedArticles} // Use the limited articles
        keyExtractor={(item) => item.title}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  articleContainer: {
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  articleImage: {
    width: '100%',
    height: 200,
  },
  articleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  articleDescription: {
    fontSize: 14,
  },
});



export default Cafe;