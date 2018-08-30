
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import { getSchedule, getLetterDay, getMatrix, getWeekly } from './sync';

{/* ref={input => this.input = input}
possibily to blur/focus the inputs
*/}


class Login extends Component {


  handleCalls(type, data) {
    if(type == 'letter') { this.setState({ letterDay : data }); }
    if(type == 'matrix') { this.setState({ matrix : data }); }
    if(type == 'weekly') { this.setState({ weekly : data }); }
    if(type == 'schedule') { this.setState({ schedule : data }); }
    this.setState({ retrieved : this.state.retrieved + 1 });
    if (this.state.retrieved == 4) {
      this.moveToTimeline();
    }
  }

  moveToTimeline() {
    this.setState({ loading : false });
    this.props.navigation.navigate('Schedule', {
      username: this.state.username,
      password: this.state.password,
      schedule : this.state.schedule,
      letterDay: this.state.letterDay,
      matrix: this.state.matrix,
      weekly: this.state.weekly,
    })
  }

  constructor(props) {
    super(props);
    this.moveToTimeline = this.moveToTimeline.bind(this);
    this.handleCalls = this.handleCalls.bind(this);

    this.state = {
      username: '',
      password: '',
      loading: false,
      schedule: '',
      letterDay: '',
      matrix: '',
      weekly: '',
      retrieved: 0,
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
          loading= { this.state.loading }
          raised= {true}
          disabled = { this.state.loading }
          buttonStyle={{
            backgroundColor: "rgba(92, 99,216, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          onPress={() => {
            this.setState({
              loading : true,
              retrieved : 0,
            });
            getLetterDay(this.state.username, this.state.password, this.handleCalls);
            getMatrix(this.state.username, this.state.password, this.handleCalls);
            getWeekly(this.state.username, this.state.password, this.handleCalls);
            getSchedule(this.state.username, this.state.password, this.handleCalls);
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
    padding: '5%',
    backgroundColor: '#FFFFFF',
  },
  fLabelText: {
    fontSize: 30,
    textAlign: 'center',
  },
});
