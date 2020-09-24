import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/images/logo.png';
import AddItemImage from '../assets/images/addItem.png';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'primereact/button';
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
				<div style={{ textAlign: 'center' }}>
					<img src={AddItemImage} alt="Add Item" />
					<p>
						Use the Add Item panel to append a new item to the inventory list.
					</p>
				</div>
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
					<Nav className="mr-auto ml-3">
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
					<Nav className="ml-auto mr-3">
						<Button
							style={{
								fontSize: '1rem',
								color: 'white',
								margin: `${isMobile ? 2 : 0}vh 0 ${isMobile ? 2 : 0}vh 3vw`,
								width: '100px',
							}}
							label="Help"
							className="p-button-outlined p-button-secondary"
							onClick={() => updateVisible(true)}
						/>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		</div>
	);
};

export default AppNavbar;
