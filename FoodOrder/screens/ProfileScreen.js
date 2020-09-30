import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState,useCallback,useRef } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,TextInput,Alert} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import {AsyncStorage} from 'react-native';

export default function ProfileScreen({route,navigation}){
  
  //console.log(data);
 
  
 // const ip="http://192.168.0.16:8080";
//   const [isLoading, setLoading] = useState(true);
const[userInfo,setUserInfo]=useState([]);
const[username,setUsername]=useState('');
const[firstName,setFirstName]=useState('');
const[lastName,setLastName]=useState('');
const[address,setAddress]=useState('');
// const ip="http://192.168.0.16:8080";
 const ip="https://foodorder0705.herokuapp.com"
 useEffect(()=>{
     //  this.fetchData();
     AsyncStorage.getItem('username', (err, result) => {
       
     
     const url=ip+"/user-info/"+result
     fetch(url).then((response) => response.json())
     .then((json) =>{
      setUserInfo(json)
      setUsername(json[0].username);
      setFirstName(json[0].first_name);
      setLastName(json[0].last_name)
      setAddress(json[0].adress);
      console.log(json)

     } )
     .catch((error) => console.error(error));
    
    })
 // console.log(userInfo.username)
    
     
   }, []);
   const logout=()=>{
     navigation.navigate("Root")
   }
const saveChanges=()=>{
  AsyncStorage.getItem('username', (err, result) => {
    console.log(firstName);
    console.log(lastName);
  const url=ip+"/update-user/"+result;
  fetch(url, {
    method: 'PUT',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      first_name: firstName,
      last_name:lastName,
      user_address:address
   
    })
  })
  console.log(firstName)
})
}
const AreYouSure=(()=>
  
Alert.alert(
  'Confirm ',
  'Are you sure you want to save changes ',
  [
    {
      text: 'Yes',
     onPress:()=>saveChanges()
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
const AreYouSureLogout=(()=>
  
Alert.alert(
  'Confirm ',
  'Logout ',
  [
    {
      text: 'Yes',
     onPress:()=>logout()
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
const firstNameHandler=(textinput)=>{
  setFirstName(textinput);
}
const lastNameHandler=(textinput)=>
{
  setLastName(textinput); console.log(textinput)
}
const addressHandler=(textinput)=>
{
  setAddress(textinput); console.log(textinput)
}   
var ed=false;
 
// const itemcart={
//   food:data,
//   quantity:1,
//   price:data.food_price,
// }


return(
  
    <View style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#ffffff",
        borderRadius: 4,
        shadowOpacity: 0.1,
        
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1
        }
      }} > 
      <View
      style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#ffffff",
       
        marginHorizontal:30,
        marginVertical:30,
      
      }}>
       
        <Text>Username</Text>
        <TextInput editable={ed} style={{height:30,marginBottom:20,color:"gray", borderBottomColor:'gray',borderBottomWidth:1}}   placeholder="Username" value={username} ></TextInput>  
        <Text>First Name</Text>

      <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} onChangeText={firstNameHandler}  placeholder="First Name" value={firstName} ></TextInput>
      <Text>Last Name</Text>
     <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} onChangeText={lastNameHandler}  placeholder="Last Name" value={lastName} ></TextInput>
     <Text>Address</Text>
     <TextInput style={{height:30,marginBottom:20,borderBottomColor:'gray',borderBottomWidth:1}} onChangeText={addressHandler}  placeholder="Address" value={address}></TextInput> 
      
     <Button title="Save" onPress={()=>AreYouSure()}/> 
     <Button title="Logout" onPress={()=>AreYouSureLogout()}/> 
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

 