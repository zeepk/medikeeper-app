import React, { useState } from 'react';
import Logo from '../assets/images/logo.png';
import HelpModal from './HelpModal';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Dialog } from 'primereact/dialog';

const AppNavbar = () => {
	const [visible, updateVisible] = useState(false);
	const [isMobile, updateIsMobile] = useState(
		Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		) <= 575
	);
	window.addEventListener('resize', () => {
		const mobileSize =
			Math.max(
				document.documentElement.clientWidth || 0,
				window.innerWidth || 0
			) <= 575;
		mobileSize !== isMobile && updateIsMobile(!isMobile);
	});

	return (
		<div>
			<Dialog
				header="Help"
				visible={visible}
				style={{ maxWidth: '90vw', width: '700px' }}
				onHide={() => updateVisible(false)}
			>
				<HelpModal />
			</Dialog>
			<Navbar bg="dark" variant="dark" expand="sm" style={{ padding: 0 }}>
				<Link
					to="/"
					style={{ margin: '0 7rem 0 0', padding: '10px' }}
					rel="preload"
				>
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
				<Navbar.Toggle
					aria-controls="basic-navbar-nav"
					style={{ margin: '10px' }}
				/>
				<Navbar.Collapse
					id="basic-navbar-nav"
					style={
						isMobile
							? { padding: '2vh 0', width: '100vw', backgroundColor: '#4b5259' }
							: { margin: 0 }
					}
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
