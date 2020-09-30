import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import  {AsyncStorage} from 'react-native'

export default function MenuScreen({route,navigation}) {
  const { data } = route.params
  const [menu,setMenu]=useState([]);
  const[category,setCategory]=useState([]);
  const[foodcat,setFoodCat]=useState([]);
  var count = Object.keys(category).length;
 // const ip="http://192.168.0.16:8080";
  const ip="https://foodorder0705.herokuapp.com"
//   const [isLoading, setLoading] = useState(true);
 useEffect(()=>{
  //  this.fetchData();

  const url=ip+"/menu/"+data
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
  const url=ip+"/addcart/melida/"+item.restaurant_id+"/"+item.food_id+"/"+item.food_price
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
  console.log(item.restaurant_id)
  console.log(item.food_id)
  console.log(item.food_price)
  console.log(url)
  
  
})
const addToFavorite=((item)=>{
  const url=ip+"/addfavorite/melida/"+item.food_id
  fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      food_id: item.food_id
    
      
    })
  });
})
return(
    <View> 
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
    renderItem={({ item }) => (
      <View>
      <TouchableOpacity onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate('Food', {
          data: item.food_id,
          otherParam: 'anything you want here',
        })}}>
          <View
          //elevation={2}
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
              width: 130,
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
              {item.food_description}
            </Text>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between"
               // width: "100%"
              }}
            >
              <Text
                style={{
                  fontSize: 21,
                  fontWeight: "bold",
                  color: "#ef6136"
                }}
              >
                {item.food_price}
                
              </Text>
              
              <Button
                onPress={()=>addToCart(item)}
                title="Add to cart"
                style={{
                  flex: 1,
                  backgroundColor: "4099ff",
                  color: "#fff",
                   
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              />
              <Button
              title="Favorite"
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
      </TouchableOpacity>
     
      
     </View>
    )}
  />
   </View>
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
    backgroundColor: '#fff',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

 