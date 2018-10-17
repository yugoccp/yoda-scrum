import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Form, Button, List } from 'antd';
import StormtrooperImg from '../assets/img/stormtrooper-head.png';
import JediImg from '../assets/img/jedi-head.png';
import R2d2Img from '../assets/img/r2d2-icon.png';
import { next, fetchMembers } from '../actions';
import Timer from '../components/Timer';
import DarthVader from '../components/char/DarthVader';

// Setup timeout to 2 minutes
const timeout = 1000*60*2;

const ListItem = function({item}) {
	const avatarImg = item.status !== 'DONE'  ? R2d2Img : item.timeInMs > timeout ? StormtrooperImg : JediImg;
	return (
		<List.Item>
			<List.Item.Meta
				avatar={<img src={avatarImg} alt='img'/>}
				title={<p style={{color: "white"}}>{item.name}</p>}
			/>
			<div>{item.timeInMs}</div>
		</List.Item>);
}

class DsmTimerView extends React.Component {

	componentDidMount() {
		this.props.fetchMembers();
	}

  render() {
		const { username, timer, members, currentMemberIndex, next, meetingStatus } = this.props;
		const currentMember = members[currentMemberIndex];
		const overdue = timer > timeout;
		const meetingStatusMessage = "Waiting meeting to start...";
		const isCurrentMember = currentMember.name === username;
		switch (meetingStatus) {
			case 'WAITING':
				return (
					<div>
						<div>
							<h1 style={{color: "white"}}>{meetingStatusMessage}</h1>
						</div>
					</div>
				);
			case 'IN_PROGRESS':
				return (
					<div>
						<div>
							<h1 className="title">Go {currentMember.name}!</h1>
						</div>
						<div>
							<Timer currentMs={timer} styleClass={overdue ? 'timer timeout' : 'timer'}/>
							<Form>
								{isCurrentMember && 
									<Form.Item>
										<Button type="primary" onClick={next}>Next</Button>
									</Form.Item>
								}
								<Form.Item>
									<List
										style={{color: "white"}}
										bordered
										dataSource={members}
										renderItem={item => (<ListItem item={item} />)}
										></List>
								</Form.Item>
							</Form>
						</div>
						{ overdue && isCurrentMember &&
							<div>
								<DarthVader name={currentMember.name} />
							</div>
						}
					</div>
				);
			case 'FINISHED':
				return <Redirect to='/dsm/dashboard'/>;
			default:
				return (
					<div>
						<div>
							<h1 style={{color: "white"}}>{meetingStatusMessage}</h1>
						</div>
					</div>
				);
		};
  }
}

const mapStateToProps = state => ({
	members: state.members,
	username: state.username,
	currentMemberIndex: state.currentMemberIndex,
	timer: state.timer,
	meetingStatus: state.meetingStatus
})

const mapDispatchToProps = dispatch => ({
	fetchMembers: () => dispatch(fetchMembers()),
	next: () => dispatch(next())
})

export default connect(mapStateToProps, mapDispatchToProps)(DsmTimerView);
