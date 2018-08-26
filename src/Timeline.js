import React, {Component} from 'react';
import { StatusBar, RefreshControl, ActivityIndicator, Text } from "react-native";
import Timeline from 'react-native-timeline-listview'
import infoSubmit from './sync'


class TimelineScreen extends Component {

  constructor(props){
    super(props)
    this.onEndReached = this.onEndReached.bind(this)
    this.renderFooter = this.renderFooter.bind(this)
    this.onRefresh = this.onRefresh.bind(this)

    const { navigation } = this.props;

    const username = navigation.getParam('username', 'DummyUsername');
    const password = navigation.getParam('password', 'DummyPassword');
    const schedule = navigation.getParam('schedule', 'DummySchedule');

    this.data = [
      {time: '09:00', title: 'Event 1', description: 'Login to get your classes!'},
    ]

    this.state = {
      isRefreshing: false,
      waiting: false,
      data: this.data,
      schedule: schedule,
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

  renderFooter() {
    if (this.state.waiting) {
        return <ActivityIndicator />;
    } else {
        return <Text> </Text>;
    }
  }


  render() {
    return (
      <Timeline
        data={this.data}
        circleSize={20}
        circleColor='rgb(45,156,219)'
        lineColor='rgb(45,156,219)'
        timeContainerStyle={{minWidth:52, marginTop: -5}}
        timeStyle={{textAlign: 'center', backgroundColor:'#FFFFFF', color:'black', padding:5, borderRadius:13}}
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
          style:{paddingTop:20}
        }}
      />
    );
  }
}

export default TimelineScreen;
