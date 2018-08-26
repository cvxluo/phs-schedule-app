import React, {Component} from 'react';
import { StatusBar, StyleSheet, View, Alert, Text } from "react-native";

class Settings extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> This app works by logging into Powerschool with your username and password in order to retrieve your classes. </Text>
      </View>
    );
  }
}

export default Settings;
