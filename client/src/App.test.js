import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('Makes sure Navbar shows title', () => {
	const { getByText } = render(<App />);
	const linkElement = getByText(/MediApp/i);
	expect(linkElement).toBeInTheDocument();
});
