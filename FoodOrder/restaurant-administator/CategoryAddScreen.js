import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,Alert,TextInput} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import  {AsyncStorage} from 'react-native'

export default function MenuScreen({route,navigation}) {
  //const { data } = route.params
  const [menu,setMenu]=useState([]);
  const[category,setCategory]=useState([]);
  const[foodcat,setFoodCat]=useState([]);
  var count = Object.keys(category).length;
  const [categoryName,setCategoryName]=useState('');
  const [categoryImage,setCategoryImage]=useState('');
  //const [address,setAddress]=useState('');
//const ip="http://192.168.0.16:8080"
const ip="https://foodorder0705.herokuapp.com"
  
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
  const AreYouSure=(()=>{
  if(!categoryImage && !categoryName){
    alert("All fields are required");
    return;
  }
  if(!categoryName)
  {
    alert("Fill category name");
    return;
  }
  if(!categoryImage){
alert("Insert category image")
return;
  }
  Alert.alert(
    'Confirm ',
    'Are you sure you want to save ',
    [
      {
        text: 'Yes',
       onPress:()=>Dodaj()
      },
      {
        text: 'No',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel'
      }
      
    ],
    { cancelable: false }
  )
  }
  );
  const Dodaj=()=>{
    const url=ip+"/addcategory/5/"
    fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoryname: categoryName,
        categoryimage:categoryImage
        
     
        
       })}
    )
    };
    const nameInputHandler=(textinput)=>{
        setCategoryName(textinput);
    }
    const imageInputHandler=(textinput)=>{
      setCategoryImage(textinput);
  }
  
//   const Poruci=(item)=>{
//     const url=ip+"/place-order/melida/asmir/"+item.food_id+"/"+shipName+"/"+address
//     fetch(url, {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json'
//       }
     
        
//        })
       
//     };
//     const nameInputHandler=(textinput)=>{
//         setShipName(textinput);
//     }
//     const adressInputHandler=(addressinput)=>
//     {
//         setAddress(addressinput);
//     }
return(
    <View style={{
            
       flex:1,
   marginHorizontal:20,
   marginVertical:20
      }}>
   <Text style={{marginBottom:10}}>New Category </Text>
    
     <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Category name" onChangeText={nameInputHandler} value={categoryName}></TextInput>
  
     <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Category image" onChangeText={imageInputHandler} value={categoryImage}  ></TextInput>

   
     <Button title="Save" onPress={()=>AreYouSure()}style={{backgroundColor:"green"}}/>
    
   </View>
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