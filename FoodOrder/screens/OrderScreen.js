import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState,useCallback,useRef } from 'react';
import {useFocusEffect} from '@react-navigation/native';
import { Image, FlatList,Platform, StyleSheet, Text,Dimensions, TouchableOpacity,Button, View,RefreshControl,SafeAreaView,Alert } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import HomeScreen from './HomeScreen';


  const initialLayout = {color:"red", width: Dimensions.get('window').width };
  
  export default function OrderScreen({route,navigation}){
    const [order,setOrder]=useState([]);
    const [allorder,setAllOrder]=useState([]);
    const [shippedorder,setShippedOrder]=useState([]);
    const [historyorder,setHistoryOrder]=useState([]);
    const mountedRef = useRef(false);

    //const ip="http://192.168.0.16:8080"
    const ip="https://foodorder0705.herokuapp.com"
    
    //   const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {


    setRefreshing(true); 
    AsyncStorage.getItem('username', (err, result) => {
          
      const url0=ip+"/customer-allorder/"+result
      fetch(url0).then((response) => response.json())
      .then((json) => setAllOrder(json))
      .catch((error) => console.error(error));
      const url=ip+"/customer-allpreparationorder/"+result
      fetch(url).then((response) => response.json())
      .then((json) => setOrder(json))
      .catch((error) => console.error(error));

      const url1=ip+"/customer-allshippedorder/"+result
      fetch(url1).then((response) => response.json())
      .then((json) => setShippedOrder(json))
      .catch((error) => console.error(error));

      const url2=ip+"/customer-allhistoryorder/"+result
      fetch(url2).then((response) => response.json())
      .then((json) => setHistoryOrder(json))
      .catch((error) => console.error(error));
        })
        setRefreshing(false);
  },[])
  useFocusEffect(
    React.useCallback(() => {
      //alert('Screen was focused');
      AsyncStorage.getItem('username', (err, result) => {
          
        const url0=ip+"/customer-allorder/"+result
        fetch(url0).then((response) => response.json())
        .then((json) => {
          console.log(json)
          setAllOrder(json)




        })
        .catch((error) => console.error(error));
    const url=ip+"/customer-allpreparationorder/"+result
    fetch(url).then((response) => response.json())
    .then((json) => setOrder(json))
    .catch((error) => console.error(error));

    const url1=ip+"/customer-allshippedorder/"+result
    fetch(url1).then((response) => response.json())
    .then((json) => setShippedOrder(json))
    .catch((error) => console.error(error));

    const url2=ip+"/customer-allhistoryorder/"+result
    fetch(url2).then((response) => response.json())
    .then((json) => setHistoryOrder(json))
    .catch((error) => console.error(error));
      })
      // Do something when the screen is focused
      return () => {
        //alert('Screen was unfocused');
        console.log("its unfocused");
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
     useEffect(()=>{
     
        AsyncStorage.getItem('username', (err, result) => {
          
          const url0=ip+"/customer-allorder/"+result
          fetch(url0).then((response) => response.json())
          .then((json) => {
            console.log(json)
            setAllOrder(json)




          })
          .catch((error) => console.error(error));
      const url=ip+"/customer-allpreparationorder/"+result
      fetch(url).then((response) => response.json())
      .then((json) => setOrder(json))
      .catch((error) => console.error(error));

      const url1=ip+"/customer-allshippedorder/"+result
      fetch(url1).then((response) => response.json())
      .then((json) => setShippedOrder(json))
      .catch((error) => console.error(error));

      const url2=ip+"/customer-allhistoryorder/"+result
      fetch(url2).then((response) => response.json())
      .then((json) => setHistoryOrder(json))
      .catch((error) => console.error(error));
        })
      return () => {
        // The cleanup function of useEffect is called by React on unmount
       console.log("Clean up function")
      }
    },[]);
    

    const arrived=((item)=>{
      AsyncStorage.getItem('username', (err, result) => {
     
      const url=ip+"/updateorderarrived/"+item.order_id
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
      
      });
      const url2=ip+"/customer-allshippedorder/"+result
      fetch(url2).then((response)=>response.json()).then((json)=>setShippedOrder(json))
      .catch((error)=>console.error(error));
    })
    })
    const AreYouSure=((item)=>
  
    Alert.alert(
      'Confirm ',
      'Order is received ',
      [
        {
          text: 'Yes',
         onPress:()=>arrived(item)
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
    const FirstRoute = () => (
    
     

      <SafeAreaView style={styles.container}>
      <FlatList
       data={order}
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
      Order number: {item.order_id} {"\n"}{"\n"}
      
      Amount: {item.order_amount} RSD {"\n"}
     
      </Text>
      <Button title="See order details" onPress={() =>   navigation.navigate('OrderPreparationDetails', {
          data: item.order_id,
          otherParam: 'anything you want here',
        })}/>
        </View>
          
         
       )}
       keyExtractor={item=>item.order_id.toString()}
     />
     </SafeAreaView>
      );
      const SecondRoute = () => (
      <SafeAreaView style={styles.container}>
      <FlatList
       data={shippedorder}
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
     Order number: {item.order_id} {"\n"}{"\n"}
   
     Amount: {item.order_amount} {"\n"}
     </Text>
     <Button title="See order details" onPress={() =>   navigation.navigate('OrderDeliveryDetails', {
          data: item.order_id,
          otherParam: 'anything you want here',
        })}/>
        <Button title="Check as order received" onPress={()=>AreYouSure(item)}/>
        </View>
          
         
       )}
       keyExtractor={item=>item.order_id.toString()}
     />
     </SafeAreaView>
      );
      const ThirdRoot = () => (
        <SafeAreaView style={styles.container}>
        <FlatList
         data={historyorder}
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
     Order number: {item.order_id} {"\n"}{"\n"}
    
     Amount: {item.order_amount} {"\n"}
     </Text>
     <Button title="See order details" onPress={() =>   navigation.navigate('OrderHistoryDetails', {
          data: item.order_id,
          otherParam: 'anything you want here',
        })}/>
          </View>
            
           
         )}
        keyExtractor={item=>item.order_id.toString()}
       />
       </SafeAreaView>
        );

        const NultRoute = () => (
    
     

          <SafeAreaView style={styles.container}>
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
          Order number: {item.order_id} {"\n"}{"\n"}
          
          Amount: {item.order_amount} RSD {"\n"}
        
          </Text>
          <Button title="See order details" onPress={() =>   navigation.navigate('OrderDetails', {
          data: item.order_id,
          otherParam: 'anything you want here',
        })}/>
            </View>
              
             
           )}
           keyExtractor={item=>item.order_id.toString()}
         />
         </SafeAreaView>
          );
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      {key:'nult',title:'Orders'},
      { key: 'first', title: 'In preparation' },
      { key: 'second', title: 'In Delivery' },
      {
        key:'third',title:'History'
      }
    ]);
  
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
      third:ThirdRoot,
      nult:NultRoute
    });
 
    return (useCallback(() => mountedRef.current, []),
      <TabView
      
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
      
    );
  


}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  backgroundColor:'#7CBB00',
  },
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
});
