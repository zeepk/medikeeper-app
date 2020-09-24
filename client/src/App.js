import React from 'react';
import AppRouter from './components/AppRouter';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import './app.css';
function App() {
	return (
		<div
			className="App"
			style={{
				position: 'relative',
				minHeight: '100vh',
				backgroundColor: 'var(--bg-color)',
				paddingBottom: '10vh',
			}}
		>
			<AppRouter />
		</div>
	);
}

export default App;
