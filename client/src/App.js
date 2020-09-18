import React from 'react';
import Dashboard from './Dashboard';
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
			<Dashboard />
		</div>
	);
}

export default App;
