import React from 'react';
import AppRouter from './components/AppRouter';
import Navbar from './components/Navbar';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './app.css';
function App() {
	return (
		<div
			className="App"
			style={{ minHeight: '100vh', backgroundColor: 'var(--bg-color)' }}
		>
			<Navbar />
			<AppRouter />
		</div>
	);
}

export default App;
