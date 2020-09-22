import React from 'react';
import { Chart } from 'primereact/chart';
import { Card } from 'primereact/card';

const PriceChart = (props) => {
	const chartOptions = {
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
					},
				},
			],
		},
	};
	const chartData = {
		labels: Object.keys(props.data),
		datasets: [
			{
				// label: 'My First dataset',
				backgroundColor: '#81c784',
				data: Object.values(props.data),
			},
		],
	};
	return (
		<Card
			style={{
				borderRadius: '10px',
				width: '800px',
				maxWidth: '95vw',
				margin: '0 auto 50vh auto',
				backgroundColor: 'var(--card-color)',
				border: 'var(--card-border)',
			}}
			title="Max Prices"
		>
			<Chart
				// type="horizontalBar"
				type={props.vw <= 575 ? 'horizontalBar' : 'bar'}
				data={chartData}
				options={chartOptions}
			/>
		</Card>
	);
};

export default PriceChart;
