import React from 'react';
import { connect } from 'react-redux';
import { Button, List } from 'antd';
import { next } from '../actions';
import Timer from '../components/Timer';
import DarthVader from '../components/char/DarthVader';

const timeout = 2;
class DsmTimerView extends React.Component {
  render() {
		const { username, timer, members, currentMemberIndex, next } = this.props;
		const currentMember = members[currentMemberIndex];
    const overdue = timer > timeout;
    return (
      <div>
        { overdue && currentMember.name === username &&
          <div style={{position: "absolute", left:"50px", top: "30px"}}>
            <DarthVader name={currentMember.name} />
          </div>
        }
        <div>
          <Timer currentMs={timer} styleClass={overdue ? 'timer timeout' : 'timer'}/>
          <List
            bordered
            dataSource={members}
            renderItem={item => (<List.Item>{item.name}</List.Item>)}
          ></List>
          <div>
						<Button type="primary" onClick={next}>Next</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
	members: state.members,
	username: state.username,
	currentMemberIndex: state.currentMemberIndex,
	timer: state.timer
})

const mapDispatchToProps = dispatch => ({
	next: () => dispatch(next())
})

export default connect(mapStateToProps, mapDispatchToProps)(DsmTimerView);
