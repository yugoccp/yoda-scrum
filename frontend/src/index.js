import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import 'antd/dist/antd.css';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducer from './reducers';

const store = createStore(
	reducer,
	applyMiddleware(thunk)
)

ReactDOM.render(
		<Provider store={store}>
			<App />
		</Provider>
		, document.getElementById('root'));
registerServiceWorker();
