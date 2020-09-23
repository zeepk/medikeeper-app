import React, { useState, useEffect } from 'react';
import MaxPrices from './MaxPrices';
import AddItem from './AddItem';
import PriceChart from './PriceChart';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';

const buttonSize = '40px';
const viewWidth = Math.max(
	document.documentElement.clientWidth || 0,
	window.innerWidth || 0
);
const Dashboard = () => {
	const [searchString, updateSearchString] = useState('');
	const [items, updateItems] = useState([]);
	const [maxPrices, updateMaxPrices] = useState([]);
	const [loading, updateLoading] = useState(true);

	const getItems = () => {
		updateLoading(true);
		fetch('/api/items')
			.then((response) => response.json())
			.then((res) => {
				updateItems(res.sort((a, b) => a.lastUpdated < b.lastUpdated));
			})
			.catch((err) => console.log(err))
			.finally(() => updateLoading(false));
		fetch('/api/items/maxprices')
			.then((response) => response.json())
			.then((res) => {
				updateMaxPrices(res);
			})
			.catch((err) => console.log(err));
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
			<span style={{ float: 'right' }}>
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
						// disabled={!item.edited}
						onClick={() => item.save()}
						style={{
							height: buttonSize,
							width: buttonSize,
							visibility: `${item.edited ? 'visible' : 'hidden'}`,
						}}
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
		<div>
			<div style={{ width: '700px', maxWidth: '90vw', margin: '2vh auto' }}>
				<span className="p-input-icon-left" style={{ width: '100%' }}>
					<i className="pi pi-search" />
					<InputText
						placeholder="Search the inventory"
						value={searchString}
						onChange={(e) => updateSearchString(e.target.value)}
					/>
				</span>
			</div>
			<div
				className="p-grid p-dir-rev"
				style={{
					padding: '0 0 5vh 0',
					margin: '0 auto',
					maxWidth: '95vw',
					width: '1500px',
				}}
			>
				<div className="p-col-12 p-sm-2 p-md-2 p-lg-2"></div>
				<div className="p-col-12 p-sm-8 p-md-8 p-lg-8">
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
						<Card
							style={{
								backgroundColor: 'var(--card-color)',
								border: 'var(--card-border)',
							}}
						>
							<DataTable
								value={items.filter((item) =>
									item.name.toLowerCase().includes(searchString.toLowerCase())
								)}
								className="p-datatable-striped"
								rowHover
								paginator
								paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
								currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
								rows={10}
								rowsPerPageOptions={[10, 20, 50]}
							>
								<Column
									header="Name"
									field="name"
									sortable
									body={nameTemplate}
									style={{ width: '45%', maxWidth: '300px' }}
								/>
								<Column
									header="Cost"
									field="cost"
									sortable
									body={costTemplate}
									style={{ width: '45%', maxWidth: '300px' }}
								/>
								<Column
									header=""
									body={actionsTemplate}
									style={{ width: '30vw', maxWidth: '200px' }}
								/>
							</DataTable>
						</Card>
					)}
				</div>
				<div className="p-col-12 p-sm-2 p-md-2 p-lg-2">
					<AddItem refreshItems={getItems} />
					<MaxPrices data={items} />
				</div>
			</div>
			<PriceChart vw={viewWidth} data={maxPrices} />
		</div>
	);
};

export default Dashboard;
