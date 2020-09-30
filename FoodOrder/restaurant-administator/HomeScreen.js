import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View,Button ,Alert,RefreshControl,SafeAreaView} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { AsyncStorage } from 'react-native';
import { MonoText } from '../components/StyledText';

export default function FoodScreen({route,navigation}) {
  // const {data} = route.params
   const ip="https://foodorder0705.herokuapp.com";
   
  const [food,setFood]=useState([]);
  const [restaurantid,setRestaurantID]=useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {


    setRefreshing(true);
    AsyncStorage.getItem('username', (err, result) => {
      fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
      .then((json)=>
      {
        console.log(json[0].restaurant_id)
       setRestaurantID(json[0].restaurant_id);
       const url=ip+"/restaurantfood/"+json[0].restaurant_id
       fetch(url).then((response) => response.json())
       .then((json) => setFood(json))
       .catch((error) => console.error(error));
     
      })
    })
    setRefreshing(false);
 
 
  },[])
//   const [isLoading, setLoading] = useState(true);
 useEffect(()=>{
  //  this.fetchData();
  AsyncStorage.getItem('username', (err, result) => {
     fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
     .then((json)=>
     {
       console.log(json[0].restaurant_id)
      setRestaurantID(json[0].restaurant_id);
      const url=ip+"/restaurantfood/"+json[0].restaurant_id
      fetch(url).then((response) => response.json())
      .then((json) => setFood(json))
      .catch((error) => console.error(error));
    
     })



  })
  // console.log("Ovo je id"+restaurantid)
  // AsyncStorage.setItem('restaurantID',restaurantid);
  // AsyncStorage.getItem('restaurantID',(err,result)=>
  // {
  //   console.log("Sad smo pokupili id"+result)
  // })
  
 
  
}, []);
const dodajHranu=idRestorana=>{
  navigation.push("FoodAdd",{
   })
  
}
const editHrana=idRestorana=>{
  navigation.push("FoodEdit",{
   })
  
}
const removeFood=((item)=>{
    const url=ip+"/deletefood/"+item.restaurant_id+"/"+item.food_id
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
    const url1=ip+"/restaurantfood/"+item.restaurant_id
    fetch(url1).then((response) => response.json())
    .then((json) => setFood(json))
    .catch((error) => console.error(error));
 
  })
  const AreYouSure=((item)=>
  
  Alert.alert(
    'Confirm ',
    'Are you sure you want to delete '+item.food_name,
    [
      {
        text: 'Yes',
       onPress:()=>removeFood(item)
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
    <Button title="Logout" onPress={()=>navigation.navigate("Root")}/>
    <FlatList
    data={food}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    keyExtractor={item=>item.food_id.toString()}
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
              height: 176,
              borderTopLeftRadius: 4,
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderBottomLeftRadius: 4
            }}
            source={ { uri: item.food_image }}
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
                  color: "#ef6136",
                  paddingTop:5
                }}
              >
                {item.food_price} RSD
                
              </Text>
              
              <Button
                onPress={()=>AreYouSure(item)}
                title="Delete"
                style={{
                  flex: 1,
                  backgroundColor: "4099ff",
                  color: "#fff",
                   
                  paddingTop: 8,
                  paddingBottom: 8
                }}
              />
              <Button
              title="Edit"
              style={{
                flex: 1,
                backgroundColor: "4099ff",
                color: "#fff",
                 
                paddingTop: 8,
                paddingBottom: 8
              }}
              onPress={()=>{  navigation.navigate('FoodEdit', {
                foodcategoryid:item.food_category_id.toString(),
                foodrestaurant:item.restaurant_id.toString(),
                foodid: item.food_id,
                foodname: item.food_name,
                fooddescription:item.food_description,
                foodprice:item.food_price.toString(),
                foodimage:item.food_image
              })}}/>

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

 