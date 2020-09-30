import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState,useCallback,useRef } from 'react';
import { Image, FlatList,Platform, StyleSheet, Text, TouchableOpacity, View ,Button,TextInput} from 'react-native';
import { ScrollView, TouchableHighlight } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import {AsyncStorage} from 'react-native';

export default function ReviewScreen({route,navigation}){
  const { data } = route.params;
  //console.log(data);
 
  let [mark,setMark]=useState('');
  let [review,setReview]=useState('');
  const[reviews,setReviews]=useState([]);
  //var count = Object.keys(category).length;
  const ip="https://foodorder0705.herokuapp.com"
  const mountedRef=useRef(false);
 // const ip="http://192.168.0.16:8080";
//   const [isLoading, setLoading] = useState(true);
 useEffect(()=>{
  //  this.fetchData();
 mountedRef.current=true;
 // const signal=abortController.signal;
  //console.log(data);

  const url2=ip+"/reviews/"+data
  fetch(url2).then((response)=>response.json())
  .then((json)=>setReviews(json))
  .catch((error)=>console.error(error));
 
  return ()=>{
    mountedRef.current=false;
  }
  
}, []);

const leaveReview=()=>{
    console.log(data);
    console.log(mark);
   
    if(mark>5 || mark<1){
    alert("Mark should be between 1-5")
    return;
    }
    if(review.length==0)
    {
      alert("You didn't leave description");
      return;
    }

    AsyncStorage.getItem('username', (err, result) => {
       
        const url=ip+"/addreview/"+result+"/"+data+"/"+mark+"/"+review
        console.log(url)
        fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
         
            
           })
           const url2=ip+"/reviews/"+data
           console.log(url2);
     fetch(url2).then((response)=>response.json())
     .then((json)=>setReviews(json))
     .catch((error)=>console.error(error));
     setMark('');
     setReview('')
          
        });
       
 
        //   console.log(url)
        alert("Thank you for your feedback");
       
    
    
}
 
// const itemcart={
//   food:data,
//   quantity:1,
//   price:data.food_price,
// }


return(
  useCallback(() => mountedRef.current, []),
    <View style={{
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#F7F7F7",
        borderRadius: 4,
        shadowOpacity: 0.1,
        shadowRadius: 2,
        shadowOffset: {
          height: 1,
          width: 1
        }
      }} > 
      <View  style={{
            
           
            backgroundColor: "#ffffff",
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            borderBottomColor:"gray",
            padding:10,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}>

     
        <TextInput placeholder="Mark (from 1-5)"  onChangeText={mark => setMark(mark)} value={mark} style={{marginVertical:10,fontSize:18}} keyboardType="numeric" ></TextInput>
         <TextInput placeholder="Description" style={{marginVertical:10,fontSize:18}} value={review} onChangeText={review => setReview(review)} ></TextInput>
        <Button title="Leave review" onPress={()=>leaveReview()}/>
        </View>
        <Text style={{fontSize:18,marginHorizontal:24,marginVertical:10}} >
            All reviews
        </Text>
    <FlatList
    data={reviews}
    keyExtractor={item=>item.review_id.toString()}
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
            padding:10,
            borderRadius: 4,
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
          }}
        >
          
         
            <Text
              style={{
                fontSize: 18,
                color: "#333"
              }}
            >
              Username: {item.customer_username}  {'\n'}{'\n'}
              Ocena: {item.mark}{'\n'}{'\n'}
              Komentar: {item.review}
            </Text>
            
           
           
             
              
             
         

          
          </View>
     
      
     
      
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
    backgroundColor: '#F7F7F7',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10
  },
});

 