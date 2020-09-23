import React, { useState, useEffect } from 'react';
import MaxPrices from './MaxPrices';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { InputTextarea } from 'primereact/inputtextarea';
import { ProgressSpinner } from 'primereact/progressspinner';
const data = require('../test_output.json');

const APITest = () => {
	const [items, updateItems] = useState([]);
	const [loading, updateLoading] = useState(true);
	const [id, updateID] = useState('');
	const [name, updateName] = useState('');
	const [cost, updateCost] = useState(0);
	const [prices, updatePrices] = useState([]);

	const [visible, updateVisible] = useState(false);

	let toast;

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

	return (
		<div>
			<Dialog
				header="Max Prices"
				visible={visible}
				style={{ maxWidth: '90vw', width: '800px' }}
				onHide={() => updateVisible(false)}
			>
				<DataTable value={prices}>
					<Column field="name" header="Name" />
					<Column
						field="cost"
						header="Max Price"
						body={(rowData) => <div>{`$${rowData.cost}`}</div>}
					/>
				</DataTable>
			</Dialog>
			<p
				style={{
					margin: '2vh 5vw',
					textAlign: 'center',
					fontWeight: 'bold',
					fontSize: '1.2rem',
					color: 'white',
				}}
			>
				Feel free to use the inputs on this page to test the API functionality!
			</p>
			<Toast style={{ maxWidth: '90vw' }} ref={(el) => (toast = el)} />

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
				<div className="p-grid" style={{ margin: 0, padding: '5vh 5vw' }}>
					<div className="p-col-12 p-md-6">
						<Card
							style={{
								borderRadius: '10px',
								backgroundColor: 'var(--card-color)',
								border: 'var(--card-border)',
								margin: '0 0 5vh 0',
							}}
							title="CRUD Data"
						>
							<div className="p-grid" style={{ maxWidth: '700px', margin: 0 }}>
								<div className="p-col-12 p-sm-6">
									<InputText
										value={id}
										onChange={(e) => updateID(e.target.value)}
										placeholder="Copy/paste an _id"
										style={{ margin: '0 0 10px 0' }}
									/>
									<InputText
										value={name}
										onChange={(e) => updateName(e.target.value)}
										placeholder="Enter a name"
										style={{ margin: '0 0 10px 0' }}
									/>
									<InputNumber
										value={cost}
										onChange={(e) => updateCost(e.value)}
										mode="currency"
										currency="USD"
										locale="en-US"
									/>
								</div>
								<div className="p-col-6 p-sm-3">
									<Button
										className="p-button-rounded p-button-success"
										label="Create"
										type="submit"
										style={{ margin: '0 0 10px 0' }}
										onClick={() => {
											if (!name) {
												toast.show({
													severity: 'error',
													summary: 'Please enter a Name',
												});
											} else {
												fetch('/api/items', {
													method: 'POST',
													headers: {
														'Content-Type': 'application/json',
													},
													body: JSON.stringify({
														name,
														cost,
													}),
												})
													.then((response) => {
														response.json();
													})
													.catch((err) => console.log(err))
													.finally(() => {
														getItems();
													});
											}
										}}
									/>

									<Button
										className="p-button-rounded"
										label="Update"
										type="submit"
										style={{ margin: '0 0 10px 0' }}
										onClick={() => {
											if (!id) {
												toast.show({
													severity: 'error',
													summary: 'Please enter an ID',
												});
											} else {
												if (name.length === 0) {
													toast.show({
														severity: 'warn',
														summary:
															'Name cannot be blank, the field will not be updated.',
													});
												}
												fetch(`/api/items/${id}`, {
													method: 'PUT',
													headers: {
														'Content-Type': 'application/json',
													},
													body: JSON.stringify({
														name: name,
														cost: cost,
													}),
												})
													.then((response) => response.json())
													.then(() => {
														getItems();
													});
											}
										}}
									/>
									<Button
										className="p-button-rounded p-button-danger"
										label="Delete"
										type="submit"
										onClick={() => {
											if (!items.find((arrayItem) => arrayItem._id === id)) {
												toast.show({
													severity: 'error',
													summary: 'No item was found with that ID.',
												});
											} else {
												fetch(`/api/items/${id}`, {
													method: 'DELETE',
													headers: {
														'Content-Type': 'application/json',
													},
												})
													.then((response) => response.json())
													.then(() => {
														updateItems([
															...items.filter(
																(arrayItem) => arrayItem._id !== id
															),
														]);
													});
											}
										}}
									/>
								</div>
							</div>
						</Card>

						<MaxPrices data={items} />
						<Card
							style={{
								borderRadius: '10px',
								backgroundColor: 'var(--card-color)',
								border: 'var(--card-border)',
								margin: '5vh 0 5vh 0',
							}}
							title="Show Max Prices"
						>
							<Button
								label="All Max Prices"
								type="submit"
								onClick={() => {
									fetch('/api/items/maxprices')
										.then((response) => response.json())
										.then((res) => {
											updatePrices(
												Object.keys(res).map((key) => {
													return { name: key, cost: res[key] };
												})
											);
											updateVisible(true);
										})
										.catch((err) => console.log(err));
								}}
							/>
						</Card>
					</div>
					<div
						className="p-col-12 p-md-6"
						style={{
							maxHeight: '80vh',
							overflow: 'auto',
						}}
					>
						<InputTextarea
							rows={2 + items.length * 10}
							cols={20}
							value={JSON.stringify(items, undefined, 4)}
							autoResize
						/>
					</div>
				</div>
			)}
			<div style={{ margin: '0 0 80vh 0' }}>
				<Card
					style={{
						borderRadius: '10px',
						backgroundColor: 'var(--card-color)',
						border: 'var(--card-border)',
						margin: '0 auto',
						width: '90vw',
						maxWidth: '600px',
					}}
					title="React Unit Test Results"
				>
					<DataTable
						className="p-datatable-striped"
						value={data.testResults[0].assertionResults}
						paginator
						paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
						currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
						rows={10}
						rowsPerPageOptions={[10, 20, 50]}
					>
						<Column field="title" header="Test" />
						<Column
							style={{ textAlign: 'right' }}
							field="passed"
							header="Result"
							body={(rowData) => {
								if (rowData.status === 'passed') {
									return (
										<span className="p-badge p-badge-lg p-badge-success">
											<i
												className="pi pi-check"
												style={{ fontSize: '1rem' }}
											></i>
										</span>
									);
								} else if (rowData.status === 'failed') {
									return (
										<span className="p-badge p-badge-lg p-badge-danger">
											<i
												className="pi pi-times"
												style={{ fontSize: '1rem' }}
											></i>
										</span>
									);
								} else {
									return (
										<span className="p-badge p-badge-lg p-badge-warning">
											<i
												className="pi pi-question-circle"
												style={{ fontSize: '1rem' }}
											></i>
										</span>
									);
								}
							}}
						/>
					</DataTable>
				</Card>
			</div>
		</div>
	);
};

export default APITest;
