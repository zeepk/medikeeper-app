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
						fontColor: 'white',
					},
				},
			],
			yAxes: [
				{
					gridLines: {
						color: 'transparent',
					},
					ticks: {
						fontColor: 'white',
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
				margin: '0 auto 10vh auto',
			}}
			title="Max Prices"
		>
			<Chart
				// type="horizontalBar"
				type={props.vw <= 575 ? 'horizontalBar' : 'bar'}
				data={chartData}
				options={chartOptions}
				style={{ color: 'white' }}
			/>
		</Card>
	);
};

export default PriceChart;
