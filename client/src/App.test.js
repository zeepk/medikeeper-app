import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import Dashboard from './components/Dashboard';
import APITest from './components/APITest';
import Footer from './components/Footer';

// Navbar tests

test('Navbar renders title', () => {
	const { getByText } = render(<App />);
	const testElement = getByText(/MediApp/i);
	expect(testElement).toBeInTheDocument();
});

test('Navbar renders both links', () => {
	const { getByText } = render(<App />);
	const testElement = getByText(/Dashboard/i);
	expect(testElement).toBeInTheDocument();
});

// Dashboard tests

test('Dashboard renders Search bar', () => {
	const { getByPlaceholderText } = render(<App />);
	const testElement = getByPlaceholderText(/Search the inventory/i);
	expect(testElement).toBeInTheDocument();
});

test('Dashboard renders Add Item card', () => {
	const { getByText } = render(<App />);
	const testElement = getByText(/Add Item/i);
	expect(testElement).toBeInTheDocument();
});

test('Dashboard renders Max Item Price card', () => {
	const { getByText } = render(<App />);
	const testElement = getByText(/Max Item Price/i);
	expect(testElement).toBeInTheDocument();
});

test('Dashboard renders Max Item Prices chart', () => {
	const { getByText } = render(<App />);
	const testElement = getByText(/Max Prices/i);
	expect(testElement).toBeInTheDocument();
});

// APITest tests

test('API Test page renders Create button', () => {
	const { getByText } = render(<APITest />);
	const testElement = getByText(/Create/i);
	expect(testElement).toBeInTheDocument();
});

test('API Test page renders Update Button', () => {
	const { getByText } = render(<APITest />);
	const testElement = getByText(/Update/i);
	expect(testElement).toBeInTheDocument();
});

test('API Test page renders Delete button', () => {
	const { getByText } = render(<APITest />);
	const testElement = getByText(/Delete/i);
	expect(testElement).toBeInTheDocument();
});

// Footer tests

test('Footer renders logo', () => {
	const { getByAltText } = render(<Footer />);
	const testElement = getByAltText(/logo/i);
	expect(testElement).toBeInTheDocument();
});
