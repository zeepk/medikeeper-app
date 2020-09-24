import React from 'react';
import AppNavbar from './AppNavbar';
import Dashboard from './Dashboard';
import APITest from './APITest';
import Footer from './Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const CustomRouter = () => {
	return (
		<div>
			<Router>
				<AppNavbar />
				<Route exact path="/" component={Dashboard} />
				<Route exact path="/apitest" component={APITest} />
				<Footer />
			</Router>
		</div>
	);
};

export default CustomRouter;
