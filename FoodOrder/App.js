import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import * as React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import BottomTabNavigator from './navigation/BottomTabNavigator';
import LinkingConfiguration from './navigation/LinkingConfiguration';
import MenuScreen from './screens/MenuScreen';
import FoodScreen from './screens/FoodDetails';
import CartScreen from './screens/CartScreen';
import CheckoutScreen from './screens/CheckoutScreen';
import TopTabNavigator from './navigation/TopTabNavigator';
import SellerBottomTabNavigator from './restaurant-navigation/BottomTabNavigator';
import BottomNavigator from './restaurant-administator-navigation/BottomTabNavigator'
import CategoryAddScreen from './restaurant-administator/CategoryAddScreen'
import FoodAddScreen from './restaurant-administator/FoodAddScreen'
import FoodEditScreen from './restaurant-administator/FoodEditScreen'
import CategoryEditScreen from './restaurant-administator/CategoryEditScreen'
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import OrderDetailsScreen from './restaurant/OrderDetailsScreen'
import OrderPreparationDetailsScreen from './restaurant/OrderPreparationDetailsScreen';
import OrderDeliveryDetailsScreen from './restaurant/OrderDeliveryDetailsScreen';
import CategoryMenuScreen from './screens/CategoryMenuScreen';
import CategoryScreen from './screens/CategoryScreen';
import OrderScreen from './screens/OrderScreen';
import ReviewScreen from './screens/ReviewScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrderDetailsCustomerScreen from './screens/OrderDetailsScreen'
import OrderCustomerPreparationDetailsScreen from './screens/OrderPreparationDetailsScreen'
import OrderCustomerDeliveryDetailsScreen from './screens/OrderDeliveryDetailsScreen'

import OrderHistoryDetailsScreen from './screens/OrderHistoryDetailsScreen';
const Stack = createStackNavigator();

 export default function App(props) {
 // navigation.setOptions({ headerTitle: getHeaderTitle(route) });
    return (
      <View style={styles.container}>
        <NavigationContainer linking={LinkingConfiguration}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={LoginScreen} options={{ title: 'Login'}}  />
            <Stack.Screen name="ClientScreen" component={BottomTabNavigator} options={{title:'Restaurants',headerLeft:null}}/>
            <Stack.Screen name="AdminScreen" component={BottomNavigator}  options={{title:'Categories',headerLeft:null}} />
            <Stack.Screen name="WorkerScreen" component={SellerBottomTabNavigator} options={{title:'New Orders',headerLeft:null}} />
            <Stack.Screen name="Menu" component={MenuScreen}/>
            <Stack.Screen name="Food" component={FoodScreen}/>
            <Stack.Screen name="Cart" component={CartScreen}/>
            <Stack.Screen name="Checkout" component={CheckoutScreen}/>
            <Stack.Screen name="CategoryAdd" component={CategoryAddScreen}  options={{title:'Add'}}/>
            <Stack.Screen name="FoodAdd" component={FoodAddScreen}  options={{title:'Add'}}/>
            <Stack.Screen name="FoodEdit" component={FoodEditScreen}  options={{title:'Edit'}}/>
            <Stack.Screen name="CategoryEdit" component={CategoryEditScreen} options={{title:'Edit Categories'}}/>  
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{title:'Register'}}/>
            <Stack.Screen name="OrderDetailsScreen" component={OrderDetailsScreen}/>
            <Stack.Screen name="OrderPreparationDetailsScreen" component={OrderPreparationDetailsScreen}/>
            <Stack.Screen name="OrderDeliveryDetailsScreen" component={OrderDeliveryDetailsScreen}/>
            <Stack.Screen name="CategoryMenuScreen" component={CategoryMenuScreen} options={{ title: 'Menu' }}/>
            <Stack.Screen name="CategoryScreen" component={CategoryScreen} options={{ title: 'All Categories' }}/>
            <Stack.Screen name="OrderScreen" component={OrderScreen}/>
            <Stack.Screen name="ReviewScreen" component={ReviewScreen} options={{ title: 'Reviews' }}/>
            <Stack.Screen name="ProfileScreen" component={ProfileScreen}/>
            <Stack.Screen name="OrderDetails" component={OrderDetailsCustomerScreen} options={{title:'Order Details'}}/>
            <Stack.Screen name="OrderPreparationDetails" component={OrderCustomerPreparationDetailsScreen} options={{title:'Order Details'}}/>
            <Stack.Screen name="OrderDeliveryDetails" component={OrderCustomerDeliveryDetailsScreen} options={{title:'Order Details'}}/>
            <Stack.Screen name="OrderHistoryDetails" component={OrderHistoryDetailsScreen} options={{title:'Order Details'}}/>
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
