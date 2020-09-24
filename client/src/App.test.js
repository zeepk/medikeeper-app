import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import APITest from './components/APITest';
import Footer from './components/Footer';

// Navbar tests

test('Navbar renders title', () => {
	const { getByText } = render(<App />);
	const testElement = getByText(/MediApp/i);
	expect(testElement).toBeInTheDocument();
});

test('Navbar renders API page link', () => {
	const { getByText } = render(<App />);
	const testElement = getByText(/API Test/i);
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
	setTimeout(function () {
		const testElement = getByText(/Add Item/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('Dashboard renders Max Item Price card', () => {
	const { getByText } = render(<App />);
	setTimeout(function () {
		const testElement = getByText(/Max Item Price/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('Dashboard renders Max Item Prices chart', async () => {
	const { getByText } = render(<App />);
	setTimeout(function () {
		const testElement = getByText(/Max Prices/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

// APITest tests

test('API Test page renders Create button', () => {
	const { getByText } = render(<APITest />);
	setTimeout(function () {
		const testElement = getByText(/Create/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('API Test page renders Update Button', () => {
	const { getByText } = render(<APITest />);
	setTimeout(function () {
		const testElement = getByText(/Update/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('API Test page renders Delete button', () => {
	const { getByText } = render(<APITest />);
	setTimeout(function () {
		const testElement = getByText(/Delete/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('API Test page renders Max Item Price card', () => {
	const { getByText } = render(<APITest />);
	setTimeout(function () {
		const testElement = getByText(/Max Item Price/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('API Test page renders Show Max Prices card', () => {
	const { getByText } = render(<APITest />);
	setTimeout(function () {
		const testElement = getByText(/Show Max Prices/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('API Test page renders test results table', () => {
	const { getByText } = render(<APITest />);
	setTimeout(function () {
		const testElement = getByText(/Test Results/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('API Test page renders test duration', () => {
	const { getByText } = render(<APITest />);
	setTimeout(function () {
		const testElement = getByText(/Duration/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

test('API Test page renders overall test status', () => {
	const { getByText } = render(<APITest />);
	setTimeout(function () {
		const testElement = getByText(/Status/i);
		expect(testElement).toBeInTheDocument();
	}, 10000);
});

// Footer tests

test('Footer renders logo', () => {
	const { getByAltText } = render(<Footer />);
	const testElement = getByAltText(/logo/i);
	expect(testElement).toBeInTheDocument();
});
