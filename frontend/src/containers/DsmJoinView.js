import React from 'react';
import {connect} from 'react-redux';
import { Form, Button, Input } from 'antd';
import { join } from '../actions';
import { Redirect } from 'react-router-dom';
import Yoda from '../components/char/Yoda';

class DsmJoinView extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			name: ''
		}
		this.handleJoin = this.handleJoin.bind(this);
		this.handleUser = this.handleUser.bind(this);
	}
	
	handleJoin() {
		const {name} = this.state;
		if (name && name !== "") {
			this.props.join(name);
			localStorage.setItem('username', name);
		}
	}

	handleUser() {
		const username = localStorage.getItem('username');
		if (username) {
			this.setState({name: username});
		}
	}

	componentDidMount() {
		this.handleUser();
	}

	render() {
		const { username } = this.props;
		if (username && username.length > 0) {
			return <Redirect to="/dsm/room" />
		} else {
			const { name } = this.state;
			return (
				<div>
					<div>
						<h1 className="title">Yoda DSM</h1>
					</div>
					<Form>
						<Form.Item label="Name">
							<Input value={name} onChange={e => this.setState({name: e.target.value})}></Input>
						</Form.Item>
						<Form.Item>
							<Button type="primary" onClick={this.handleJoin}>Join DSM</Button>
						</Form.Item>
					</Form>
					<Yoda />
				</div>
			);
		}
	}
}

const mapStateToProps = state => ({
	username: state.username
})

const mapDispatchToProps = dispatch => ({
	join: name => dispatch(join(name))
})

export default connect(mapStateToProps, mapDispatchToProps)(DsmJoinView)