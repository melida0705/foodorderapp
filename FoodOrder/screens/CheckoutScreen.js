import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity,Button, View,Alert,SafeAreaView } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';

export default function CheckoutScreen({route,navigation})


{
    const [shipName,setShipName]=useState('');
    const [address,setAddress]=useState('');
    const [cart,setCart]=useState([]);
    const { amount } = route.params;
    const[orderAmount,setOrderAmount]=useState('');
   // const ip="http://192.168.0.16:8080";
    const ip="https://foodorder0705.herokuapp.com"
    useEffect(()=>{
        //  this.fetchData();
        AsyncStorage.getItem('username', (err, result) => {
          
        
        const url=ip+"/cart/"+result
        fetch(url).then((response) => response.json())
        .then((json) => setCart(json))
        .catch((error) => console.error(error));})
        var total=0;
 for(var i=0;i<cart.length;i++){
total=total+cart[i].price;
 }
 setOrderAmount(total.toString());
       
        
      }, []);
    
    const Poruci=(item)=>{
    // const url=ip+"/place-order/melida/asmir/"+item.food_id+"/"+shipName+"/"+address
    // fetch(url, {
    //   method: 'POST',
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json'
    //   }
     
        
    //    })
    if(address.length==0)
    {
      alert("Enter delivery address")
      return;
    }
    AsyncStorage.getItem('username', (err, result) => {
      //console.log("username je"+result);
    
    const url=ip+"/place-order/"+result+"/"+amount
    console.log(url)
    fetch(url,{
      method:'POST',
      headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            cart:cart,
            address:address,
            shipName:shipName
            
            
            
          })

    })})
    Alert.alert(
      'Info',
      'Order is placed,you can track your order status in Orders section',
      [
        {
          text: 'Ok',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        }
        
       
      ],
      { cancelable: false }
      
    )
    navigation.navigate("ClientScreen"
    )
   
    console.log(cart);
    console.log(amount);
       
    };
    const nameInputHandler=(textinput)=>{
        setShipName(textinput);
    }
    const adressInputHandler=(addressinput)=>
    {
        setAddress(addressinput);
    }
    const AreYouSure=((item)=>
  
    Alert.alert(
      'Confirm ',
      'Place order',
      [
        {
          text: 'Yes',
         onPress:()=>Poruci(item)
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
     <SafeAreaView style={styles.container} >
         <TextInput style={{height:30,borderBottomColor:'gray',borderBottomWidth:1, marginHorizontal: 30,marginTop:20}} placeholder="Delivery Address" onChangeText={adressInputHandler} value={address} ></TextInput>
        
        <FlatList
          data={cart}
          renderItem={({item}) => (
          
                <View
          //elevation={2}
          style={{
            flex: 1,
            flexDirection: "row",
            backgroundColor: "#ffffff",
            marginHorizontal: 30,
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
           <View
            style={{
              marginHorizontal:10,
              marginVertical:10,
            }}
          >
             <Text
              style={{
                fontSize: 18,
                color: "#333",
              }}
            >
              {item.food_name}
            </Text>
            
            <Text
              style={{
                fontSize: 14,
                color: "#999",
                paddingTop:10
              }}
            >
              price:{item.price} RSD
              
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#999",
                paddingTop:10
              }}
            >
              quantity: {item.quantity}
              
              
            </Text>
            <Text
              style={{
                fontSize: 14,
                color: "#999",
                paddingTop:10
              }}
            >
              subtotal: {item.quantity} x {item.price}RSD={item.quantity*item.price}RSD
              
              
            </Text>
            </View>
          </View> 
         
          )}
          keyExtractor={item=>item.food_id.toString()}
          />
          <Text  style={{
                fontSize: 18,
                color: "#999",
                paddingTop:10,
                marginHorizontal:30
              }}> 
            Total: 
          {amount} RSD
        </Text>
            <Button title="Place Order" onPress={()=>AreYouSure(cart)}/>
       

    </SafeAreaView>
)
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});