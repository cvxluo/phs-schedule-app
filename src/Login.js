
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

import { Input } from 'react-native-elements';

import infoSubmit from './sync';
import Nav from './Navigator';

export default class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      loading: false,
      schedule: '',
   };
  }
  render() {
    return (
      <View style={styles.container}>
        <Input
          placeholder='Powerschool Username'
          onChangeText={(text) => this.setState({username})}
        />
        <Input
          placeholder='Powerschool Password'
          onChangeText={(text) => this.setState({password})}
        />
        <Text style={styles.welcome}>Welcome to React Native!</Text>
        <Button
          transparent
          onPress={() => {
            this.state.loading = true;
            const schedule = infoSubmit(this.state.username, this.state.password);
            this.props.navigation.navigate('Schedule', {
              username: this.state.username,
              password: this.state.password,
              schedule : schedule,
            })
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
});
