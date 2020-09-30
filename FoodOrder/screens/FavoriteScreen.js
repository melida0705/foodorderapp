import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View,Button,RefreshControl,SafeAreaView ,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import  {AsyncStorage} from 'react-native'
import { MonoText } from '../components/StyledText';

export default function FoodScreen({route,navigation}) {
  // const {data} = route.params
   
   
  const [food,setFood]=useState([]);
 // const ip="http://192.168.0.16:8080";
  const ip="https://foodorder0705.herokuapp.com"
//   const [isLoading, setLoading] = useState(true);
const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {


    setRefreshing(true); 
    AsyncStorage.getItem('username', (err, result) => {
      console.log("username je"+result);
    
    const url=ip+"/favorite/"+result
    
    fetch(url).then((response) => response.json())
    .then((json) => setFood(json))
    .catch((error) => console.error(error));
  
    })
    setRefreshing(false);
   },[]);

    
 useEffect(()=>{
  //  this.fetchData();
  AsyncStorage.getItem('username', (err, result) => {
    console.log("username je"+result);
  
  const url=ip+"/favorite/"+result
  
  fetch(url).then((response) => response.json())
  .then((json) => setFood(json))
  .catch((error) => console.error(error));
  })

  
}, []);
useFocusEffect(
  React.useCallback(() => {
    AsyncStorage.getItem('username', (err, result) => {
      console.log("username je"+result);
    
    const url=ip+"/favorite/"+result
    
    fetch(url).then((response) => response.json())
    .then((json) => setFood(json))
    .catch((error) => console.error(error));
    })
    // Do something when the screen is focused
    return () => {
      console.log("its unfocused");
      // Do something when the screen is unfocused
      // Useful for cleanup functions
    };
  }, [])
);
const removeFavorite=((item)=>{
  AsyncStorage.getItem('username', (err, result) => {
    console.log("username je"+result);
  
    const url=ip+"/deletefavorite/"+result+"/"+item.food_id
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        food_id: item.food_id
      
        
      })
    })
    const url1=ip+"/favorite/"+result
  fetch(url1).then((response) => response.json()).
    then((json) => setFood(json))
    .catch((error) => console.error(error));
  })
  })
  const AreYouSure=((item)=>
  
  Alert.alert(
    'Confirm ',
    'Are you sure you want to remove from favorite ',
    [
      {
        text: 'Yes',
       onPress:()=>removeFavorite(item)
      },
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
      
    ],
    { cancelable: false }
  )

  );
  
return(
    <SafeAreaView style={styles.container}>
     
        <FlatList
          data={food}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => ( 
            
            <View
          elevation={2}
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#ffffff",
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          <Image
            style={{
              width: "50%",
              height: 135,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4
            }}
            source={{ uri: item.food_image }}
          />
          <View
            style={{
              padding: 16
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#333"
              }}
            >
              {item.food_name}
            </Text>
            
           
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
                //width: "100%"
              }}
            > 
            <TouchableOpacity onPress={()=>AreYouSure(item)}>
                <Text>Remove</Text>
            </TouchableOpacity>
            </View>
          </View>
          
              </View> 
            
          )}
          keyExtractor={item=>item.food_id.toString()}
        />
      
    </SafeAreaView>
)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});