import React from 'react';
import { Menubar } from 'primereact/menubar';
import Logo from '../assets/images/logo.png';

const items = [
	{
		label: 'Dashboard',
		icon: 'pi pi-fw pi-shopping-cart',
		command: () => {
			window.location = '/';
		},
	},
	{
		label: 'API Test',
		icon: 'pi pi-fw pi-cloud',
		command: () => {
			window.location = '/apitest';
		},
	},
];

const Navbar = () => {
	const start = (
		<a href="/" style={{ margin: '0 7rem 0 0' }}>
			<img alt="logo" src={Logo} height="40" className="p-mr-2"></img>
			<span
				style={{
					position: 'absolute',
					top: 12,
					fontSize: '1.5rem',
					color: 'black',
				}}
			>
				MediApp
			</span>
		</a>
	);
	return (
		<div>
			<Menubar model={items} start={start} />
		</div>
	);
};

export default Navbar;
