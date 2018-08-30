import React, {Component} from 'react';
import { StatusBar, StyleSheet, View, Alert, Text, Linking } from "react-native";
import { Icon, Button } from 'react-native-elements';

class Settings extends Component {

  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.text}>
        <Text style={styles.text}> This app works by logging into Powerschool with your username and password in order to retrieve your classes. The code can be found on GitHub by pressing the button below.</Text>
        <Text style={styles.text}> Created by Lincoln Roth & Charlie Luo </Text>

        <Button
          title='Log Out'
          raised= {true}
          buttonStyle={{
            backgroundColor: "rgba(187, 184, 252, 1)",
            width: 300,
            height: 45,
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 5
          }}
          containerStyle={styles.button}
          onPress={() => {
            this.props.navigation.navigate('Login');
          }}
        />


        <Icon
          reverse
          name='github'
          type='font-awesome'
          color='#000000'
          onPress={() =>
            Linking.openURL('https://github.com/lincolnmroth/phsapp-API')
          } />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '5%',
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
  },
  textStyle: {
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    padding: '10%',
    backgroundColor: '#FFFFFF',
  }
});

export default Settings;
