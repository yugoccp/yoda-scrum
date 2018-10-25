import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { Form, Button, Table } from "antd";
import StormtrooperImg from "../assets/img/stormtrooper-head.png";
import JediImg from "../assets/img/jedi-head.png";
import R2d2Img from "../assets/img/r2d2-icon.png";
import { next, fetchMembers } from "../actions";
import Timer from "../components/Timer";
import DarthVader from "../components/char/DarthVader";
import * as MemberStatus from "../constants/MemberStatus";
import * as MeetingStatus from "../constants/MeetingStatus";
import {toTimerString} from '../utils';
import "./DsmTimerView.css";

// Setup timeout to 2 minutes
const timeout = 1000 * 60 * 2;

const Waiting = () => (
  <div>
    <div>
      <h1 style={{ color: "white" }}>Waiting meeting to start...</h1>
    </div>
  </div>
);

class DsmTimerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeInMs: 0,
      timerIntervalId: undefined,
			currentMember: undefined
    };
    this.handleNext = this.handleNext.bind(this);
  }

  componentDidMount() {
    this.props.fetchMembers();
  }

  componentDidUpdate(prevProps) {
    const { currentMember } = this.state;
		const { members } = this.props;

    const nextMember = members.find(m => m.status === MemberStatus.IN_PROGRESS);
    if (!currentMember || currentMember.name !== nextMember.name) {
      this.setState({ currentMember: nextMember });
      this.startTimerInterval(nextMember.startTime);
    }
  }

  startTimerInterval(startTime) {
    const { timerIntervalId } = this.state;
    if (!timerIntervalId) {
      const timerIntervalId = setInterval(() => {
        const timeInMs = Date.now() - startTime;
        this.setState({ timeInMs });
      }, 100);
      this.setState({ timerIntervalId });
    }
  }

  clearTimerInterval() {
    const { timerIntervalId } = this.state;
    if (timerIntervalId) {
      clearInterval(timerIntervalId);
      this.setState({ timerIntervalId: undefined });
    }
  }

  handleNext() {
    this.clearTimerInterval();
		this.props.next(this.state.timeInMs);
  }

  render() {
    const { timeInMs, currentMember } = this.state;
    const { username, meetingStatus, members } = this.props;
		const viewStatus = currentMember ? meetingStatus : MeetingStatus.WAITING;
		const tableDataSource = members.map(m => {
			const avatarImg = m.status !== MemberStatus.DONE ? R2d2Img : m.timeInMs > timeout ? StormtrooperImg : JediImg;
			return {
				key: m.name,
				avatar: avatarImg,
				name: m.name,
				time: toTimerString(m.timeInMs)
			};
		});
    switch (viewStatus) {
      case MeetingStatus.WAITING:
        return <Waiting />;
      case MeetingStatus.IN_PROGRESS:
				const overdue = timeInMs > timeout;
        const isCurrentMember = currentMember.name === username;
        return (
          <div>
            <div>
              <h1 className="title">Go {currentMember.name}!</h1>
            </div>
            <div>
              <Timer
                currentMs={timeInMs}
                styleClass={overdue ? "timer timeout" : "timer"}
              />
              <Form>
                {/* {isCurrentMember && (
                  <Form.Item>
                    <Button type="primary" onClick={this.handleNext}>
                      Next
                    </Button>
                  </Form.Item>
								)} */}
								 <Form.Item>
                    <Button type="primary" onClick={this.handleNext}>
                      Next
                    </Button>
                  </Form.Item>
                <Form.Item>
                  <Table
										className='table'
										size='middle'
										showHeader={false}
										pagination={false}
										dataSource={tableDataSource}>
										<Table.Column dataIndex='avatar' render={img => <img src={img} alt='avatar'/>}/>
										<Table.Column dataIndex='name'/>
										<Table.Column dataIndex='time' align='right' className='timer-digit'/>
									</Table>
                </Form.Item>
              </Form>
            </div>
            {overdue && isCurrentMember && (
                <div>
                  <DarthVader name={currentMember.name} />
                </div>
              )}
          </div>
        );
      case MeetingStatus.FINISHED:
        return <Redirect to="/dsm/dashboard" />;
      default:
        return <Waiting />;
    }
  }
}

const mapStateToProps = state => ({
  members: state.members,
  username: state.username,
  meetingStatus: state.meetingStatus
});

const mapDispatchToProps = dispatch => ({
  fetchMembers: () => dispatch(fetchMembers()),
  next: timeInMs => dispatch(next(timeInMs))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DsmTimerView);
