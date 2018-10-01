import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMember, updateMember, fetchMembers } from '../actions';
import { Form, Button, InputNumber, List } from 'antd';
import { updateTimeout } from '../client';

class DsmRoomView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      timeout: 2
		}
		this.onChangeTimeout = this.onChangeTimeout.bind(this);
	}
	
	componentDidMount() {
		this.props.fetchMembers();
	}

  onChangeTimeout(timeout) {
    updateTimeout(timeout);
  }

  render() {

    const { timeout } = this.state;
		const { onStartMeeting, onInvite, members } = this.props;

    return (
      <div id="dsm-setup-view">

        <div>
          <h1 className="title">Yoda DSM</h1>
        </div>

        <Form>
          <Form.Item label="Training (min): ">
            <InputNumber value={timeout} onChange={(value) => this.onChangeTimeout(value)}/>
          </Form.Item>

          <Form.Item label="The choosen ones: ">
            <List
							style={{color: "white"}}
              bordered
              dataSource={members.map(m => m.name)}
              renderItem={item => (<List.Item>{item}</List.Item>)}
            ></List>
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={() => onInvite()}>Invite Padawans</Button>
            <Button type="primary" onClick={() => onStartMeeting(timeout, members)}>Start DSM!</Button>
          </Form.Item>
        </Form>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  members: state.membersReducer.members
})

const mapDispatchToProps = dispatch => ({
  addMember: member => dispatch(addMember(member)),
	updateMember: member => dispatch(updateMember(member)),
	fetchMembers: () => dispatch(fetchMembers())
})

export default connect(mapStateToProps, mapDispatchToProps)(DsmRoomView)
