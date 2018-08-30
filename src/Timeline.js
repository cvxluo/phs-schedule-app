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
          orderedSchedule.splice(i - 4, 0, {"Course Name" : "Free Period"});
          break;
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
      if ((typeof order[classN]) == 'number') {
        data = data.concat({time: getClassTime(classN + 1, letterDay), title: orderedSchedule[order[classN] - 1]["Course Name"], description: orderedSchedule[order[classN] - 1]["Teacher"]});
      }
      else {
        data = data.concat({time: getClassTime(order[classN], letterDay), title: order[classN], description: ''});
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
