import React from 'react';
import Dashboard from './Dashboard';
import APITest from './APITest';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

const CustomRouter = () => {
	return (
		<div>
			<Router>
				<Switch>
					<Route
						exact
						path="/"
						render={() => {
							return <Redirect to="/dashboard" />;
						}}
					/>
					<Route path="/dashboard">
						<Dashboard />
					</Route>
					<Route path="/apitest">
						<APITest />
					</Route>
				</Switch>
			</Router>
		</div>
	);
};

export default CustomRouter;
