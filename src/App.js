import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DsmRoomView from './containers/DsmRoomView';
import DsmJoinView from './containers/DsmJoinView';
import DsmTimerView from './containers/DsmTimerView';
import { initSubscriptions } from './actions';
// import DsmStatsView from './containers/DsmStatsView';
import './App.css';

class App extends Component {

	componentDidMount() {
		this.props.initSubscriptions();
	}

  render() {
    return (
        <div className='App'>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" render={() => <Redirect to="/dsm/join"/>}></Route>
							<Route exact path="/dsm/room" component={DsmRoomView}></Route>
							<Route exact path="/dsm/join" component={DsmJoinView}></Route>
							<Route exact path="/dsm/timer" component={DsmTimerView}></Route>
							{/* 
							<Route path="/dsm/:dsmId/stats" component={DsmStatsView}></Route> */}
						</Switch>
					</BrowserRouter>
        </div>
    );
  }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
  initSubscriptions: () => dispatch(initSubscriptions())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
