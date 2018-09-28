import React, { Component } from 'react';
import SettingsView from './containers/SettingsView';
import MeetingView from './containers/MeetingView';
import StatsView from './containers/StatsView';
import { getPadawans, saveMeeting } from './Server';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      ActiveView: () => <div>Loading...</div>
    }

    this.onStartMeeting = this.onStartMeeting.bind(this);
    this.onCompleteMeeting = this.onCompleteMeeting.bind(this);
  }

  componentDidMount() {
    this.initYodaMeeting();
  }

  async initYodaMeeting() {
    const padawans = await getPadawans();

    // Go to SettingsView
    this.setState({ActiveView: () =>
      <SettingsView
      padawans={padawans}
      onStartMeeting={this.onStartMeeting}/>});
  }

  onStartMeeting(timeout, choosenOnes) {
    // Go to MeetingView
    this.setState({ActiveView: () =>
      <MeetingView
        choosenOnes={choosenOnes}
        timeout={timeout}
        onCompleteMeeting={this.onCompleteMeeting}/>});
  }

  async onCompleteMeeting(meeting) {
    // Save meeting
    await saveMeeting(meeting);

    // Go to StatsView
    this.setState({ActiveView: () => <StatsView />});
  }

  render() {

    const { ActiveView } = this.state;

    return (
        <div className='App'>
          <ActiveView />
        </div>
    );
  }
}

export default App;
