
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import { getSchedule, getLetterDay, getMatrix } from './sync';

{/* ref={input => this.input = input}
possibily to blur/focus the inputs
*/}


class Login extends Component {

  combineDaySchedule(day) {
    this.setState({ letterDay : day });
    getMatrix(this.state.username, this.state.password, this.combineMatrixSchedule)
  }

  combineMatrixSchedule(matrix) {
    this.setState({ matrix : matrix });
    getSchedule(this.state.username, this.state.password, this.moveToTimeline)
  }

  moveToTimeline(schedule) {
    this.props.navigation.navigate('Schedule', {
      username: this.state.username,
      password: this.state.password,
      schedule : schedule,
      letterDay: this.state.letterDay,
      matrix: this.state.matrix,
    })
  }

  constructor(props) {
    super(props);
    this.combineDaySchedule = this.combineDaySchedule.bind(this);
    this.moveToTimeline = this.moveToTimeline.bind(this);
    this.combineMatrixSchedule = this.combineMatrixSchedule.bind(this);


    this.state = {
      username: '',
      password: '',
      loading: false,
      schedule: '',
      letterDay: '',
      matrix: '',
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
            this.setState({loading : true});
            getLetterDay(this.state.username, this.state.password, this.combineDaySchedule);
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
