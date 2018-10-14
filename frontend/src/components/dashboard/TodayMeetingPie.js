import React from 'react';
import Highcharts from 'highcharts/highcharts';
import HighchartsReact from 'highcharts-react-official';

const TodayMeetingPie = ({ data }) => {
	if (data.length > 0) {
		const timeByMember = data.map(m => ({ name: m.name, y: m.timeInMs }));
		const options = {
			chart: {
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},
			title: {
				text: 'Today DSM'
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
				name: 'Today DSM',
				colorByPoint: true,
				data: timeByMember
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
