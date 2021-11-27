import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View , TextInput , ScrollView , Image , TouchableHighlight} from 'react-native';
import axios from 'axios';

export default function App() {
  const apiurl = "http://www.omdbapi.com/?i=tt3896198&apikey=ca5bdf82";
  const [state , setState] = useState({
    s:"",
    results : [], // where i will put req
    selected: {}

  });

  const search = () => {
    axios (apiurl + "&s=" + state.s ).then(({ data })=> {
      let results = data.Search
      console.log('results',results)
      setState(prevState => {
        return {...prevState,results:results}
      })
    })
  }
const  MovieDetailPage = imdbID => {
  axios(apiurl + "&i=" + imdbID).then(({ data }) => {
    let result = data;
    console.log('detail',result)
    setState (prevState => {
      return {...prevState, selected: result}
    });
  });
}


  return (
    <View style={styles.container}>
      <Text>FIND YOUR MOVIE</Text>
      <TextInput 
      style={styles.searchbox}
      
      onChangeText={text => setState(prevState => {
        return {...prevState, s: text}
      }) }
      onSubmitEditing={search}
      value={state.s}
      />
      <ScrollView  style={styles.results}> 
      {state.results.map( result => (    
        <TouchableHighlight 
        key={result.imdbID} 
        onPress = {() => MovieDetailPage(result.imdbID)}
        >
        <View style= {styles.result}>

          <Image style = {styles.image} source = {{uri : result.Poster}}/>

          <Text style = {styles.heading}> {result.Title} </Text> 
         
             </View>
             </TouchableHighlight>
      ))}

      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFB6C1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbox : {
   fontSize : 20,
   backgroundColor : '#fff' 
  
  }
,
results :{
  flex : 1,
}, 
result : {
  flex : 1 ,
  width : '100%',
  marginBottom : 20 
},
heading : {
  color : "#FFF",
  fontSize : 18 ,
  fontWeight : '700',
  padding : 20,
  backgroundColor: '#445565'
},
image : {
width : '100%',
height : 300,
resizeMode : "cover"
}
});
