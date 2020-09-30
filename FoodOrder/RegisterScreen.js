import React, { useState } from 'react';
import md5 from 'md5';
//Import all required component
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Loader from './components/Loader';

const RegisterScreen = props => {
  const ip="https://foodorder0705.herokuapp.com"
  let [userName, setUserName] = useState('');
  let [userEmail, setUserEmail] = useState('');
  let [username, setUsername] = useState('');
  let [userAddress, setUserAddress] = useState('');
  let[userPassword,setUserPassword]=useState('');
  let [loading, setLoading] = useState(false);
  let [errortext, setErrortext] = useState('');
  let [isRegistraionSuccess, setIsRegistraionSuccess] = useState(false);
  let [load,setLoad]=useState(false);
  let[hashPass,setHash]=useState('');
  const loginChangeHandler=(value)=>{
    setHash(value)
     setUserPassword(md5(value))
  }
  const handleSubmitButton = () => {
    setErrortext('');
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
   
    if (!username) {
      alert('Please fill Username');
      return;
    }
    console.log(userPassword)
    if (!userEmail) {
      alert('Please fill Email');
      return;
    }
   
    if (!userPassword) {
      alert('Please fill Password');
      return;
    }
    if(hashPass.length<8){
      alert('Password need to have 8 charachers')
      return;
    }
    if (reg.test(userEmail) === false){
      alert("Email not valid");
      return;
    }
    
    
    //Show Loader
    setLoading(true);
  
   
    
console.log("U registart buttom")
//setHash(md5.hex_md5(userPassword)); 
const url=ip+"/send/"+userEmail+"/"+username+"/"+userPassword;

console.log(url)
fetch(url 
// )
).then(response => response.json())
.then(responseJson =>{
  console.log(responseJson)
  setLoad(responseJson);
  setLoading(false);
  if (load==true) {
    console.log('Registration Successful. Please Login to proceed');
    setIsRegistraionSuccess(true);
   
  } else {
    setErrortext('Username already exist');
  }

})
.catch(error => {
  //Hide Loader
 setLoading(false)
  console.error(error);
});
     
  };
  if (isRegistraionSuccess) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#307ecc',
          justifyContent: 'center',
        }}>
        {/* <Image
          source={require('../Image/success.png')}
          style={{ height: 150, resizeMode: 'contain', alignSelf: 'center' }}
        /> */}
        <Text style={styles.successTextStyle}>Registration Successful.</Text>
        <TouchableOpacity
          style={styles.buttonStyle}
          activeOpacity={0.5}
          onPress={() => props.navigation.navigate('Root')}>
          <Text style={styles.buttonTextStyle}>Login Now</Text>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: '#307ecc' }}>
      <Loader loading={loading} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: 'center' }}>
          {/* <Image
            source={require('../Image/aboutreact.png')}
            style={{
              width: '50%',
              height: 100,
              resizeMode: 'contain',
              margin: 30,
            }} />*/}
          
        </View>
        <KeyboardAvoidingView enabled>
          
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={username => setUsername(username)}
              underlineColorAndroid="#FFFFFF"
              placeholder="Enter Username"
              placeholderTextColor="#F6F6F7"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                this._emailinput && this._emailinput.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={UserEmail => setUserEmail(UserEmail)}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Email"
              placeholderTextColor="#F6F6F7"
              keyboardType="email-address"
              // ref={ref => {
              //   this._emailinput = ref;
              // }}
              returnKeyType="next"
              onSubmitEditing={() => this._ageinput && this._ageinput.focus()}
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.inputStyle}
              onChangeText={loginChangeHandler}
              underlineColorAndroid="#F6F6F7"
              placeholder="Enter Password"
              placeholderTextColor="#F6F6F7"
            
              // ref={ref => {
              //   this._ageinput = ref;
              // }}
              
              blurOnSubmit={false} secureTextEntry={true}
            />
          </View>
          
          {errortext != '' ? (
            <Text style={styles.errorTextStyle}> {errortext} </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}>
            <Text style={styles.buttonTextStyle}>REGISTER</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </View>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
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
  errorTextStyle: {
    color: 'red',
    textAlign: 'center',
    fontSize: 14,
  },
  successTextStyle: {
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    padding: 30,
  },
});