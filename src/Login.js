
import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, AsyncStorage} from 'react-native';

import { FormLabel, FormInput, FormValidationMessage, Button } from 'react-native-elements';

import getInfo, { getSchedule, getLetterDay, getMatrix, getWeekly } from './sync';


class Login extends Component {

  _storeData = async () => {
    try {
      await AsyncStorage.multiSet([
        ['schedule', JSON.stringify(this.state.schedule)],
        ['weekly', JSON.stringify(this.state.weekly)],
        ['letterDay', this.state.letterDay],
        ['matrix', JSON.stringify(this.state.matrix)],
        ['username', this.state.username],
        ['password', this.state.password],
      ]);;
    } catch (error) {
      this.setState({ errorMessage : "Couldn't store your data. Please try again later."})
    }
  }


  handleCalls(type, data) {
    /*
    if(type == 'letter') { this.setState({ letterDay : data }); }
    if(type == 'matrix') { this.setState({ matrix : data }); }
    if(type == 'weekly') { this.setState({ weekly : data }); }
    if(type == 'schedule') { this.setState({ schedule : data }); }
    */

    try {
      info = JSON.parse(data["_bodyInit"]);
      schedule = info["CurrentYear"];
      matrix = info["matrix"];
      letterDay = info["Letter Day"];
      weekly = info["weekly"];

      this.setState({
        schedule : schedule,
        weekly : weekly,
        matrix : matrix,
        letterDay : letterDay,
      })

      this._storeData();

      this.moveToTimeline();

    }
    catch(err) {
      this.setState({ errorMessage : "Couldn't connect to Powerschool, try again later."});
      this.setState({
        loading : false,
      });
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
    this._storeData = this._storeData.bind(this);

    this.state = {
      username: '',
      password: '',
      loading: false,
      schedule: '',
      letterDay: '',
      matrix: '',
      weekly: '',
      errorMessage: '',
   };
  }

  render() {
    return (
      <View style={styles.form}>
        <Image source={require('../assets/princeton_logo.jpg')} />

        <FormLabel labelStyle={styles.fLabelText}>Log in to get your classes!</FormLabel>

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
          clearTextOnFocus = {true}
          autoCapitalize= 'none'
          spellCheck= {false}
          secureTextEntry= {true}
          placeholder='Powerschool Password'
          inputStyle={{
            maxWidth: '90%',
          }}
          onChangeText={(text) => this.setState({password : text})}
        />

        <FormValidationMessage>{this.state.errorMessage}</FormValidationMessage>

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
            });
            /*
            getLetterDay(this.state.username, this.state.password, this.handleCalls);
            getMatrix(this.state.username, this.state.password, this.handleCalls);
            getWeekly(this.state.username, this.state.password, this.handleCalls);
            getSchedule(this.state.username, this.state.password, this.handleCalls);
            */
            getInfo(this.state.username, this.state.password, this.handleCalls);
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
