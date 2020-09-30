import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,Alert, ActivityIndicatorComponent,RefreshControl,SafeAreaView} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import  {AsyncStorage} from 'react-native'
import Constants from 'expo-constants';
export default function CategoryMenuScreen({route,navigation}) {
  const { data } = route.params
  const [menu,setMenu]=useState([]);
  const[category,setCategory]=useState([]);
  const[food,setFood]=useState([]);
  const[foodcat,setFoodCat]=useState([]);
  const[cart,setCart]=useState([]);
  var count = Object.keys(category).length;
 // const ip="http://192.168.0.16:8080";
  const ip="https://foodorder0705.herokuapp.com"
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {


    setRefreshing(true);
    AsyncStorage.getItem('username', (err, result) => {
      // console.log(result);
     
     
       const url3=ip+"/cart/"+result;
       fetch(url3).then((response)=>response.json())
       .then((json)=>setCart(json))
       .catch((error)=>console.error(error));
     
     
     })
   
     const url=ip+"/foodcategory/"+data
     fetch(url).then((response) => response.json())
     .then((json) => setMenu(json))
     .catch((error) => console.error(error));
    
     const url2=ip+"/category"
     fetch(url2).then((response)=>response.json())
     .then((json)=>setCategory(json))
     .catch((error)=>console.error(error));
  setRefreshing(false);   
  
  
  
  },[])
//   const [isLoading, setLoading] = useState(true);
 useEffect(()=>{
  //  this.fetchData();
  AsyncStorage.getItem('username', (err, result) => {
   // console.log(result);
  
  
    const url3=ip+"/cart/"+result;
    fetch(url3).then((response)=>response.json())
    .then((json)=>setCart(json))
    .catch((error)=>console.error(error));
  
  
  })
  AsyncStorage.getItem('username', (err, result) => {
    console.log("username je"+result);
  
  const url=ip+"/favorite/"+result
  
  fetch(url).then((response) => response.json())
  .then((json) => setFood(json))
  .catch((error) => console.error(error));
  })
  const url=ip+"/foodcategory/"+data
  fetch(url).then((response) => response.json())
  .then((json) => setMenu(json))
  .catch((error) => console.error(error));
 
  const url2=ip+"/category"
  fetch(url2).then((response)=>response.json())
  .then((json)=>setCategory(json))
  .catch((error)=>console.error(error));
  
  
}, []);
 
// const itemcart={
//   food:data,
//   quantity:1,
//   price:data.food_price,
// }

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
      const url3=ip+"/cart/"+result;
      fetch(url3).then((response)=>response.json())
      .then((json)=>setCart(json))
      .catch((error)=>console.error(error));
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
        'You cannot order from different restaurant in the same time '+item.category_name,
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
      const url3=ip+"/cart/"+result;
      fetch(url3).then((response)=>response.json())
      .then((json)=>setCart(json))
      .catch((error)=>console.error(error));
      Alert.alert(
        'Confirm ',
        'Added to cart ',
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
const addToFavorite=((item)=>{
  var inCart=false;
  if(food.length==0)
  {
    
    AsyncStorage.getItem('username', (err, result) => {
      //console.log(result);
  
    const url=ip+"/addfavorite/"+result+"/"+item.food_id
    console.log(url)
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        food_id: item.food_id
      
        
      })
    
    
  })
 
    console.log("username je"+result);
  
  const url1=ip+"/favorite/"+result
  
  fetch(url1).then((response) => response.json())
  .then((json) => setFood(json))
  .catch((error) => console.error(error));
  
      Alert.alert(
        'Confirm ',
        'Added to favorite',
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
  
  if(food.length>0){
   
    
      console.log("Iznad asynd cmo")

       AsyncStorage.getItem('username', (err, result) => {
         console.log("ulazimo u petlju"+result);
      
    for(var i=0;i<food.length;i++){
        if(food[i].food_id==item.food_id && food[i].username==result ){
           inCart=true;
               console.log(inCart+result)
          }

      }});

    
      
        AsyncStorage.getItem('username', (err, result) => {
          // console.log("username je"+result);
          // console.log("Nakon petlje"+inCart);
          if(inCart==false)
      {
     
        const url=ip+"/addfavorite/"+result+"/"+item.food_id
        console.log(url)
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            food_id: item.food_id
          
            
          })
        
      })
      const url1=ip+"/favorite/"+result
  
  fetch(url1).then((response) => response.json())
  .then((json) => setFood(json))
  .catch((error) => console.error(error));
      Alert.alert(
        'Confirm ',
        'Added to favorite ',
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
            'Already added to favorite ',
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
  






})
return(
    <SafeAreaView style={styles.container}> 
    {/* <FlatList
    data={category}
    keyExtractor={item=>item.category_id.toString()}
    numColumns={5}
    renderItem={({ item }) => (
      
      <View>
      <TouchableOpacity   style={{backgroundColor:"green"}}   
      >
      <Text style={{padding:16,marginRight:4,color:"white"}}>{item.category_name}</Text>
      </TouchableOpacity>
      </View>
    )}/>   */}
    <FlatList
    data={menu}
    keyExtractor={item=>item.food_id.toString()}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    renderItem={({ item }) => (
      <View>
     
          <View
          //elevation={2}
          style={{
            flex: 1,
            flexDirection: "column",
            backgroundColor: "#ffffff",
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.4,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 170,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4
            }}
            source={{ uri: item.food_image }}
          />
          <View
            style={{
              padding: 16,
              flexDirection: "row",
            }}
          >
            <View>
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
              {item.food_description}
            </Text>
            <Text
                style={{
                  paddingTop:5,
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "#ef6136"
                }}
              >
                {item.food_price} RSD
                
              </Text>
            </View>
           
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "center",
                marginLeft:15
               // width: "100%"
              }}
            >
              
              
              <Button
                onPress={()=>addToCart(item)}
                title="Add to cart"
                style={{
                 
                  backgroundColor: "4099ff",
                  color: "#fff",
                   
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              />
              <Button
              title="Add Favorite"
              style={{
                flex: 1,
                backgroundColor: "4099ff",
                color: "#fff",
                 
                paddingTop: 8,
                paddingBottom: 8
              }}
              onPress={()=>addToFavorite(item)}/>

            </View>
          </View>
        </View>
    
     
      
     </View>
    )}
  />
   </SafeAreaView>
)
      }
//   return (
    
//     <View style={styles.container}>
        
    //   <FlatList
    //       data={data}
    //       keyExtractor={({ id }, index) => id}
    //       renderItem={({ item }) => (
    //         <View>
               
      
    //         <Text>{item.food_name}</Text>
    //        </View>
    //       )}
    //     /> 
//         </View>
//         );
// }

// DetailsScreen.navigationOptions = {
//   header: null,
// };



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7'
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

 