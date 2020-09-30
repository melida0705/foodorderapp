import React, { useState,useEffect } from 'react';
import md5 from 'md5'
//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Button,
  Text,
  ScrollView,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import { AsyncStorage } from 'react-native';
//import AsyncStorage from '@react-native-community/async-storage';
import Loader from './components/Loader';
import { createPortal } from 'react-dom';
//import { AsyncStorage } from 'react-native';
// const ip="http://192.168.0.16:8080";
 const ip="https://foodorder0705.herokuapp.com";

//  useEffect(() => {
//   async function getKind() {
//      const { data } = await ForceApi.post(`/GetKindPensionController.php`)
//      setpPensionKind(data.pension);
//   }

//   getKind();
// }, []);
// useEffect(()=>{
//  // uzmiRestorane(setData)
//  //this.fetchData();
// fetch(ip+'/restaurant')
// .then((response) => response.json())
// .then((json) => setData(json))
// .catch((error) => console.error(error))
// .finally(() => setLoading(false));

// }, []);
// useEffect(()=>{
//   //  this.fetchData();

//   // try {
//   //   const value =  AsyncStorage.getItem('TASKS');
//   //   if (value !== null) {
//   //     // We have data!!
//   //     console.log(value);
//   //   }
//   // } catch (error) {
//   //   // Error retrieving data
//   // }
 
  
// }, []);

_storeData = async () => {
  console.log("Im here");
  try {
    await AsyncStorage.setItem('TASKS', 'I like to save it.');
  } catch (error) {
    console.log("NOU")
  }
};

// _retrieveData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('TASKS');
//     if (value !== null) {
//       // We have data!!
//       console.log(value);
//     }
//   } catch (error) {
//     // Error retrieving data
//   }
// };

const LoginScreen = props => {

  
  let [userEmail, setUserEmail] = useState('');
  let [userPassword, setUserPassword] = useState('');
  let [userType, setUserType] = useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [users,setUsers]=useState([]);
  let[hashPass,setHash]=useState('');
  
  const handleSubmitPress = () => {
    console.log(md5(userPassword));
    setErrortext('');
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
   
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
   // setHash(md5.hex_md5(userPassword)); 
    console.log(userPassword)
    console.log(ip+'/login/'+userEmail+"/"+userPassword)
    fetch(ip+'/login/'+userEmail+"/"+userPassword
      // method: 'GET',
      // headers: {
      //   Accept: 'application/json',
      //   'Content-Type': 'application/json'
      // }
      // // body: JSON.stringify({
      // //   username: userEmail,
      // //   password:userPassword
  
    ).then(response => response.json())
    .then(responseJson =>{
   
   // console.log(userEmail)
    //  console.log(responseJson[0].username)
     // console.log("OV JE PAS"+responseJson[0].password)
      //Hide Loader
      setLoading(false);
      //setUsers(responseJson);
    //  console.log(userEmail)
     // console.log(responseJson[0].username)
    //  console.responseJson.status;
     // console.log(users[0].username);
      //console.log(users.count);
      // If server response message same as Data Matched
      //setUserPassword(md5.hex_md5(userPassword))
     // console.log(userPassword)
    // console.log(responseJson[0].username)
      if (responseJson.length == 1) {
        AsyncStorage.setItem(
          'username',
          responseJson[0].username,
          () => {
          
             
                AsyncStorage.getItem('username', (err, result) => {
                  console.log(result);
                });
              
           
          }
        );
     //   AsyncStorage.setItem('user_id', responseJson.data[0].user_id);
       // console.log(responseJson.data[0].user_id);
       if(responseJson[0].user_type=="kupac")
        props.navigation.navigate('ClientScreen',{
          data: responseJson[0].username,
          otherParam: 'anything you want here',
        });
      
      else if(responseJson[0].user_type=="prodavac")
      { 
         console.log(responseJson[0].username);
        props.navigation.navigate('AdminScreen');
      } 
      else if(responseJson[0].user_type=="konobar")
      {  console.log(responseJson[0].username);
        props.navigation.navigate('WorkerScreen');
      } 
    }
      else {
        setErrortext('Please check your email id or password');
        console.log('Please check your email id or password');
      }
    })
    .catch(error => {
      //Hide Loader
      setLoading(false);
      console.error(error);
    });
  };

  return (
    <View style={styles.mainBody}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginTop: 100 }}>
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: 'center' }}>
               {/* <Image
                source={require('../Image/aboutreact.png')}
                style={{
                  width: '50%',
                  height: 100,
                  resizeMode: 'contain',
                  margin: 30,
                }}
              /> */}
            </View>
            <View style={styles.SectionStyle}>
           
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserEmail => setUserEmail(UserEmail)}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Username" //dummy@abc.com
                placeholderTextColor="#F6F6F7"
                autoCapitalize="none"
                keyboardType="email-address"
                // ref={ref => {
                //   this.username = ref;
                // }}
                returnKeyType="next"
                //  onSubmitEditing={() =>
                //   this.password && this.password.focus()
                //  }
                blurOnSubmit={false}
              />
            </View>
            <View style={styles.SectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={UserPassword => setUserPassword(md5(UserPassword))}
                underlineColorAndroid="#FFFFFF"
                placeholder="Enter Password" //12345
                placeholderTextColor="#F6F6F7"
                keyboardType="default"
                // ref={ref => {
                //   this.password = ref;
                // }}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
              />
            </View>
            {errortext != '' ? (
              <Text style={styles.errorTextStyle}> {errortext} </Text>
            ) : null}
            
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              onPress={handleSubmitPress}>
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
           
            <Text
              style={styles.registerTextStyle}
              onPress={() => props.navigation.navigate('RegisterScreen')}>
              New Here ? Register
            </Text>
           
          </KeyboardAvoidingView>
         
        </View>
      </ScrollView>
    
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#7DE24E',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#7DE24E',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
    color: 'white',
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: 'white',
  },
  registerTextStyle: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
});