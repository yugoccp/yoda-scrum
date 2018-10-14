import React from 'react';
import Highcharts from 'highcharts/highcharts';
import HighchartsReact from 'highcharts-react-official';
import moment from 'moment-business-days';

function calcMissingDays(data) {

  const minDate = data[0].date
  const maxDate = data[data.length -1].date;
  const businessDays = moment(minDate).businessDiff(maxDate);

  const missingDays = businessDays - data.length;

  return missingDays;

}

const MeetingDaysBar = ({data}) => {

  if (data.length > 0) {

    const missingDays = calcMissingDays(data);
    const meetingDays = data.length;

    const options = {
      chart: {
        type: 'bar'
      },
      title: {
        text: 'Meeting Days'
      },
      xAxis: {
        categories: ['Meeting days', 'Missing days'],
        title: {
            text: null
        }
      },
      series: [{
        name: "Days",
        data: [meetingDays, missingDays]
      }]
    }

    return <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
      options={options}
      />

  }

  return <p>No data yet...</p>
}

export default MeetingDaysBar;
