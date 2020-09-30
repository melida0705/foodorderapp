import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text,Dimensions, TouchableOpacity,Button, View,RefreshControl,SafeAreaView } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';


  // const initialLayout = {color:"red", width: Dimensions.get('window').width };
  
  export default function HomeScreen({route,navigation}){
   // const [order,setOrder]=useState([]);
   //const {data} = route.params;
   
    //const [shippedorder,setShippedOrder]=useState([]);
    const [allorder,setAllOrder]=useState([]);
   //const ip="http://192.168.0.16:8080"
    const ip="https://foodorder0705.herokuapp.com"
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async() => {
  
  
      setRefreshing(true);
      AsyncStorage.getItem('username', (err, result) => {
        fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
        .then((json)=>
        {
          console.log(json[0].restaurant_id)
          const url1=ip+"/seller-allorder/"+json[0].restaurant_id
          fetch(url1).then((response) => response.json())
          .then((json) => setAllOrder(json))
          .catch((error) => console.error(error));
       
        })
   
   
   
     })
    
    setRefreshing(false)
    })
    //   const [isLoading, setLoading] = useState(true);
     useEffect(()=>{
      //  this.fetchData();
      console.log("ITS OK");
      // const url=ip+"/seller-order/asmir"
      // fetch(url).then((response) => response.json())
      // .then((json) => setOrder(json))
      // .catch((error) => console.error(error));
      AsyncStorage.getItem('username', (err, result) => {
        fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
        .then((json)=>
        {
          console.log(json[0].restaurant_id)
          const url1=ip+"/seller-allorder/"+json[0].restaurant_id
          fetch(url1).then((response) => response.json())
          .then((json) => setAllOrder(json))
          .catch((error) => console.error(error));
       
        })
   
   
   
     })
      // try{
      // const url1=ip+"/seller-allorder/5"
      // fetch(url1).then((response) => response.json())
      // .then((json) => setAllOrder(json))
      // .catch((error) => console.error(error));
      // }
      // catch{}
    }, []);
    useFocusEffect(
      React.useCallback(() => {
        AsyncStorage.getItem('username', (err, result) => {
          fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
          .then((json)=>
          {
            console.log(json[0].restaurant_id)
            const url1=ip+"/seller-allorder/"+json[0].restaurant_id
            fetch(url1).then((response) => response.json())
            .then((json) => setAllOrder(json))
            .catch((error) => console.error(error));
         
          })})
        // Do something when the screen is focused
        return () => {
         // alert('Screen was unfocused');
         console.log("its unfocused");
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [])
    );
    const sendToPreparation=((item)=>{
     
      const url=ip+"/updateorderpreparation/"+item.order_id
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          food_id: item.food_id
        
          
        })
      });
      AsyncStorage.getItem('username', (err, result) => {
        fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
        .then((json)=>
        {
          console.log(json[0].restaurant_id)
          const url1=ip+"/seller-allorder/"+json[0].restaurant_id
          fetch(url1).then((response) => response.json())
          .then((json) => setAllOrder(json))
          .catch((error) => console.error(error));
       
        })
   
   
   
     })
      // const url2=ip+"/seller-allorder/5"
      // fetch(url2).then((response)=>response.json()).then((json)=>setOrder(json))
      // .catch((error)=>console.error(error));
    })
    return (
      <SafeAreaView style={styles.container}>
           <Button title="Logout" onPress={()=>navigation.navigate("Root")}/>
      <FlatList
       data={allorder}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
       renderItem={({item}) => ( 
        
        <View
        //elevation={2}
        style={{
          flex: 1,
          
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
        
      ><TouchableOpacity onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate('OrderDetailsScreen', {
          data: item.order_id,
          otherParam: 'anything you want here',
        })}}>
       <Text   style={{
       
       marginHorizontal: 24,
       marginVertical: 8,
       padding:10,
       fontSize:20
      
     }}>
    Order Number: {item.order_id}{"\n"}{"\n"}
      Name: {item.order_customer_username} {"\n"}{"\n"}
      Address: {item.order_address} {"\n"}{"\n"}
      Mobile: {item.order_phoneNumber} {"\n"}{"\n"}
      Amount: {item.order_amount} {"\n"}
   </Text>
   <Button title="See order details" onPress={() =>   navigation.navigate('OrderDetailsScreen', {
          data: item.order_id,
          otherParam: 'anything you want here',
        })}
         /> 
        
        
        {/* <Button title="Send to preparation"  onPress={() => sendToPreparation(item)}/> */}
        </TouchableOpacity>
        </View>
          
         
       )}
      keyExtractor={item=>item.order_id.toString()}
     />
     </SafeAreaView>
      
    );
  


}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
