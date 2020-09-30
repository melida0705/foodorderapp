import * as WebBrowser from 'expo-web-browser';
// import * as React from 'react';
import { Image, Platform, StyleSheet, Text,SearchBar, FlatList,TouchableOpacity, View,Button,RefreshControl,SafeAreaView } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import React, { useEffect, useState,useCallback,useRef } from 'react';
import { MonoText } from '../components/StyledText';
import { Ionicons } from '@expo/vector-icons';
export default function HomeScreen({navigation}) {
  const [data,setData]=useState([]);
  const[tempdata,setTempDate]=useState([]);
  const [searchText,setSearch]=useState('');
  const mountedRef=useRef(false);
  // this.state={
  //   data:[],
  //   backup:[]
  //   }
  // search = (textinput) => {
  //     let text = textinput.toLowerCase()
  //     console.log(textinput);
  //     let tracks = data
  //     let filterTracks = tracks.filter(item => {
  //     if(item.restaurant_name.toLowerCase().match(text)) {
  //       return item
  //     }
  //   })
  //   setData({ data: filterTracks })
  // }


  const [isLoading, setLoading] = useState(true);
  //const ip="http://192.168.0.16:8080";
  const ip="https://foodorder0705.herokuapp.com"
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async() => {


    setRefreshing(true);  fetch(ip+'/restaurant')
    .then((response) => response.json())
    .then((json) => setData(json))
  
    .catch((error) => console.error(error))
    .finally(() => setRefreshing(false));},[])
  useEffect(()=>{
   // uzmiRestorane(setData)
   //this.fetchData();
   mountedRef.current = true;

  fetch(ip+'/restaurant')
  .then((response) => response.json())
  .then((json) => setData(json))

  .catch((error) => console.error(error))
  .finally(() => setLoading(false));
  return () => {
    // The cleanup function of useEffect is called by React on unmount
    mountedRef.current = false;
  };
}, []);
// const renderHeader = () => {
//   return <SearchBar placeholder="Search Here..."
//       lightTheme round editable={true}
//       value={search} 
//       onChangeText={updateSearch}/>; 
// };
// const search=(textinput)=>
// {
//   setSearch(textinput);
//   let data=data.filter(function(item){
  
//     return item.restaurant_name.includes(textinput);
//   });

//   setData(data);
    
//} ;
// const updateSearch =(search) => {
// setSearch({search}, () => {
//     if ('' == search) {
//         setData({
//             data: [...tempdata]
//         });
//         return;
//     }
     
//     data = tempdata.filter(function(item){
//         return item.restaurant_name.includes(search);
//       }).map(function({restaurant_id, restaurant_name}){
//         return {restaurant_id, restaurant_name };
//     });
// });
// };
const otvoriRestoran=idRestorana=>{
  navigation.push("Menu",{
    data:data,idRestorana})
  
}
const OpenReviewPage=idRestorana=>{
   navigation.navigate('ReviewScreen',{
     data:idRestorana,
     otherParam:'bla',
   })
}
const categoryInputHandler=(textinput)=>{
  setCategoryID(textinput);
}
  return (
    <SafeAreaView style={styles.container}>
 
     <FlatList
    
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({item}) => ( 
           <View>

<TouchableOpacity onPress={() => {
        /* 1. Navigate to the Details route with params */
         navigation.navigate('CategoryScreen', {
          data: item.restaurant_id,
          otherParam: 'anything you want here',
        })}}>
              <View
              style={{
                flex: 1,
            flexDirection: "column",
            backgroundColor: "#ffffff",
            marginHorizontal: 24,
            marginVertical: 8,
            borderRadius: 4,
            shadowOpacity: 0.4,
            shadowRadius: 2,
            shadowOffset: {
              height: 1,
              width: 1
            }
              }}>
              <Image
             style={{
              backgroundColor: "#ccc",
              flex: 1,
            
              width: "100%",
              height: 200,
              justifyContent: "center",
              borderRadius: 6
            }}
            source={{uri:item.restaurant_image}}
          />
          <Text style={{fontSize:24,padding:10}}>{item.restaurant_name}</Text>
        
   <View style={{
     flex:1,
     flexDirection:"row"
   }}> 
   <Button title="See categories" onPress={ ()=> navigation.navigate('CategoryScreen', {
                data: item.restaurant_id,
                otherParam: 'anything you want here',
              })}/>
                <Button title="Reviews" onPress={ ()=>navigation.navigate('ReviewScreen',{
     data:item.restaurant_id,
     otherParam:'bla',
   })}/>
              </View>
          
        
              </View>
              {/* <Text style={{color:"white",fontSize:24}}>{item.restaurant_name}</Text>     */}
              
           
                   </TouchableOpacity>
              </View>
          )}
          keyExtractor={item=>item.restaurant_id.toString()}
        />
    </SafeAreaView>
  );
 }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
