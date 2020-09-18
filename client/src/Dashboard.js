import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';

const Dashboard = () => {
	const [items, updateItems] = useState([]);
	const [name, updateName] = useState('');
	const [cost, updateCost] = useState(0);
	const [loading, updateLoading] = useState(true);

	const getItems = () => {
		updateLoading(true);
		fetch('/api/items')
			.then((response) => response.json())
			.then((res) => {
				console.table(res);
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
		return (
			<span>
				{item.loading ? (
					<ProgressSpinner
						strokeWidth={'5'}
						style={{ height: '30px', margin: '0 -30px 0 0' }}
					/>
				) : (
					<Button
						icon="pi pi-check"
						className="p-button-rounded"
						disabled={!item.edited}
						onClick={() => {
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
								.then((res) => {
									item.loading = false;
									item.edited = false;
									updateItems([...items]);
								});
						}}
					/>
				)}

				<Button
					style={{ margin: '0 0 0 10px' }}
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
							.then((res) => {
								item.edited = false;
								updateItems([...items]);
								getItems();
							});
					}}
				/>
			</span>
		);
	};

	return (
		<div style={{ padding: '5vh 5vw' }}>
			<form
				className="p-formgroup-inline"
				onSubmit={(e) => {
					e.preventDefault();
					fetch('/api/items', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({
							id: 8,
							name,
							cost,
						}),
					})
						.then((response) => {
							response.json();
						})
						.catch((err) => console.log(err))
						.finally(() => {
							console.log('done');
							getItems();
						});
				}}
			>
				<div className="p-field">
					<InputText
						value={name}
						onChange={(e) => updateName(e.target.value)}
						placeholder="Enter a name"
					/>
				</div>
				<div className="p-field">
					<InputNumber
						value={cost}
						onChange={(e) => updateCost(e.value)}
						mode="currency"
						currency="USD"
						locale="en-US"
					/>
				</div>
				<Button type="button" label="Add Item" type="submit" />
			</form>
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
						sortable
						filter
						filterPlaceholder="Search by name"
						body={nameTemplate}
						style={{ width: '30vw' }}
					/>
					<Column
						header="Cost"
						sortable
						body={costTemplate}
						style={{ width: '300px', maxWidth: '30vw' }}
					/>
					<Column
						header=""
						body={actionsTemplate}
						style={{ textAlign: 'right' }}
					/>
				</DataTable>
			)}
		</div>
	);
};

export default Dashboard;
