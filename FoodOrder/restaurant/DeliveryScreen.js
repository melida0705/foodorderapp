import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text,Dimensions, TouchableOpacity,Button, View ,RefreshControl,SafeAreaView} from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';


  const initialLayout = {color:"red", width: Dimensions.get('window').width };
  
  export default function PreparationScreen({route,navigation}){
   // const [order,setOrder]=useState([]);
    const [shippedOrder,setShippedOrder]=useState([]);
  //const ip="http://192.168.0.16:8080"
    const ip="https://foodorder0705.herokuapp.com"
    //   const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async() => {
  
      setRefreshing(true);
      AsyncStorage.getItem('username', (err, result) => {
        fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
        .then((json)=>
        {
          console.log(json[0].restaurant_id)
          const url1=ip+"/seller-alldelivery/"+json[0].restaurant_id
          console.log(url1)
      fetch(url1).then((response) => response.json())
      .then((json) => setShippedOrder(json))
      .catch((error) => console.error(error));
       
        })
   
   
   
     })
    
    setRefreshing(false)
    //   setRefreshing(true);
    //   AsyncStorage.getItem('username', (err, result) => {
    //     fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
    //     .then((json)=>
    //     {
    //       console.log(json[0].restaurant_id)
    //       const url1=ip+"/seller-alldelivery/"+json[0].restaurant_id
    //       console.log(url1)
    //   fetch(url1).then((response) => response.json())
    //   .then((json) => setShippedOrder(json))
    //   .catch((error) => console.error(error));
      
    //     })
   
   
   
    //  })
    
    // setRefreshing(false)
    },[])

     useEffect(()=>{
      //  this.fetchData();
    
     // const url=ip+"/seller-order/asmir"
      // fetch(url).then((response) => response.json())
      // .then((json) => setOrder(json))
      // .catch((error) => console.error(error));
      AsyncStorage.getItem('username', (err, result) => {
        fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
        .then((json)=>
        {
          console.log(json[0].restaurant_id)
          const url1=ip+"/seller-alldelivery/"+json[0].restaurant_id
      fetch(url1).then((response) => response.json())
      .then((json) => setShippedOrder(json))
      .catch((error) => console.error(error));
      
        })
   
   
   
     })
     
    }, []);
    useFocusEffect(
      React.useCallback(() => {
        AsyncStorage.getItem('username', (err, result) => {
          fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
          .then((json)=>
          {
            console.log(json[0].restaurant_id)
            const url1=ip+"/seller-alldelivery/"+json[0].restaurant_id
        fetch(url1).then((response) => response.json())
        .then((json) => setShippedOrder(json))
        .catch((error) => console.error(error));
        
          })
     
     
     
       })
        // Do something when the screen is focused
        return () => {
         // alert('Screen was unfocused');
         console.log("its unfocused");
          // Do something when the screen is unfocused
          // Useful for cleanup functions
        };
      }, [])
    );
   
    return (
      <SafeAreaView style={styles.container}>
      <FlatList
       data={shippedOrder}
       refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
       renderItem={({item}) => ( 
        
        <View
        //elevation={2}
        style={{
          flex: 1,
          flexDirection: "column",
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
        
   <Button title="See order details" onPress={() =>  navigation.navigate('OrderDeliveryDetailsScreen', {
          data: item.order_id,
          otherParam: 'anything you want here',})}
          /> 
        
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