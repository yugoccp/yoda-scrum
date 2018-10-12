import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import DsmRoomView from './containers/DsmRoomView';
import DsmJoinView from './containers/DsmJoinView';
import DsmTimerView from './containers/DsmTimerView';
import { initSubscriptions } from './actions';
// import DsmStatsView from './containers/DsmStatsView';
import './App.css';

class App extends Component {

	componentDidMount() {
		initSubscriptions();
	}

  render() {
    return (
        <div className='App'>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" render={() => <Redirect to="/dsm/join"/>}></Route>
							<Route exact path="/dsm/join" component={DsmJoinView}></Route>
							<Route exact path="/dsm/room" component={DsmRoomView}></Route>
							<Route exact path="/dsm/timer" component={DsmTimerView}></Route>
						</Switch>
					</BrowserRouter>
        </div>
    );
  }
}

export default App;
