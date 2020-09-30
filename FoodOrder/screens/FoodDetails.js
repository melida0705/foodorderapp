import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View,Button ,Alert} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import  {AsyncStorage} from 'react-native'
import { MonoText } from '../components/StyledText';

export default function FoodScreen({route,navigation}) {
   const {data} = route.params
 //  const ip="http://192.168.0.16:8080";
   const ip="https://foodorder0705.herokuapp.com"
  const [food,setFood]=useState([]);
  const[cart,setCart]=useState([]);
//   const [isLoading, setLoading] = useState(true);
 useEffect(()=>{
  //  this.fetchData();

  const url=ip+"/food/"+data
  fetch(url).then((response) => response.json())
  .then((json) => setFood(json))
  .catch((error) => console.error(error));
  AsyncStorage.getItem('username', (err, result) => {
    // console.log(result);
   
   
     const url3=ip+"/cart/"+result;
     fetch(url3).then((response)=>response.json())
     .then((json)=>setCart(json))
     .catch((error)=>console.error(error));
   
   
   })
  
}, []);
const addToCart=((item)=>{
  var inCart=false;
 

  if(cart.length==0)
  {
    
     AsyncStorage.getItem('username', (err, result) => {
    //  console.log("username je"+result);
    
    
    
      const url=ip+"/addcart/"+result+"/"+item.restaurant_id+"/"+item.food_id+"/"+item.food_price
      console.log(url);
      fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          food_id: item.food_id,
          food_price:item.food_price
          
        })
        
      })
      Alert.alert(
        'Confirm ',
        'Added to cart',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
          
         
        ],
        { cancelable: false }
      )
    
    
    
    }
      )
     
   
  }
  
  if(cart.length>0){
    if(cart[0].restaurant_id!=item.restaurant_id)
    {
      console.log(cart[0].food_id);
      Alert.alert(
        'Confirm ',
        'You cannot order from different restaurant in the same time ',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
          
         
        ],
        { cancelable: false }
      )
    }
    else{
      console.log("Iznad asynd cmo")
       AsyncStorage.getItem('username', (err, result) => {
         console.log("ulazimo u petlju"+result);
      
    for(var i=0;i<cart.length;i++){
        if(cart[i].food_id==item.food_id && cart[i].username==result ){
           inCart=true;
               console.log(inCart+result)
          }

      }});

    
      
        AsyncStorage.getItem('username', (err, result) => {
          // console.log("username je"+result);
          // console.log("Nakon petlje"+inCart);
          if(inCart==false)
      {
     
          const url=ip+"/addcart/"+result+"/"+item.restaurant_id+"/"+item.food_id+"/"+item.food_price
         fetch(url, {
         method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          food_id: item.food_id,
          food_price:item.food_price
          
        })
        
      })
      Alert.alert(
        'Confirm ',
        'Inserted in cart ',
        [
          {
            text: 'Ok',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel'
          }
          
         
        ],
        { cancelable: false }
      )
      console.log("we are checking if its not in cart already")
         }
         else if(inCart){
          Alert.alert(
            'Confirm ',
            'Already in the cart ',
            [
              {
                text: 'Ok',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
              }
              
             
            ],
            { cancelable: false }
          )
        
      
        } })
    
    
  }
  

}
  
})
return(
    <View style={styles.container}> 
      
    <FlatList
    data={food}
   
    renderItem={({item}) => (
      <View
        //elevation={2}
        style={{
          flex: 1,
          flexDirection: "column",
          backgroundColor: "#ffffff",
         
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
              backgroundColor: "#ccc",
              
             marginBottom:5,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              borderRadius: 6
            }}
            source={{uri:item.food_image}}
          />
         
        <Text style={{
       
        marginHorizontal: 24,
        marginVertical: 8,
        padding:10,
        fontSize:20,color:"black"
       
      }}>
         Name: {item.food_name}{'\n'}{'\n'}
         Description: {item.food_description}{'\n'}{'\n'}
            Price: {item.food_price}
      </Text>
      
         
      <Button style={{height:50,padding:10,width:100,marginLeft:10,borderRadius:5,color:"black"} } title="Add to cart" onPress={
        ()=>addToCart(item)
      }/>
      </View>
    
   
    )
  }
    keyExtractor={item=>item.food_id.toString()}
    
  />
   
   </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  
}});
