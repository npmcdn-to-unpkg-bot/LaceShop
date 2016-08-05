import 'core-js/fn/object/assign';
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import configureStore from './stores/ConfigureStore';
import { Provider } from 'react-redux';
import App from './containers/App';
import Index from './components/IndexProduct';
import SupplyProduct from './containers/SupplyProduct';
import callMe from './containers/callMe';
import suggestionFeedback from './containers/suggestionFeedback'

const store = configureStore();

browserHistory.listen((params) => {
	console.log('router listen', params);
});

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
		    <Route path="/" component={App}>
		    	<IndexRoute component={Index}/>
		    	<Route path="/user/:indexName" component={Index}/>
		    	<Route path="SupplyProduct" component={SupplyProduct}/>
		    	<Route path="suggestionFeedback" component={suggestionFeedback}/>
		    	<Route path="callMe" component={callMe}/>
		    	<Route path="*" component={Index}/>
		    </Route>
	  	</Router>
  	</Provider>, 
  	document.getElementById('app')
);