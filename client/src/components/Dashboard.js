import React, { useState, useEffect } from 'react';
import MaxPrices from './MaxPrices';
import AddItem from './AddItem';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';

const buttonSize = '40px';

const Dashboard = () => {
	const [items, updateItems] = useState([]);
	const [loading, updateLoading] = useState(true);

	const getItems = () => {
		updateLoading(true);
		fetch('/api/items')
			.then((response) => response.json())
			.then((res) => {
				updateItems(res);
				updateLoading(true);
			})
			.catch((err) => console.log(err))
			.finally(() => updateLoading(false));
	};

	useEffect(() => {
		getItems();
	}, []);

	const nameTemplate = (rowData) => {
		const item = items.find((item) => item._id === rowData._id);
		return (
			<InputText
				value={item?.name}
				onChange={(e) => {
					item.name = e.target.value;
					item.edited = true;
					updateItems([...items]);
				}}
			/>
		);
	};
	const costTemplate = (rowData) => {
		const item = items.find((item) => item._id === rowData._id);
		return (
			<InputNumber
				id="currency-us"
				value={item?.cost}
				onChange={(e) => {
					item.cost = e.value;
					item.edited = true;
					updateItems([...items]);
				}}
				mode="currency"
				currency="USD"
				locale="en-US"
			/>
		);
	};

	const actionsTemplate = (rowData) => {
		const item = items.find((item) => item._id === rowData._id);
		item.save = () => {
			item.loading = true;
			updateItems([...items]);
			fetch(`/api/items/${item._id}`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					name: item.name,
					cost: item.cost,
				}),
			})
				.then((response) => response.json())
				.then(() => {
					item.loading = false;
					item.edited = false;
					updateItems([...items]);
				});
		};
		return (
			<span>
				{item.loading ? (
					<ProgressSpinner
						strokeWidth={'5'}
						style={{
							height: buttonSize,
							width: buttonSize,
							margin: '0 0 -5px 0',
						}}
					/>
				) : (
					<Button
						icon="pi pi-save"
						className="p-button-rounded"
						disabled={!item.edited}
						onClick={() => item.save()}
						style={{ height: buttonSize, width: buttonSize }}
					/>
				)}

				<Button
					icon="pi pi-times"
					className="p-button-rounded p-button-danger"
					onClick={() => {
						updateItems([...items]);
						fetch(`/api/items/${item._id}`, {
							method: 'DELETE',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify({
								name: item.name,
								cost: item.cost,
							}),
						})
							.then((response) => response.json())
							.then(() => {
								item.edited = false;
								updateItems([
									...items.filter((arrayItem) => arrayItem._id !== item._id),
								]);
							});
					}}
					style={{
						height: buttonSize,
						width: buttonSize,
						margin: '0 0 0 10px',
					}}
				/>
			</span>
		);
	};

	return (
		<div
			className="p-grid"
			style={{
				padding: '5vh 0vw',
				margin: '0 auto',
				maxWidth: '95vw',
				width: '1000px',
			}}
		>
			<div className="p-col-12 p-sm-3 p-md-3 p-lg-3">
				<AddItem refreshItems={getItems} />
				<MaxPrices data={items} />
			</div>
			<div className="p-col-9">
				{loading ? (
					<ProgressSpinner
						strokeWidth={'2'}
						style={{
							height: '20vw',
							width: '20vw',
							postition: 'absolute',
							left: '35vw',
							top: '20vh',
						}}
					/>
				) : (
					<DataTable value={items} rowHover>
						<Column
							header="Name"
							field="name"
							sortable
							body={nameTemplate}
							style={{ width: '30vw', maxWidth: '300px' }}
						/>
						<Column
							header="Cost"
							field="cost"
							sortable
							body={costTemplate}
							style={{ width: '300px', maxWidth: '30vw' }}
						/>
						<Column
							header=""
							body={actionsTemplate}
							style={{ width: '200px', maxWidth: '30vw' }}
						/>
					</DataTable>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
