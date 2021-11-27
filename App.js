import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View , TextInput , ScrollView , Image , TouchableHighlight , Modal} from 'react-native';
import axios from 'axios';

export default function App() {
  const apiurl = "http://www.omdbapi.com/?apikey=ca5bdf82";
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
const  MovieDetailPage = id => {
  axios(apiurl + "&i=" + id).then(({ data }) => {
    let result = data;
    console.log('detail',result)
    setState (prevState => {
      return {...prevState, selected: result}
    });
  });
}


  return (
    
    <View style={styles.container}>
    

      <Text style = {styles.title}>FIND YOUR MOVIE</Text>
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
          
        <View  style= {styles.result}>

          <Image style = {styles.image} source = {{uri : result.Poster}}/>

          <Text style = {styles.heading}> {result.Title} </Text> 
         
             </View>

             </TouchableHighlight>
      ))}

      </ScrollView>
      <Modal  visible = {(typeof state.selected.Title != "undefined")}>
        <View>
           <Image style = {styles.imageDetail} source = {{uri : state.selected.Poster}}/>
           
           <Text>Title : {state.selected.Title}</Text>
           <Text> Genre : {state.selected.Genre}</Text>
           <Text> Director : {state.selected.Director}</Text>
           <Text> Plot :{state.selected.Plot}</Text>
           <Text>Cast : {state.selected.Actors}</Text>
           <Text> rating : {state.selected.imdbRating}</Text>
           

        </View>
        <TouchableHighlight onPress = {()=> setState(prevState => {
          return {...prevState, selected : {} }
        })}> 

        <Text style = {styles.closeBtn}> return</Text>

        </TouchableHighlight>
        
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFC300',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbox : {
   fontSize : 30,
   backgroundColor : '#FF5733' 
  
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
},
closeBtn : {
  padding : 15,
  fontSize : 15,
  fontWeight : '700',
  backgroundColor  : '#FF5733'
},
imageDetail : {
  width : '100%',
  height : 300,
  resizeMode : "cover"
  },
  closeBtn : {
    padding : 15,
    fontSize : 15,
    fontWeight : '700',
    backgroundColor  : '#FF5733'
  },
title : {
  color :'#FF5733' ,
  fontSize : 30 ,
  fontWeight : '700',
  textAlign : 'center',
  marginBottom : 20
}

});
