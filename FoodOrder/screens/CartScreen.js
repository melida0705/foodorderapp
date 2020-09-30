import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity,Button, View,RefreshControl,SafeAreaView,Alert } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import {useFocusEffect} from '@react-navigation/native';

const wait = (timeout) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
export default function CartScreen({route,navigation}){
  
  const [refreshing, setRefreshing] = React.useState(false);
  const [quantity,setQuantity]=useState();
  const[orderAmount,setOrderAmount]=useState('');
  const onRefresh = React.useCallback(async() => {
    setRefreshing(true);
    
   
    AsyncStorage.getItem('username', (err, result) => {
      console.log("username je"+result);
    const url=ip+"/cart/"+result;
    fetch(url).then((response) => response.json())
    .then((json) => {setCart(json)
      setRefreshing(false);})
    .catch((error) => console.error(error));
  
  
  })
 
    var total=0;
    for(var i=0;i<cart.length;i++){
   total=total+cart[i].price;
 
    }
    setOrderAmount(total.toString()); 
   
  }, []);

  const [cart,setCart]=useState([]);
  // if(cart.length==0){
  //   return(
  //     <SafeAreaView  style={styles.container}>
  //        <ScrollView
  //       contentContainerStyle={styles.scrollView}
  //       refreshControl={
  //         <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  //       }
  //     >
  //       <Text>Pull down to see RefreshControl indicator</Text>
  //     </ScrollView>
  //     </SafeAreaView>
  //   )
  // }
 
  //const ip="http://192.168.0.16:8080";
 const ip="https://foodorder0705.herokuapp.com"
  //   const [isLoading, setLoading] = useState(true);
   useEffect(()=>{
    //  this.fetchData();
    AsyncStorage.getItem('username', (err, result) => {
      console.log("username je"+result);
    const url=ip+"/cart/"+result
    fetch(url).then((response) => response.json())
    .then((json) => {setCart(json),setRefreshing(false)})
    .catch((error) => console.error(error));})
   
    var total=0;
    var qu=[]
    for(var i=0;i<cart.length;i++){
   total=total+cart[i].price;
   
  
  
    }
    
    setOrderAmount(total.toString());
   
         
    
  }, [refreshing]);
  const handleCheckout=((item)=>
  {
    var total=0;
    for(var i=0;i<cart.length;i++){
   total=total+cart[i].price*cart[i].quantity;
   console.log(total)
    }

    const url=ip+"/update-cart/"
    console.log(url)
    fetch(url,{
      method:'PUT',
      headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart:cart,
            
            
            
            
          })

    })

    navigation.navigate("Checkout",
    {
      
     amount: total,
     otherParam: 'anything you want here',
   })
   
  })
  const handleQuantityInput=(textQuantity)=>{
    setQuantity(textQuantity);

  }
  const increaseQuantity=((item)=>
  {
    var num=Number(item.quantity)+1;
    console.log(item.id)
    for(var i=0;i<cart.length;i++){
      if(cart[i].id==item.id)
      {
        cart[i].quantity=num;
        console.log("Id hrane"+cart[i].quantity)
      }
    }
  
    setQuantity(num.toString())
  })
  const decreaseQuantity=(item)=>
  {
    var num=Number(quantity)-1;
    for(var i=0;i<cart.length;i++){
      if(cart[i].id==item.id)
      {
        cart[i].quantity=num;
        console.log("Id hrane"+cart[i].quantity)
      }
    }
    setQuantity(num.toString())
  }
  const removeCart=((item)=>{
    AsyncStorage.getItem('username', (err, result) => {
      const url=ip+"/deletecart/"+result+"/"+item.food_id
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
  
  })
 
  AsyncStorage.getItem('username', (err, result) => {
    AsyncStorage.getItem('username', (err, result) => {
      console.log("username je"+result);
    const url=ip+"/cart/"+result
    fetch(url).then((response) => response.json())
    .then((json) => {setCart(json),setRefreshing(false)})
    .catch((error) => console.error(error));})
   
    var total=0;
    for(var i=0;i<cart.length;i++){
   total=total+cart[i].price;
    }
    setOrderAmount(total.toString());

})
    // const url1=ip+"/cart/"+'melida'
    // fetch(url1).then((response) => response.json())
    // .then((json) => setCart(json))
    // .catch((error) => console.error(error));
  })
  useFocusEffect(
    React.useCallback(() => {
     // alert('Screen was focused');
      AsyncStorage.getItem('username', (err, result) => {
        console.log("username je"+result);
      const url=ip+"/cart/"+result;
      fetch(url).then((response) => response.json())
      .then((json) => {setCart(json)
        setRefreshing(false);})
      .catch((error) => console.error(error));
    
    
    })
   
      var total=0;
      for(var i=0;i<cart.length;i++){
     total=total+cart[i].price;
   
      }
      setOrderAmount(total.toString()); 
      // Do something when the screen is focused
      return () => {
        console.log("its unfocused");
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
  const AreYouSure=((item)=>
  
  Alert.alert(
    'Confirm ',
    'Are you sure you want to remove from cart ',
    [
      {
        text: 'Yes',
       onPress:()=>removeCart(item)
      },
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
      
    ],
    { cancelable: false }
  ));
return(
  
      <SafeAreaView style={styles.container}
     >

    
     <FlatList
          data={cart}
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
              width: 108,
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
            
            <Text
              style={{
                fontSize: 14,
                color: "#999"
              }}
            >
              
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
                //width: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "#ef6136"
                }}
              >
               RSD {item.food_price}
              </Text>
              </View>
              <View
              style={{
                flex: 1,
                flexDirection: "row",
                justifyContent: "space-between"
                //width: "100%"
              }}
            >
              <TouchableOpacity 
             
             
                onPress={()=>decreaseQuantity(item)} >
                <Text style={{fontSize:30,marginTop:1}}>
                  -
                </Text>
                  </TouchableOpacity>
            
            
              <TextInput name="kolicina" onChangeText={handleQuantityInput} value={item.quantity.toString()}  style={{ height: 30, margin:4, padding:8, width:30,borderColor: 'gray', borderWidth: 0.5 }}/>
    
              
              <TouchableOpacity
              
               
                onPress={()=>increaseQuantity(item)}
             >
                <Text style={{fontSize:30,marginTop:1}}>
                  +
                </Text>
             </TouchableOpacity>
            <TouchableOpacity  style={{alignSelf: 'center'}} onPress={()=>AreYouSure(item)}>
            <Text style={{fontSize:18,marginLeft:30}}>Remove</Text>
            </TouchableOpacity>
            </View>
          </View>
              </View> 
          
                   
            
          )}
          keyExtractor={item=>item.id.toString()}
        />
        
          
        <Button disabled={cart.length==0}  onPress={()=>handleCheckout(cart)} style={{ flexDirection:"row",
           
            
            height:50,
            borderRadius:6,
            marginHorizontal: 24,
            marginVertical: 8,
            padding:10,
           alignContent:'center',justifyContent: 'center',
           alignItems: 'center',
            shadowOffset: {
              height: 1,
              width: 1
            }}}
            title="Proceed to checkout"/>
          
          </SafeAreaView>
  
)

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa'
  
}, scrollView: {
  flex: 1,
 
 
},});
