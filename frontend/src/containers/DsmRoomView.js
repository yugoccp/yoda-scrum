import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchMembers, start, remove } from '../actions';
import { Form, Button, Table } from 'antd';
import * as MeetingStatus from '../constants/MeetingStatus';

class DsmRoomView extends Component {
	
	componentDidMount() {
		this.props.fetchMembers();
	}

  render() {
		const { members, start, remove, meetingStatus } = this.props;
		if (meetingStatus === MeetingStatus.IN_PROGRESS) {
			return <Redirect to="/dsm/timer" />
		} else {
			return (
				<div id="dsm-setup-view">
					<div>
						<h1 className="title">Yoda DSM</h1>
					</div>
					<Form>
						<Form.Item>
							<Button type="primary" onClick={start}>Start DSM!</Button>
						</Form.Item>
						<Form.Item label="The choosen ones: ">
							<Table
								className='table'
								size='middle'
								showHeader={false}
								pagination={false}
								dataSource={members}>
								<Table.Column dataIndex='name'/>
								<Table.Column align='right' render={(text, member) => <a onClick={() => remove(member.name)}>Remove</a>}/></Table>
						</Form.Item>
					</Form>
				</div>
			);
		}
  }
}

const mapStateToProps = state => ({
	members: state.members,
	username: state.username,
	meetingStatus: state.meetingStatus
})

const mapDispatchToProps = dispatch => ({
	fetchMembers: () => dispatch(fetchMembers()),
	start: () => dispatch(start()),
	remove: name => dispatch(remove(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(DsmRoomView)
