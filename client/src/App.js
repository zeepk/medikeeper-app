import React from 'react';
import Navbar from './components/Navbar';
import AppRouter from './components/AppRouter';
import Footer from './components/Footer';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
// import 'primereact/resources/themes/arya-green/theme.css';
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
			<Navbar />
			<AppRouter />
			<Footer />
		</div>
	);
}

export default App;
