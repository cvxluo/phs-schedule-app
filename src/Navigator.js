import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';


import Login from './Login';
import Timeline from './Timeline'
import Settings from './Settings';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const Tabs = createBottomTabNavigator({
  Timeline: { screen: Timeline, },
  Settings: { screen: Settings, }
},
{
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName } = navigation.state;
      let iconName;
      if (routeName === 'Timeline') {
        iconName = `ios-calendar`;
      } else if (routeName === 'Settings') {
        iconName = `ios-options`;
      }

      return <Ionicons name={iconName} size={35} color={tintColor} />;
    },
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
  },
})

const Navigator = createStackNavigator({
  Login: { screen: Login, },
  Schedule: { screen: Tabs, },
},
{
  initialRouteName: "Login",
  navigationOptions: {
    headerTitle: "PHS Schedule App",
    headerTitleStyle: {
      fontWeight: "bold",
      color: "#000000",
      borderBottomColor: 'black',
    },
    headerLeft: null
  }
})

const Nav = () => <Navigator/>;

export default Nav;
