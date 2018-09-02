import React, {Component} from 'react';
import { View, StyleSheet, StatusBar, RefreshControl, ActivityIndicator, Text, AsyncStorage } from "react-native";
import Timeline from 'react-native-timeline-listview'
import infoSubmit from './sync'

import { getClassOrder, getClassTime } from './hardSchedule.js'


class TimelineScreen extends Component {

  _retrieveData = async () => {
    try {
      const response = await AsyncStorage.multiGet(['username', 'password', 'schedule', 'matrix', 'weekly', 'letterDay'])
        for (i = 0; i < 6; i++) {
          if (response[i][0] == 'username') { this.username = response[i][1]; }
          if (response[i][0] == 'password') { this.password = response[i][1]; }
          if (response[i][0] == 'schedule') { this.schedule = response[i][1]; }
          if (response[i][0] == 'matrix') { this.matrix = response[i][1]; }
          if (response[i][0] == 'weekly') { this.weekly = response[i][1]; }
          if (response[i][0] == 'letterDay') { this.letterDay = response[i][1]; }
        }
     } catch (error) {
       this.props.navigation.navigate('Login');
     }
  }

  createTimeline(username, password, schedule, matrix, weekly, letterDay) {
    const order = getClassOrder(letterDay);
    const classOrder = matrix[matrix.length - 1];
    var orderedSchedule = []

    for (i = 4; i < 12; i++) {
      for (j = 0; j < schedule.length; j++) {
        if (classOrder[i]) {
          if (classOrder[i].indexOf(schedule[j]["Course Name"]) > - 1) { orderedSchedule.push(schedule[j]); }
        }
        else {
          orderedSchedule.push({
            "Course Name" : "Free Period",
            "Exp" : '',
            "Teacher" : '',
            "Room" : '',
          });
          break;
        }
      }
    }

    var labDay = ''
    for (i = 0; i < orderedSchedule.length; i++) {
      scienceLetters = orderedSchedule[i]["Exp"];

      if (scienceLetters) {
        // https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
        allowOverlapping = false;
        for (letter = 65; letter < 73; letter++) {
          string = scienceLetters;
          subString = String.fromCharCode(letter);
          if (subString.length <= 0) return (string.length + 1);

          var n = 0,
              pos = 0,
              step = allowOverlapping ? 1 : subString.length;

          while (true) {
              pos = string.indexOf(subString, pos);
              if (pos >= 0) {
                  ++n;
                  pos += step;
              } else break;
          }
          if (n > 1) {
            labDay = String.fromCharCode(letter);
          }

        }
      }
    }


    var gymFree = '';
    for (j = 0; j < orderedSchedule.length; j++) {
      gymLetters = orderedSchedule[j]["Exp"];
      if (orderedSchedule[j]["Course Name"].indexOf('PE') > -1) {
        for (letter = 65; letter < 69; letter++) {
          if (gymLetters.indexOf(String.fromCharCode(letter)) < 0 && String.fromCharCode(letter) != labDay) {
            gymFree = String.fromCharCode(letter);
          }
        }
      }
    }


    if (letterDay == gymFree) {
      for (j = 0; j < orderedSchedule.length; j++) {
        if (orderedSchedule[j]["Course Name"].indexOf('PE') > -1) {
          //orderedSchedule[j]["Course Name"] = "Free Period";
          orderedSchedule[j]["Teacher"] = "Free Period today";
        }
      }
    }

    if (letterDay == labDay) {
      for (j = 0; j < orderedSchedule.length; j++) {
        if (orderedSchedule[j]["Course Name"].indexOf('PE') > -1) {
          orderedSchedule[j]["Course Name"] = "Lab";
          orderedSchedule[j]["Teacher"] = '';
        }
      }
    }

    /*
    for (i = 0; i < orderedSchedule.length; i++) {
      if (schedule[i]["Course Name"].indexOf('Homeroom') > - 1) { schedule.splice(i, 1); }
      if (schedule[i]["Enroll"].indexOf('09/05/2018') < 0) { schedule.splice(i, 1); }
    }
    */


    this.data = []

    var classes = []
    var data = []

    for (classN = 0; classN < order.length; classN++) {
      var today = new Date();
      classTime = '00:00 AM - 00:00 AM';
      if ((typeof order[classN]) == 'number') { classTime = getClassTime(classN + 1, letterDay); }
      else { classTime = getClassTime(order[classN], letterDay); }

      dashIndex = classTime.indexOf('-');
      dashSplit = [classTime.substring(0, dashIndex - 1), classTime.substring(dashIndex + 2, classTime.length)]
      afternoon1 = 0;
      afternoon2 = 0;
      if (dashSplit[0].indexOf('PM') > -1) { afternoon1 = 12; }
      if (dashSplit[1].indexOf('PM') > -1) { afternoon2 = 12; }

      hour1 = parseInt(dashSplit[0].substring(0, dashSplit[0].indexOf(':')));
      if (hour1 < 12) { hour1 += afternoon1; }
      minute1 = parseInt(dashSplit[0].substring(dashSplit[0].indexOf(':') + 1, dashSplit[0].indexOf('M') - 1));
      hour2 = parseInt(dashSplit[1].substring(0, dashSplit[1].indexOf(':')));
      if (hour2 < 12) { hour2 += afternoon2; }
      minute2 = parseInt(dashSplit[1].substring(dashSplit[1].indexOf(':') + 1, dashSplit[1].indexOf('M') - 1));

      lower = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour1, minute1, 0, 0);
      upper = new Date(today.getFullYear(), today.getMonth(), today.getDate(), hour2, minute2, 0, 0);

      if ((typeof order[classN]) == 'number') {
        if (lower.valueOf() < today.valueOf() && today.valueOf() < upper.valueOf()) {
          data = data.concat({time: classTime, title: orderedSchedule[order[classN] - 1]["Course Name"], description: (orderedSchedule[order[classN] - 1]["Teacher"] + " \n" + orderedSchedule[order[classN] - 1]["Room"]), circleSize : 25, circleColor :'rgb(234, 49, 16)', dotColor: 'aqua'});
        }
        else {
          data = data.concat({time: classTime, title: orderedSchedule[order[classN] - 1]["Course Name"], description: (orderedSchedule[order[classN] - 1]["Teacher"] + " \n" + orderedSchedule[order[classN] - 1]["Room"])});
        }
      }


      else {
        classTime = getClassTime(order[classN], letterDay);

        if (lower.valueOf() < today.valueOf() && today.valueOf() < upper.valueOf()) {
          data = data.concat({time: classTime, title: order[classN], description: '', circleSize : 25, circleColor : 'rgb(234, 49, 16)'});
        }
        else {
          data = data.concat({time: classTime, title: order[classN], description: ''});
        }
        order.splice(classN, 1);
        classN--;
      }
    }
    this.data = data;
  }


  constructor(props){
    super(props)
    //this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this._retrieveData = this._retrieveData.bind(this)
    this.createTimeline = this.createTimeline.bind(this)

    const { navigation } = this.props;

    this.username = '';
    this.password = '';
    this.schedule = '';
    this.matrix = '';
    this.weekly = '';
    this.letterDay = '';


    try {
      this.username = navigation.getParam('username', 'DummyUsername');
      this.password = navigation.getParam('password', 'DummyPassword');
      this.schedule = JSON.parse(navigation.getParam('schedule', 'DummySchedule'));
      this.matrix = JSON.parse(navigation.getParam('matrix', 'DummyMatrix'));
      this.weekly = JSON.parse(navigation.getParam('weekly', 'DummyWeekly'));
      this.letterDay = navigation.getParam('letterDay', 'A');
    }
    catch (err) {
      this._retrieveData();
    }

    const username = this.username;
    const password = this.password;
    const schedule = this.schedule;
    const matrix = this.matrix;
    const weekly = this.weekly;
    if (this.letterDay == "No school today") {
      this.letterDay = 'A';
    }
    const letterDay = this.letterDay;

    this.state = {
      isRefreshing: false,
      waiting: false,
      data: this.data,
      username: username,
      password: password,
      schedule: this.schedule,
      matrix: matrix,
      weekly: weekly,
      letterDay: letterDay,
    }


    this.createTimeline(username, password, schedule, matrix, weekly, letterDay);

  }

  onRefresh(){
    this.setState({isRefreshing: true});
    setTimeout(() => {
      this.createTimeline(this.state.username, this.state.password, this.state.schedule, this.state.matrix, this.state.weekly, this.state.letterDay);
      this.setState({
        data: this.data,
        isRefreshing: false
      });
    }, 2000);
  }

/*
  onEndReached() {
    if (!this.state.waiting) {
        this.setState({waiting: true});

        //fetch and concat data
        setTimeout(() => {

          //refresh to initial data
          var data = this.state.data.concat(
            [
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'},
              {time: '18:00', title: 'Load more data', description: 'append event at bottom of timeline'}
            ]
            )

          this.setState({
            waiting: false,
            data: data,
          });
        }, 2000);
    }
  }
  */

  renderFooter() {
    if (this.state.waiting) {
        return <ActivityIndicator />;
    } else {
        return <Text> </Text>;
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <Timeline
          data={this.data}
          style={styles.list}
          circleSize={20}
          circleColor='rgb(45,156,219)'
          lineColor='rgb(45,156,219)'
          timeContainerStyle={{minWidth:150, marginTop: -5}}
          timeStyle={{textAlign: 'center', backgroundColor: 'rgb(42, 76, 130)', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          innerCircle={'dot'}
          options={{
            refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            renderFooter: this.renderFooter,
            //onEndReached: this.onEndReached,
            style:{paddingTop: 5}
          }}
        />
      </View>
    );
  }
}

export default TimelineScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
    backgroundColor:'white'
  },
  list: {
    flex: 1,
  },
});
