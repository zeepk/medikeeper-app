import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import HelpModal from './HelpModal';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dialog } from 'primereact/dialog';

const isMobile =
	Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0) <=
	575;

const AppNavbar = () => {
	const [visible, updateVisible] = useState(false);

	return (
		<div>
			<Dialog
				header="Help"
				visible={visible}
				style={{ maxWidth: '90vw', width: '400px' }}
				onHide={() => updateVisible(false)}
			>
				<HelpModal />
			</Dialog>
			<Navbar bg="dark" variant="dark" expand="sm">
				<Link to="/" style={{ margin: '0 7rem 0 0' }} rel="preload">
					<img alt="logo" src={Logo} height="40" className="p-mr-2"></img>
					<span
						style={{
							position: 'absolute',
							top: 9,
							fontSize: '1.5rem',
							color: 'white',
						}}
					>
						MediApp
					</span>
				</Link>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse
					id="basic-navbar-nav"
					style={{ margin: `${isMobile ? 2 : 0}vh 0` }}
				>
					<Nav className="mr-auto ml-3 mb-0">
						<Link to="/apitest" rel="preload">
							<span
								style={{
									fontSize: '1.2rem',
									color: 'white',
									margin: '50px 0',
								}}
							>
								<i className="pi pi-cloud p-mr-2"></i>
								API Test
							</span>
						</Link>
					</Nav>
					<Nav className={`ml-${isMobile ? '3 mt-2' : 'auto'} mr-3`}>
						<Link onClick={() => updateVisible(true)}>
							<span
								style={{
									fontSize: '1.2rem',
									color: 'white',
									margin: '50px 0',
								}}
							>
								<i className="pi pi-question-circle p-mr-2"></i>
								Help
							</span>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default AppNavbar;
