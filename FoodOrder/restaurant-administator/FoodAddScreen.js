import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,Alert,TextInput,Picker} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import  {AsyncStorage} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-material-dropdown';
export default function MenuScreen({route,navigation}) {
  //const { data } = route.params
  const[allCategory,setAllCategory]=useState([]);
  const [categoryID,setCategoryID]=useState('');
  const{foodcategoryid}=route.params;
  const [foodName,setFoodName]=useState('');
  const [foodDescription,setFoodDescription]=useState('');
  const[foodPrice,setFoodPrice]=useState('');
  const[foodImage,setFoodImage]=useState('');
  //const[fo,setFoodCat]=useState([]);
  //var count = Object.keys(category).length;
 // const [shipName,setShipName]=useState('');
  //const [address,setAddress]=useState('');
  //const ip="http://192.168.0.16:8080"
  const ip="https://foodorder0705.herokuapp.com"
  const url2=ip+"/restaurantfood/5"
//   const [isLoading, setLoading] = useState(true);

// const itemcart={
//   food:data,
//   quantity:1,
//   price:data.food_price,
// }
useEffect(()=>{
  console.log(foodcategoryid)
  AsyncStorage.getItem('username', (err, result) => {
    fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
    .then((json)=>
    {
    
    const url2=ip+"/restaurantcategory/"+json[0].restaurant_id
    fetch(url2).then((response)=>response.json())
    .then((json)=>setAllCategory(json))
    .catch((error)=>console.error(error));
    })})
    //  this.fetchData();
    
    // AsyncStorage.getItem('username', (err, result) => {
    //   fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
    //   .then((json)=>
    //   {
      
    //   const url2=ip+"/restaurantcategory/"+json[0].restaurant_id
    //   fetch(url2).then((response)=>response.json())
    //   .then((json)=>setAllCategory(json))
    //   .catch((error)=>console.error(error));
    //   })})
      
  }, []);
const Dodaj=()=>{
  if(!foodName && !foodPrice && !foodDescription && foodImage){
    alert("All fields are required");
    return;
  }
  if(!foodName)
  {
alert("Insert name");
return;
  }
  if(!foodPrice)
  {
    alert("Insert price");
    return;
  }
  if(!foodDescription)
  {
    alert("Insert description");
    return;
  }
  if(!foodImage)
  {
    alert("Insert image url");
    return;
  }
  console.log(foodcategoryid)
  AsyncStorage.getItem('username', (err, result) => {
    fetch(ip+"/getrestaurantid/"+result).then((response)=>response.json())
    .then((json)=>
    {
     
    
     const url=ip+"/addfood/"+json[0].restaurant_id+"/"+foodcategoryid+"/"+foodName+"/"+foodDescription+"/"+foodPrice+"/"+foodImage
     console.log(url)
     fetch(url, {
       method: 'POST',
       headers: {
         Accept: 'application/json',
         'Content-Type': 'application/json'
       }
      
         
        })
       
    })


 })
 navigation.navigate('AdminScreen')

       
    };
    const categoryInputHandler=(textinput)=>{
        setCategoryID(textinput);
    }
    const foodNameInputHandler=(textinput)=>
    {
        setFoodName(textinput);
    }
    const foodDescriptionInputHandler=(textinput)=>
    {
        setFoodDescription(textinput);
    } 
    const foodPriceInputHandler=(textinput)=>
    {
        setFoodPrice(textinput);
    } 
    const foodImageInputHandler=(textinput)=>
    {
        setFoodImage(textinput);
    } 
   

 
  const AreYouSure=(()=>{
    if(!foodName && !foodPrice && !foodDescription && !foodImage){
      alert("All fields are required");
      return;
    }
  if(!foodName)
  {
alert("Fill name");
return;
  }
  
  if(!foodDescription)
  {
    alert("Fill description");
    return;
  }
  if(!foodPrice)
  {
    alert("Fill price");
    return;
  }
  if(!foodImage)
  {
    alert("Insert image url");
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
return(
    <View style={{        
       flex:1,
  
   backgroundColor: '#fff'
      }}>
        <View style={
{marginHorizontal:24,marginVertical:30}
        }>

      
   <Text style={{marginBottom:10}}>New  </Text>
   
      <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}}placeholder="Name" onChangeText={foodNameInputHandler} value={foodName}></TextInput>
     <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}}placeholder="Description" onChangeText={foodDescriptionInputHandler} value={foodDescription} ></TextInput>   
      <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}}placeholder="Price" onChangeText={foodPriceInputHandler} value={foodPrice} >
         </TextInput>   
 
   
     <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Image url" onChangeText={foodImageInputHandler} value={foodImage} ></TextInput>
 
    
     <Button title="Save" onPress={()=>AreYouSure()} style={{backgroundColor:"green"}}/>
     </View>
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