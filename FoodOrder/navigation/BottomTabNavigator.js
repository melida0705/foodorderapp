import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import OrderScreen from '../screens/OrderScreen';
import TopTabNavigator from '../navigation/TopTabNavigator';
import ProfileScreen from '../screens/ProfileScreen';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  const {data} = route.params;
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Pocetna"
        component={HomeScreen}
        options={{
          params:data,
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-home" />,
        }}
      />
       <BottomTab.Screen
        name="Order"
        component={OrderScreen}
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clipboard" />,
        }}
      />
      <BottomTab.Screen
        name="Omiljeno"
        component={FavoriteScreen}
        options={{
          title: 'Favorite',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-heart" />,
        }}
      />
      <BottomTab.Screen
        name="Korpa"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cart" />,
        }}
      />
       <BottomTab.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      />
      
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Pocetna':
      return 'Restaurants';
    case 'Korpa':
      return 'Cart';
    case 'Profil':
      return 'Profile';
      case 'Omiljeno':
        return 'Favorite';
        case 'Order':
          return 'Orders';

  }
}
