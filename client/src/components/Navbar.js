import React from 'react';
import { Menubar } from 'primereact/menubar';
import Logo from '../assets/images/logo.png';

const items = [
	{
		label: 'Dashboard',
		icon: 'pi pi-fw pi-file',
		command: () => {
			window.location = '/';
		},
	},
	{
		label: 'API Test',
		icon: 'pi pi-fw pi-file',
		command: () => {
			window.location = '/apitest';
		},
	},
];

const Navbar = () => {
	const start = (
		<img alt="logo" src={Logo} height="40" className="p-mr-2"></img>
	);
	return (
		<div>
			<Menubar model={items} start={start} />
		</div>
	);
};

export default Navbar;
