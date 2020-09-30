import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,Alert,TextInput} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import  {AsyncStorage} from 'react-native'

export default function FoodEditScreen({route,navigation}) {
  const {foodid} = route.params;
  const {foodrestaurant} = route.params;
  const{foodname}=route.params;
  const{fooddescription}=route.params;
  const{foodprice}=route.params;
  const{foodcategoryid}=route.params;
  const{foodimage}=route.params;
  const[food,setFood]=useState([]);
  const [categoryID,setCategoryID]=useState('');
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
    //  this.fetchData();
    setCategoryID(foodcategoryid);
    setFoodName(foodname);
    setFoodDescription(fooddescription);
    setFoodPrice(foodprice);
    setFoodImage(foodimage);
   
  }, []);
const Izmeni=()=>{
    const url=ip+"/updatefood/"+foodid+"/"
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        food_id: foodid,
        foodname:foodName,
        foodimage:foodImage,
        fooddescription:foodDescription,
        foodprice:foodPrice
        
      })
    }
    )
   navigation.navigate('AdminScreen')
       
    };
    const categoryInputHandler=(textinput)=>{
        setCategoryID(textinput);
    }
    const foodNameInputHandler=(textinput)=>
    {
        setFoodName(textinput); console.log(textinput)
    }
    const foodDescriptionInputHandler=(textinput)=>
    {
        setFoodDescription(textinput); console.log(textinput)
    } 
    const foodPriceInputHandler=(textinput)=>
    {

        setFoodPrice(textinput);
        console.log(textinput)
    } 
    const foodImageInputHandler=(textinput)=>
    {

        setFoodImage(textinput); console.log(textinput)
    } 
  
  const AreYouSure=((item)=>
  {
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
    'Are you sure you want to save changes ',
    [
      {
        text: 'Yes',
       onPress:()=>Izmeni()
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
   marginHorizontal:20,
   marginVertical:20
 
      }}
    
    >
   <Text style={{marginBottom:10}}>Edit </Text>
   <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Name" onChangeText={foodNameInputHandler} value={foodName} ></TextInput> 
    <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Description" onChangeText={foodDescriptionInputHandler} value={foodDescription}></TextInput>
  <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Price" onChangeText={foodPriceInputHandler} value={foodPrice} ></TextInput>   
    
 
     
     <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Image url" onChangeText={foodImageInputHandler} value={foodImage}   ></TextInput>

     <Button title="Save" onPress={()=>AreYouSure()} style={{backgroundColor:"green"}}/>
    
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