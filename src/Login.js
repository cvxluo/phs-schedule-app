
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import infoSubmit from './sync';

{/* ref={input => this.input = input}
possibily to blur/focus the inputs
*/}


class Login extends Component {

  submit(username, password) {
    const schedule = infoSubmit(username, password);
    this.props.navigation.navigate('Schedule', {
      username: username,
      password: password,
      schedule : schedule,
    })
  }


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
      <View style={styles.form}>
        <Image source={require('../assets/princeton_logo.jpg')} />

        <FormLabel labelStyle={styles.fLabelText}>Login to get your classes!</FormLabel>

        <FormInput
          autoCorrect = {false}
          autoCapitalize= 'none'
          spellCheck= {false}
          placeholder='Powerschool Login'
          inputStyle={{
            maxWidth: '90%',
          }}
          onChangeText={(text) => this.setState({username : text})}
        />

        <FormInput
          autoCorrect = {false}
          autoCapitalize= 'none'
          spellCheck= {false}
          secureTextEntry= {true}
          placeholder='Powerschool Password'
          inputStyle={{
            maxWidth: '90%',
          }}
          onChangeText={(text) => this.setState({password : text})}
        />

        {/* <FormValidationMessage>Error message</FormValidationMessage> */}

        <Button
          title='Submit'
          loading= {this.state.loading}
          onPress={() => {
            this.state.loading = true;
            this.submit(this.state.username, this.state.password);
          }}
        />
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10%',
    backgroundColor: '#FFFFFF',
  },
  fLabelText: {
    fontSize: 30,
    textAlign: 'center',
  },
});
