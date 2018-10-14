import React, { Component } from 'react';
import { connect } from 'react-redux';
import MeetingHistory from '../components/dashboard/MeetingHistory';
import TodayMeetingPie from '../components/dashboard/TodayMeetingPie';
import { fetchDsmData } from '../actions'

class DsmDashboardView extends Component {

  componentDidMount() {
    this.props.fetchDsmData();
	}
	
  render() {
    const { dsmData, members, isDsmDataLoading } = this.props;

    return (
      <div>
        <h1 className="title">Meeting Stats</h1>
				{
					isDsmDataLoading ? 
					<p>Fetching data...</p> :
					<div>
						<div className="col-sm-12 col-md-6">
							<MeetingHistory data={ dsmData } />
						</div>
						<div className="col-sm-12 col-md-6">
							<TodayMeetingPie data={ members } />
						</div>
					</div>
				}
			</div>);
  }
}

const mapStateToProps = state => ({
	members: state.members,
	dsmData: state.dsmData,
	isDsmDataLoading: state.isDsmDataLoading
})

const mapDispatchToProps = dispatch => ({
	fetchDsmData: () => dispatch(fetchDsmData())
})

export default connect(mapStateToProps, mapDispatchToProps)(DsmDashboardView)