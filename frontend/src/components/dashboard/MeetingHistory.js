import React from 'react';
import Highcharts from 'highcharts/highcharts'
import HighchartsReact from 'highcharts-react-official'

function buildHistoryLine(data) {

  const historyLineData = data.reduce((result, d) => {

			const value = [d.date, parseInt(d.timeInMs)];
      result['meeting'].data.push(value);

      d.members.forEach(m => {
        if (result[m.name]) {
          result[m.name].data.push(value);
        } else {
          result[m.name] = {
            name: m.name,
            type: 'spline',
            data: [value]
          };
        }
      })
      return result;
    }, {
      meeting: {
        type: 'column',
        name: 'Total Meeting Time (s)',
        data: []
      }
    });

  return Object.values(historyLineData);
}

const MeetingHistory = ({ data }) => {
  if (data.length > 0) {
    const historyLine = buildHistoryLine(data);
    const options = {
      title: {
        text: 'Meetings History'
      },
      xAxis: {
        type: 'datetime'
      },
      series: historyLine
    }
    return <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
      options={options}
      />
  }

  return <p>No data, no history...</p>

}

export default MeetingHistory;
