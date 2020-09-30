import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState,useCallback,useRef } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,RefreshControl,SafeAreaView} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import  {AsyncStorage} from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from '../navigation/BottomTabNavigator';
import TabBarIcon from '../components/TabBarIcon';
import LinkingConfiguration from '../navigation/LinkingConfiguration';
export default function CategoryScreen({route,navigation}){
  const Stack = createStackNavigator();
  const { data } = route.params
  const [menu,setMenu]=useState([]);
  const[category,setCategory]=useState([]);
  const[foodcat,setFoodCat]=useState([]);
  var count = Object.keys(category).length;
  
  const ip="https://foodorder0705.herokuapp.com"
  const mountedRef=useRef(false);
 // const ip="http://192.168.0.16:8080";
//   const [isLoading, setLoading] = useState(true);
const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {


    setRefreshing(true); 
    const url2=ip+"/restaurantcategory/"+data
    fetch(url2).then((response)=>response.json())
    .then((json)=>setCategory(json))
    .catch((error)=>console.error(error));
    setRefreshing(false);
  },[])
 useEffect(()=>{
  //  this.fetchData();
 mountedRef.current=true;
 // const signal=abortController.signal;
  //console.log(data);

  const url2=ip+"/restaurantcategory/"+data
  fetch(url2).then((response)=>response.json())
  .then((json)=>setCategory(json))
  .catch((error)=>console.error(error));
 
  return ()=>{
    mountedRef.current=false;
  }
  
}, []);


 
// const itemcart={
//   food:data,
//   quantity:1,
//   price:data.food_price,
// }


return(
  
  
    <SafeAreaView style={styles.container} > 
    
    <FlatList
    data={category}
    keyExtractor={item=>item.category_id.toString()}
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }
    renderItem={({ item }) => (
      <View>
      <TouchableOpacity onPress={() => {
        /* 1. Navigate to the Details route with params */
        navigation.navigate('CategoryMenuScreen', {
          data: item.category_id,
          otherParam: 'anything you want here',
        })}}>
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
            shadowRadius: 3,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          <Image
            style={{
              width: "100%",
              height: 180,
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
             
              {item.category_name}
            </Text>
            
           
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between"
               // width: "100%"
              }}
            >
             
              
             
         

            </View>
          </View>
        </View>
      </TouchableOpacity>
     
      
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
    backgroundColor: '#F7F7F7',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

 