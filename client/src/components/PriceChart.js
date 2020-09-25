import React from 'react';
import { Card } from 'primereact/card';
import { Chart } from 'primereact/chart';

const PriceChart = (props) => {
	const chartOptions = {
		tooltips: {
			callbacks: {
				label: function (item) {
					return '$' + item.value.toString();
				},
			},
		},
		maintainAspectRatio: false,
		legend: {
			display: false,
		},
		scales: {
			xAxes: [
				{
					gridLines: {
						color: 'transparent',
					},
					ticks: {
						fontColor: 'var(--font-color)',
						suggestedMin: 0,
						beginAtZero: true,
						callback: function (value) {
							return '$' + value;
						},
					},
				},
			],
			yAxes: [
				{
					gridLines: {
						color: 'transparent',
					},
					ticks: {
						fontColor: 'var(--font-color)',
						suggestedMin: 0,
						beginAtZero: true,
					},
				},
			],
		},
	};
	const chartData = {
		labels: Object.keys(props.data),
		datasets: [
			{
				backgroundColor: '#81c784',
				data: Object.values(props.data),
			},
		],
	};
	return (
		<Card
			style={{
				borderRadius: '10px',
				width: '100%',
				maxWidth: '90vw',
				margin: '0 auto',
				backgroundColor: 'var(--card-color)',
				border: 'var(--card-border)',
			}}
			title="Max Prices"
		>
			<Chart
				type="horizontalBar"
				data={chartData}
				options={chartOptions}
				style={{ height: '500px' }}
			/>
		</Card>
	);
};

export default PriceChart;
