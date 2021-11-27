import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View , TextInput , ScrollView} from 'react-native';
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
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D51F51',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchbox : {
   fontSize : 20,
   backgroundColor : '#fff' 
  
  }
,
});
