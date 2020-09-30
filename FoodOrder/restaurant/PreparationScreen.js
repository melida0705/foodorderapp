import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text,Dimensions, TouchableOpacity,Button, View,RefreshControl,SafeAreaView } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';
import {useFocusEffect} from '@react-navigation/native';


  const initialLayout = {color:"red", width: Dimensions.get('window').width };
  
  export default function PreparationScreen({route,navigation}){
    const [order,setOrder]=useState([]);
    const [preparationOrder,setShippedOrder]=useState([]);
  //  const ip="http://192.168.0.16:8080"
    const ip="https://foodorder0705.herokuapp.com"
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(async() => {
  
  
      setRefreshing(true);
      AsyncStorage.getItem('username', (err, result) => {
        fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
        .then((json)=>
        {
          console.log(json[0].restaurant_id)
          const url1=ip+"/seller-allpreparationorder/"+json[0].restaurant_id
          fetch(url1).then((response) => response.json())
          .then((json) => setShippedOrder(json))
          .catch((error) => console.error(error));
       
        })
   
   
   
     })
   
   
   
   
    
    setRefreshing(false)
    })
    //   const [isLoading, setLoading] = useState(true);
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
          const url1=ip+"/seller-allpreparationorder/"+json[0].restaurant_id
          fetch(url1).then((response) => response.json())
          .then((json) => setShippedOrder(json))
          .catch((error) => console.error(error));
       
        })
   
   
   
     })
      
      
    }, []);
    useFocusEffect(
     
        React.useCallback(() => {
          //alert('Screen was focused');
          // Do something when the screen is focused
          AsyncStorage.getItem('username', (err, result) => {
            fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
            .then((json)=>
            {
              console.log(json[0].restaurant_id)
              const url1=ip+"/seller-allpreparationorder/"+json[0].restaurant_id
              fetch(url1).then((response) => response.json())
              .then((json) => setShippedOrder(json))
              .catch((error) => console.error(error));
           
            })
          return () => {
            //alert('Screen was unfocused');
            console.log("its unfocused")
            // Do something when the screen is unfocused
            // Useful for cleanup functions
          };
        }, [])
      })
    );
  
    const sendToDelivery=((item)=>{
     
      const url=ip+"/updateorderdelivery/"+item.order_id
      fetch(url, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
       
      });
      AsyncStorage.getItem('username', (err, result) => {
        fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
        .then((json)=>
        {
          console.log(json[0].restaurant_id)
          const url1=ip+"/seller-allpreparationorder/"+json[0].restaurant_id
          fetch(url1).then((response) => response.json())
          .then((json) => setShippedOrder(json))
          .catch((error) => console.error(error));
       
        })
   
   
   
     })
    })
    // const FirstRoute = () => (
    //   <View>
    //   <FlatList
    //    data={order}
    //    renderItem={({item}) => ( 
        
    //     <View
    //     //elevation={2}
    //     style={{
    //       flex: 1,
    //       flexDirection: "row",
    //       backgroundColor: "#ffffff",
    //       marginHorizontal: 24,
    //       marginVertical: 8,
    //       borderRadius: 4,
    //       shadowOpacity: 0.1,
    //       shadowRadius: 2,
    //       shadowOffset: {
    //         height: 1,
    //         width: 1
    //       }
    //     }}
    //   >
    //     <Image
    //       style={{
    //         width: 130,
    //         height: 170,
    //         borderTopLeftRadius: 4,
    //         borderTopRightRadius: 0,
    //         borderBottomRightRadius: 0,
    //         borderBottomLeftRadius: 4
    //       }}
    //       source={{ uri: item.food_image }}
    //     />
    //     </View>
          
         
    //    )}
    //    keyExtractor={item=>item.order_id.toString()}
    //  />
    //  </View>
    //   );
    //   const SecondRoute = () => (
    //     <View>
    //   <FlatList
    //    data={shippedorder}
    //    renderItem={({item}) => ( 
        
    //     <View
    //     //elevation={2}
    //     style={{
    //       flex: 1,
    //       flexDirection: "row",
    //       backgroundColor: "#ffffff",
    //       marginHorizontal: 24,
    //       marginVertical: 8,
    //       borderRadius: 4,
    //       shadowOpacity: 0.1,
    //       shadowRadius: 2,
    //       shadowOffset: {
    //         height: 1,
    //         width: 1
    //       }
    //     }}
    //   >
    //     <Image
    //       style={{
    //         width: 130,
    //         height: 170,
    //         borderTopLeftRadius: 4,
    //         borderTopRightRadius: 0,
    //         borderBottomRightRadius: 0,
    //         borderBottomLeftRadius: 4
    //       }}
    //       source={{ uri: item.food_image }}
    //     />
    //     </View>
          
         
    //    )}
    //    keyExtractor={item=>item.restaurant_id.toString()}
    //  />
    //  </View>
    //   );
    //   const ThirdRoot = () => (
    //     <View>
    //     <FlatList
    //      data={order}
    //      renderItem={({item}) => ( 
          
    //       <View
    //       //elevation={2}
    //       style={{
    //         flex: 1,
    //         flexDirection: "row",
    //         backgroundColor: "#ffffff",
    //         marginHorizontal: 24,
    //         marginVertical: 8,
    //         borderRadius: 4,
    //         shadowOpacity: 0.1,
    //         shadowRadius: 2,
    //         shadowOffset: {
    //           height: 1,
    //           width: 1
    //         }
    //       }}
    //     >
    //       <Image
    //         style={{
    //           width: 130,
    //           height: 170,
    //           borderTopLeftRadius: 4,
    //           borderTopRightRadius: 0,
    //           borderBottomRightRadius: 0,
    //           borderBottomLeftRadius: 4
    //         }}
    //         source={{ uri: item.food_image }}
    //       />
    //       </View>
            
           
    //      )}
    //     keyExtractor={item=>item.order_id.toString()}
    //    />
    //    </View>
    //     );
    // const [index, setIndex] = React.useState(0);
    // const [routes] = React.useState([
    //   { key: 'first', title: 'Orders' },
    //   { key: 'second', title: 'In Preparation' },
    //   {
    //     key:'third',title:'In Delivery'
    //   }
    // ]);
  
    // const renderScene = SceneMap({
    //   first: FirstRoute,
    //   second: SecondRoute,
    //   third:ThirdRoot
    // });
  
    return (
      <View>
      <FlatList
       data={preparationOrder}
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
      ><Text   style={{
       
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
        <Button title="See order details" onPress={() =>  navigation.navigate('OrderPreparationDetailsScreen', {
          data: item.order_id,
          otherParam: 'anything you want here',})}
         /> 
        
        </View>
          
         
       )}
      keyExtractor={item=>item.order_id.toString()}
     />
     </View>
      
    );
  


}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  
  }, 
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
