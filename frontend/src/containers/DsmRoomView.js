import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchMembers, start } from '../actions';
import { Form, Button, List } from 'antd';

class DsmRoomView extends Component {
	
	componentDidMount() {
		this.props.fetchMembers();
	}

  render() {
		const { members, start, currentMemberIndex } = this.props;
		if (currentMemberIndex >= 0) {
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
							<List
								style={{color: "white"}}
								bordered
								dataSource={members.map(m => m.name)}
								renderItem={item => (<List.Item>{item}</List.Item>)}
							></List>
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
	currentMemberIndex: state.currentMemberIndex
})

const mapDispatchToProps = dispatch => ({
	fetchMembers: () => dispatch(fetchMembers()),
	start: () => dispatch(start())
})

export default connect(mapStateToProps, mapDispatchToProps)(DsmRoomView)
