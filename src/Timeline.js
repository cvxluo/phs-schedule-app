import React, {Component} from 'react';
import { View, StyleSheet, StatusBar, RefreshControl, ActivityIndicator, Text } from "react-native";
import Timeline from 'react-native-timeline-listview'
import infoSubmit from './sync'

import { getClassOrder, getClassTime } from './hardSchedule.js'


class TimelineScreen extends Component {

  constructor(props){
    super(props)
    //this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)

    const { navigation } = this.props;

    const username = navigation.getParam('username', 'DummyUsername');
    const password = navigation.getParam('password', 'DummyPassword');
    const schedule = JSON.parse(navigation.getParam('schedule', 'DummySchedule'));
    const matrix = JSON.parse(navigation.getParam('matrix', 'DummyMatrix'));
    const weekly = JSON.parse(navigation.getParam('weekly', 'DummyWeekly'));
    const letterDay = 'A'; // temporary code- use this for real: navigation.getParam('letterDay', 'No School Today');
    const order = getClassOrder(letterDay);

    const classOrder = matrix[matrix.length - 1];
    var orderedSchedule = []


    for (i = 4; i < 12; i++) {
      for (j = 0; j < schedule.length; j++) {
        if (classOrder[i]) {
          if (classOrder[i].indexOf(schedule[j]["Course Name"]) > - 1) { orderedSchedule.push(schedule[j]); }
        }
        else {
          orderedSchedule.splice(i - 4, 0, {
            "Course Name" : "Free Period",
            "Exp" : '',
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
          orderedSchedule[j]["Course Name"] = "Free Period";
          orderedSchedule[j]["Teacher"] = "Free Gym";
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
      if ((typeof order[classN]) == 'number') {
        classTime = getClassTime(classN + 1, letterDay);
        dashIndex = classTime.indexOf('-');
        dashSplit = [classTime.substring(0, dashIndex - 1), classTime.substring(dashIndex + 2, classTime.length - 1)]
        hour1 = dashSplit[0].substring(0, dashSplit[0].indexOf(':'));
        minute1 = dashSplit[0].substring(dashSplit[0].indexOf(':'), dashSplit[0].length - 1);
        hour2 = dashSplit[1].substring(0, dashSplit[1].indexOf(':'));
        minute2 = dashSplit[1].substring(dashSplit[1].indexOf(':'), dashSplit[1].length - 1);

        lower = new Date(today.getFullYear(), today.getMonth(), hour1, minute1, 0, 0);
        upper = new Date(today.getFullYear(), today.getMonth(), hour2, minute2, 0, 0);
        if (lower.valueOf() < today.valueOf() && today.valueOf() < upper.valueOf()) {
          data = data.concat({time: classTime, title: orderedSchedule[order[classN] - 1]["Course Name"], description: orderedSchedule[order[classN] - 1]["Teacher"], circleSize : 25, circleColor :'rgb(234, 49, 16)'});
        }
        data = data.concat({time: classTime, title: orderedSchedule[order[classN] - 1]["Course Name"], description: orderedSchedule[order[classN] - 1]["Teacher"]});
      }


      else {
        classTime = getClassTime(order[classN], letterDay);
        dashIndex = classTime.indexOf('-');
        dashSplit = [classTime.substring(0, dashIndex - 1), classTime.substring(dashIndex + 2, classTime.length - 1)]
        hour1 = dashSplit[0].substring(0, dashSplit[0].indexOf(':'));
        minute1 = dashSplit[0].substring(dashSplit[0].indexOf(':'), dashSplit[0].length - 1);
        hour2 = dashSplit[1].substring(0, dashSplit[1].indexOf(':'));
        minute2 = dashSplit[1].substring(dashSplit[1].indexOf(':'), dashSplit[1].length - 1);

        lower = new Date(today.getFullYear(), today.getMonth(), hour1, minute1, 0, 0);
        upper = new Date(today.getFullYear(), today.getMonth(), hour2, minute2, 0, 0);
        if (lower.valueOf() < today.valueOf() && today.valueOf() < upper.valueOf()) {
          data = data.concat({time: classTime, title: order[classN], description: '', circleSize : 25, circleColor : 'rgb(234, 49, 16)'});
        }
        data = data.concat({time: classTime, title: order[classN], description: ''});
        order.splice(classN, 1);
        classN--;
      }
    }
    this.data = data;

    this.state = {
      isRefreshing: false,
      waiting: false,
      data: this.data,
      schedule: orderedSchedule,
    }

  }

  onRefresh(){
    this.setState({isRefreshing: true});
    //refresh to initial data
    setTimeout(() => {
      //refresh to initial data
      this.setState({
        data: this.data,
        isRefreshing: false
      });
    }, 10000);
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
          timeStyle={{textAlign: 'center', backgroundColor: '#008080', color:'white', padding:5, borderRadius:13}}
          descriptionStyle={{color:'gray'}}
          options={{
            refreshControl: (
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh}
              />
            ),
            renderFooter: this.renderFooter,
            onEndReached: this.onEndReached,
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
