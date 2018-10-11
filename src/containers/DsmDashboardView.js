import React, { Component } from 'react';
import MeetingHistory from '../components/dashboard/MeetingHistory';
import TodayMeetingPie from '../components/dashboard/TodayMeetingPie';
import MeetingDaysBar from '../components/dashboard/MeetingDaysBar';
import moment from 'moment';
import { getPadawans, getMeetings } from '../api';

const StatsCharts = ({data, labels}) => {

  if (Object.keys(labels).length > 0 && data.length > 0) {
    return (
      <div className="flex-wrapper">
        <div className="flex-item flex-item-lg">
          <MeetingHistory data={ data } labels={labels} />
        </div>
        <div className="flex-item flex-item-sm">
          <TodayMeetingPie data={ data } labels={labels} />
        </div>
        <div className="flex-item flex-item-sm">
          <MeetingDaysBar data={ data } />
        </div>
      </div>);
  }

  return <p>Fetching data...</p>
}

class DsmDashboardView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      data: []
    }
  }

  componentWillMount() {
    this.fetchLabels();
    this.fetchData();
  }

  async fetchLabels() {
    const padawans = await getPadawans();
    const labels = padawans.reduce((result, p) => {
      result[p.username] = p.name;
      return result;
    }, {})

    this.setState({ labels });
  }

  async fetchData() {
    const meetings = await getMeetings();
    const cleansedData = meetings
                          .map((d) => {
                            return {
                              date: moment(d.date),
                              padawansData: d.padawansData,
                              timeout: d.timeout,
                              timeInSec: d.timeInSec
                            }
                          })
                          .sort((a, b) =>
                            a.date.diff(b.date)
                          );

    this.setState({ data: cleansedData });
  }

  render() {
    const { data, labels } = this.state;

    return (
      <div>
        <h1 className="title">Meeting Stats</h1>
        <StatsCharts data={ data } labels={ labels } />
      </div>);
  }
}

export default DsmDashboardView;
