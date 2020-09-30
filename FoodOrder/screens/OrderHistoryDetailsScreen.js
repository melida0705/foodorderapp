import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text,Dimensions, TouchableOpacity,Button, View } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight } from 'react-native-gesture-handler';
import {AsyncStorage} from 'react-native';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
import { TabView, SceneMap } from 'react-native-tab-view';



  const initialLayout = {color:"red", width: Dimensions.get('window').width };
  
  export default function OrderHistoryDetailsScreen({route,navigation}){
    const [allorder,setAllOrder]=useState([]);
    const {data} = route.params
    const [shippedorder,setShippedOrder]=useState([]);
    
    //const ip="http://192.168.0.16:8080"
    const ip="https://foodorder0705.herokuapp.com"
    //   const [isLoading, setLoading] = useState(true);
     useEffect(()=>{
      //  this.fetchData();
    
      AsyncStorage.getItem('username', (err, result) => {
          
          const url0=ip+"/customer-allhistoryfood/"+result+"/"+data
          fetch(url0).then((response) => response.json())
          .then((json) => {
            console.log(json)
            setAllOrder(json)



            
          })
        })
      
    }, []);
    const sendToPreparation=((data)=>{
     
        const url=ip+"/updateorderpreparation/"+data
        fetch(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          },
        
        });
        const url2=ip+"/seller-order/5/"+data
        fetch(url2).then((response)=>response.json()).then((json)=>setOrder(json))
        .catch((error)=>console.error(error));
      })
    
 
    return (
      <View>
       
      <FlatList
       data={allorder}
       renderItem={({item}) => ( 
        
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
          height:150,
          shadowOffset: {
            height: 1,
            width: 1
          }
        }}
        
      >
   
        <Image
         style={{
            width: 130,
            height: 150,
            borderTopLeftRadius: 4,
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderBottomLeftRadius: 4
          }} 
          source={{ uri: item.food_image }} 
        />
        {/* <Button title="Send to preparation"  onPress={() => sendToPreparation(item)}/> */}
        <Text  style={{
           
           fontSize:20,
           paddingLeft:10,
           paddingTop:10
           
         }}  >
          Name: {item.food_name}{'\n'}{'\n'}
          Price: {item.food_price} RSD{'\n'}{'\n'} 
          Quantity:{item.quantity}{'\n'}{'\n'}
         
        </Text>
        </View>
          
         
       )}
      keyExtractor={item=>item.order_details_id.toString()}
     />
     
     </View>

    );
  


}
const styles = StyleSheet.create({
  scene: {
    flex: 1,
  
  },
});
