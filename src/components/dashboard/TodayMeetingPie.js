import React from 'react';
import Highcharts from 'highcharts/highcharts';
import HighchartsReact from 'highcharts-react-official';

const TodayMeetingPie = ({ data, labels }) => {
  if (data.length > 0) {
    const lastMeeting = data[data.length - 1];
    const padawanTimeInSecData = lastMeeting.padawansData.map(pd => { return { name: labels[pd.username], y: pd.timeInSec }})

    const options = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
      },
      title: {
          text: 'Today Meeting'
      },
      tooltip: {
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions: {
          pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                  enabled: false
              },
              showInLegend: true
          }
      },
      series: [{
        name: 'Today meeting stats',
        colorByPoint: true,
        data: padawanTimeInSecData
      }]
    }

    return <HighchartsReact
      highcharts={Highcharts}
      constructorType={'chart'}
      options={options}
    />
  }

  return <div>No data yet...</div>

}

export default TodayMeetingPie;
