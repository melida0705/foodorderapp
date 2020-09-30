
import TabBarIcon from '../components/TabBarIcon';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import HomeScreen from '../restaurant/HomeScreen';

import PreparationScreen from '../restaurant/PreparationScreen';
import DeliveryScreen from '../restaurant/DeliveryScreen';
import CartScreen from '../screens/CartScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import OrderScreen from '../screens/OrderScreen';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';
export default function SellerBottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name="Porudzbine"
        component={HomeScreen}
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clipboard" />,
        }}
      />
       <BottomTab.Screen
        name="Priprema"
        component={PreparationScreen}
        options={{
          title: 'In Preparation',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clipboard" />,
        }}
      />
      <BottomTab.Screen
        name="InDelivery"
        component={DeliveryScreen}
        options={{
          title: 'In Delivery',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-clipboard" />,
        }}
      />
      {/* <BottomTab.Screen
        name="Korpa"
        component={CartScreen}
        options={{
          title: 'Cart',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-cart" />,
        }}
      />
       <BottomTab.Screen
        name="Profil"
        component={CartScreen}
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name="md-person" />,
        }}
      /> */}
      
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Porudzbine':
      return 'New Orders';
    case 'InDelivery':
      return 'Orders in delivery';
      case 'Priprema':
        return 'Orders in preparation'

  }
}
