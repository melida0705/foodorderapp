import React, { useEffect, useState } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,Alert,TextInput} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import  {AsyncStorage} from 'react-native'

export default function FoodEditScreen({route,navigation}) {
  const {categoryid} = route.params;
  const{categoryname}=route.params;
  const{categoryimage}=route.params;
 
  const [categoryId,setCategoryID]=useState('');
  const [categoryName,setCategoryName]=useState('');
  const [categoryImage,setCategoryImage]=useState('');
 
  //const[fo,setFoodCat]=useState([]);
  //var count = Object.keys(category).length;
 // const [shipName,setShipName]=useState('');
  //const [address,setAddress]=useState('');
 // const ip="http://192.168.0.16:8080"
 const ip="https://foodorder0705.herokuapp.com"
  
//   const [isLoading, setLoading] = useState(true);

// const itemcart={
//   food:data,
//   quantity:1,
//   price:data.food_price,
// }
useEffect(()=>{
    //  this.fetchData();
  setCategoryID(categoryid);
    setCategoryName(categoryname);
    setCategoryImage(categoryimage);
    
   
  }, []);
const IzmeniKat=()=>{
    const url=ip+"/updatecategory/"+categoryId+"/"
    fetch(url, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        categoryname: categoryName,
        categoryimage:categoryImage
        
        
      })
    }
    )
   
       
    };
    const categoryInputHandler=(textinput)=>{
        setCategoryID(textinput);
    }
    const categoryNameInputHandler=(textinput)=>
    {
        setCategoryName(textinput);
    }
    const categoryImageInputHandler=(textinput)=>
    {
        setCategoryImage(textinput);
    } 
    const foodPriceInputHandler=(textinput)=>
    {

        setFoodPrice(textinput);
    } 
     
   

 
  const AreYouSure=((item)=>
  {
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
    'Are you sure you want to save changes '+item.category_name,
    [
      {
        text: 'Yes',
       onPress:()=>IzmeniKat()
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
   <Text style={{marginBottom:10}}>Edit Category </Text>
   <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Category name" onChangeText={categoryNameInputHandler} value={categoryName} ></TextInput>
    
     <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} placeholder="Category image" onChangeText={categoryImageInputHandler} value={categoryImage} ></TextInput>
 
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