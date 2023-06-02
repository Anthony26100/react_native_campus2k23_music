import React, { useState, useEffect } from 'react'
import { Image } from 'expo-image';
import {ActivityIndicator, FlatList, Text, View, StyleSheet} from 'react-native';

type Movie = {
  id: number
  original_title: string
  original_language: string
  overview: string
  title: string
  release_date: string
  poster_path: string
  vote_average: number
  vote_count: number
}

function ListsMovies() {

  const [data, setData] = useState<Movie[]>([])

  const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNTY5M2Y4YWQ4MWJlZDY3N2FhYTRjMjk5MDQzZmViMCIsInN1YiI6IjY0NzlkOTRkZTMyM2YzMDBjNDI5NTAxNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NH3UnKNvQ9PP5Vz-qT4YlGj1eshLYGaGP4G7fbNUrX4";

  const getMovie = async  () => {
    fetch('https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc', {
      headers: {
      Authorization: `Bearer ${API_KEY}`

    }, method: 'GET'}).then(async resp => await resp.json()).then(data => setData(data.results))
  }
  
  useEffect(() => {
      getMovie();
  })

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <View>
         
            <Image style={styles.imga} source={`https://image.tmdb.org/t/p/w500/${item.poster_path}`}  />
      
            <Text style={styles.color}>
          
              {item.id}, {item.title}
            </Text>
          </View>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  color: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  imga: {
    width: 1000,
    height: 1000,
  }
});
export default ListsMovies;