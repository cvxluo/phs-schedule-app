import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Login from './Login';
import Timeline from './Timeline'
import Settings from './Settings';

import { createStackNavigator, createBottomTabNavigator, StackNavigator } from 'react-navigation';

const Tabs = createBottomTabNavigator({
  Timeline: { screen: Timeline, },
  Settings: { screen: Settings, }
})

const Nav = StackNavigator({
  Login: { screen: Login,
    navigationOptions: () => ({
        headerBackTitle: null
      }),
    },
  Schedule: { screen: Tabs, }
})

export default Nav;
