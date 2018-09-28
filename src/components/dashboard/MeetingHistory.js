import React from 'react';
import Highcharts from 'highcharts/highcharts'
import HighchartsReact from 'highcharts-react-official'

function buildHistoryLine(data, labels) {

  if(labels.length === 0 || data.length === 0) {
    console.log("No data, no history...");
    return [];
  }

  const historyLineData = data.reduce((result, d) => {

      result['meeting'].data.push([d.date.valueOf(), d.timeInSec]);

      d.padawansData.forEach(pd => {
        if (result[pd.username]) {
          result[pd.username].data.push([d.date.valueOf(), pd.timeInSec]);
        } else {
          result[pd.username] = {
            type: 'spline',
            name: labels[pd.username],
            data: [[d.date.valueOf(), pd.timeInSec]]
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

const MeetingHistory = ({ data, labels }) => {

  if (data.length > 0) {

    const historyLine = buildHistoryLine(data, labels);

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

  return <p>No data yet...</p>

}

export default MeetingHistory;
