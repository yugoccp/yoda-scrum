import React from 'react'
import { Form, Button, Input } from 'antd';
import { joinDsm } from '../client';

class DsmJoinView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			dsmCode: "DSM001",
			name: ""
		}
		this.handleJoin = this.handleJoin.bind(this);
	}
	

	handleJoin() {
		const {name} = this.state;
		if (name && name !== "") {
			joinDsm(name)
			.then((res) => {
				console.log(res)
				this.props.history.push('/dsm/room')
			});
		}
	}

	render() {
		const { dsmCode, name } = this.state;
		return (
			<div>
				<Form>
					<Form.Item label="DSM code">
						<Input value={dsmCode} onChange={e => this.setState({dsmCode: e.target.value})}></Input>
					</Form.Item>
					<Form.Item label="Name">
						<Input value={name} onChange={e => this.setState({name: e.target.value})}></Input>
					</Form.Item>
					<Form.Item>
						<Button type="primary" onClick={this.handleJoin}>Join DSM</Button>
					</Form.Item>
				</Form>
			</div>
		);
	}
}

export default DsmJoinView