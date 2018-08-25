import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';

import Login from './Login';
import Timeline from './Timeline'
import Settings from './Settings';

import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

const Tabs = createBottomTabNavigator({
  Timeline: { screen: Timeline, },
  Settings: { screen: Settings, }
})

const Nav = createStackNavigator({
  Login: { screen: Login, },
  Schedule: { screen: Tabs, }
})

export default Nav;
