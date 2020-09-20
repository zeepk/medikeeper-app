import React from 'react';
import Dashboard from './Dashboard';
import APITest from './APITest';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const CustomRouter = () => {
	return (
		<div>
			<Router>
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/apitest" component={APITest} />
			</Router>
		</div>
	);
};

export default CustomRouter;
