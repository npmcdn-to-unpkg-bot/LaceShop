import 'core-js/fn/object/assign';
/*
import React from 'react';
import ReactDOM from 'react-dom';
import SupplyProducts from './components/SupplyProducts';
*/
// Render the main component into the dom
// Edit by index temporarily
// ReactDOM.render(<SupplyProducts />, document.getElementById('app'));

import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './containers/App';
import configureStore from './stores/ConfigureStore';

const store = configureStore();

// Render the main component into the dom
ReactDOM.render(
	<Provider store={store}>
		<App active="2"/>
	</Provider>,
	document.getElementById('app')
);