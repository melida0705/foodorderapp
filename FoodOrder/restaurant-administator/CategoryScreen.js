import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,Alert,RefreshControl,SafeAreaView} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import  {AsyncStorage} from 'react-native'

export default function MenuScreen({route,navigation}) {
  //const { data } = route.params
  const [menu,setMenu]=useState([]);
  const[category,setCategory]=useState([]);

  const[foodcat,setFoodCat]=useState([]);
  var count = Object.keys(category).length;
//const ip="http://192.168.0.16:8080"
  const url2=ip+"/restaurantcategory/5"
  const ip="https://foodorder0705.herokuapp.com"
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {


    setRefreshing(true);
    AsyncStorage.getItem('username', (err, result) => {
      fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
      .then((json)=>
      {
      
      const url2=ip+"/restaurantcategory/"+json[0].restaurant_id
      fetch(url2).then((response)=>response.json())
      .then((json)=>setCategory(json))
      .catch((error)=>console.error(error));
      })})
      setRefreshing(false);
  },[])
//   const [isLoading, setLoading] = useState(true);
 useEffect(()=>{
  //  this.fetchData();

//   const url=ip+"/menu/"+data
//   fetch(url).then((response) => response.json())
//   .then((json) => setMenu(json))
//   .catch((error) => console.error(error));
AsyncStorage.getItem('username', (err, result) => {
  fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
  .then((json)=>
  {
  
  const url2=ip+"/restaurantcategory/"+json[0].restaurant_id
  fetch(url2).then((response)=>response.json())
  .then((json)=>setCategory(json))
  .catch((error)=>console.error(error));
  })})
  
}, []);
 
// const itemcart={
//   food:data,
//   quantity:1,
//   price:data.food_price,
// }
const dodajKategoriju=idRestorana=>{
  navigation.push("CategoryAdd",{
    
   })
  
}
const removeCategory=((item)=>{
  AsyncStorage.getItem('username', (err, result) => {
    fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
    .then((json)=>
    {
    const url=ip+"/deletecategory/"+json[0].restaurant_id+"/"+item.category_id
    fetch(url, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        category_id: item.category_id
      
        
      })
    })
    const url2=ip+"/restaurantcategory/"+json[0].restaurant_id
    
    fetch(url2).then((response)=>response.json()).then((json)=>setCategory(json))
    .catch((error)=>console.error(error));
  })
  })
  })
  const dodajHranu=((item)=>{
    navigation.push("FoodAdd",{
      foodcategoryid:item.category_id,
     })
    
  })
  const AreYouSure=((item)=>
  
  Alert.alert(
    'Confirm ',
    'Are you sure you want to delete '+item.category_name,
    [
      {
        text: 'Yes',
       onPress:()=>removeCategory(item)
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
    <Button
                onPress={()=>dodajKategoriju()}
                title="Add new"
                style={{
                  flex: 1,
                  backgroundColor: "4099ff",
                  color: "#fff",
                   
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              />
    <FlatList
    data={category}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    keyExtractor={item=>item.category_id.toString()}
    renderItem={({ item }) => (
      <View>
    
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
            source={{ uri: item.category_image }}
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
              Category: {item.category_name}
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
              title="Add to menu"
              style={{
                flex: 1,
                backgroundColor: "4099ff",
                color: "#fff",          
                paddingTop: 8,
                paddingBottom: 8
              }}
              onPress={()=> dodajHranu(item)}/>
             
              <Button
              title="Edit Category"
              style={{
                flex: 1,
                backgroundColor: "4099ff",
                color: "#fff",          
                paddingTop: 8,
                paddingBottom: 8
              }}
              onPress={()=> navigation.navigate('CategoryEdit', {
                categoryid:item.category_id,
                categoryname: item.category_name,
                categoryimage: item.category_image,
                })}/>
             
              <Button
                onPress={()=>AreYouSure(item)}
                title="Delete Category"
                style={{
                  flex: 1,
                  backgroundColor: "4099ff",
                  color: "#fff",
                   
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              />
              

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
    backgroundColor: '#fff',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

