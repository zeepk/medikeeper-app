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

const test_data = require('../test_output.json');
const testDate = new Date(test_data.startTime);
const testResultIcon = (result, size) => {
	if (result === 'passed') {
		return (
			<span
				className="p-badge p-badge-lg p-badge-success"
				style={{ fontSize: size, height: '100%' }}
			>
				<i className="pi pi-check" style={{ fontSize: size }}></i>
			</span>
		);
	} else if (result === 'failed') {
		return (
			<span
				className="p-badge p-badge-lg p-badge-danger"
				style={{ fontSize: size, height: '100%' }}
			>
				<i className="pi pi-times" style={{ fontSize: size }}></i>
			</span>
		);
	} else {
		return (
			<span
				className="p-badge p-badge-lg p-badge-warning"
				style={{ fontSize: size, height: '100%' }}
			>
				<i className="pi pi-question-circle" style={{ fontSize: size }}></i>
			</span>
		);
	}
};
const APITest = () => {
	const [items, updateItems] = useState([]);
	const [loading, updateLoading] = useState(true);
	const [id, updateID] = useState('');
	const [name, updateName] = useState('');
	const [cost, updateCost] = useState(0);
	const [prices, updatePrices] = useState([]);
	const [visible, updateVisible] = useState(false);
	const [isMobile, updateIsMobile] = useState(
		Math.max(
			document.documentElement.clientWidth || 0,
			window.innerWidth || 0
		) <= 767
	);
	window.addEventListener('resize', () => {
		const mobileSize =
			Math.max(
				document.documentElement.clientWidth || 0,
				window.innerWidth || 0
			) <= 767;
		mobileSize !== isMobile && updateIsMobile(!isMobile);
	});
	const apiDataRows = 2 + items.length * 10 + (isMobile ? 25 : 0);
	const clearFields = () => {
		updateName('');
		updateID('');
		updateCost(0);
	};

	let toast = (
		<Toast
			style={{ maxWidth: '90vw', width: '300px', left: 'calc(50% - 150px)' }}
			ref={(el) => (toast = el)}
		/>
	);

	const getItems = () => {
		updateLoading(true);
		fetch('/api/items')
			.then((response) => response.json())
			.then((res) => {
				updateItems(res.sort((a, b) => a.lastUpdated < b.lastUpdated));
			})
			.catch((err) => console.log(err))
			.finally(() => updateLoading(false));
	};

	useEffect(() => {
		getItems();
	}, []);

	const createItem = () => {
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
					clearFields();
				});
		}
	};

	const updateItem = () => {
		if (!id) {
			toast.show({
				severity: 'error',
				summary: 'Please enter an ID',
			});
		} else {
			if (name.length === 0) {
				toast.show({
					severity: 'warn',
					summary: 'Name cannot be blank, the field will not be updated.',
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
					clearFields();
				});
		}
	};

	const deleteItem = () => {
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
					updateItems([...items.filter((arrayItem) => arrayItem._id !== id)]);
					clearFields();
				});
		}
	};

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
			{toast}
			{loading ? (
				<ProgressSpinner
					strokeWidth={'2'}
					style={{
						height: '20vw',
						width: '20vw',
						postition: 'absolute',
						left: '35vw',
						top: '20vh',
						margin: '0 0 80vh 0',
					}}
				/>
			) : (
				<div>
					<p
						style={{
							margin: '1vh 10vw',
							textAlign: 'left',
							fontWeight: 'bold',
							fontSize: '3rem',
							color: 'white',
						}}
					>
						API
					</p>
					<div
						className="p-grid"
						style={{
							margin: '0 auto',
							padding: '0 5vw',
							maxWidth: '1200px',
						}}
					>
						<div className="p-col-12 p-md-4">
							<Card
								style={{
									borderRadius: '10px',
									backgroundColor: 'var(--card-color)',
									border: 'var(--card-border)',
									margin: '0 0 2vh 0',
								}}
								title="CRUD Data"
							>
								<div
									className="p-grid"
									style={{ maxWidth: '700px', margin: 0 }}
								>
									<div className="p-col-12 p-lg-8">
										<InputText
											value={id}
											onChange={(e) => updateID(e.target.value)}
											placeholder="Copy/paste an _id"
											style={{ margin: '0 0 10px 0' }}
											aria-label="id"
										/>
										<InputText
											value={name}
											onChange={(e) => updateName(e.target.value)}
											placeholder="Enter a name"
											style={{ margin: '0 0 10px 0' }}
											aria-label="name"
										/>
										<InputNumber
											value={cost}
											onChange={(e) => updateCost(e.value)}
											mode="currency"
											currency="USD"
											locale="en-US"
											aria-label="cost"
										/>
									</div>
									<div className="p-col-6 p-lg-4">
										<Button
											className="p-button-success"
											label="Create"
											type="submit"
											style={{ margin: '0 10px 10px 0', width: '100%' }}
											onClick={() => createItem()}
											aria-label="create"
										/>

										<Button
											label="Update"
											type="submit"
											style={{ margin: '0 10px 10px 0', width: '100%' }}
											onClick={() => updateItem()}
											aria-label="update"
										/>
										<Button
											className="p-button-danger"
											label="Delete"
											type="submit"
											style={{ width: '100%' }}
											onClick={() => deleteItem()}
											aria-label="delete"
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
									margin: '2vh 0',
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
									aria-label="all max prices"
								/>
							</Card>
						</div>
						<div
							className="p-col-12 p-md-8"
							style={{
								maxHeight: '65vh',
								overflow: 'auto',
								margin: '0 0 5vh 0',
							}}
						>
							<InputTextarea
								rows={apiDataRows}
								cols={100}
								value={JSON.stringify(items, undefined, 4)}
								autoResize
								readOnly
								data-testid="JSON records"
								aria-label="records"
							/>
						</div>
					</div>
					<div
						style={{
							backgroundColor: '#9DC7C8',
							padding: `0 0 ${isMobile ? 90 : 40}vh 0`,
						}}
					>
						<p
							style={{
								margin: '1vh 10vw',
								textAlign: 'left',
								fontWeight: 'bold',
								fontSize: '3rem',
								color: 'black',
								// padding: '5vh 0',
							}}
						>
							Tests
						</p>
						<div style={{ margin: '0 auto', maxWidth: '1200px' }}>
							<div
								className="p-grid p-dir-rev"
								style={{ margin: 0, padding: '5vh 5vw' }}
							>
								<div className="p-col-12 p-md-3">
									<Card
										title="Duration"
										style={{
											textAlign: 'center',
											borderRadius: '10px',
											backgroundColor: 'var(--card-color)',
											border: 'var(--card-border)',
											margin: '0 0 2vh 0',
										}}
									>
										<p style={{ fontSize: '5rem', margin: 0 }}>{`${
											Math.round(
												((test_data.testResults[0].endTime -
													test_data.testResults[0].startTime) /
													1000) *
													10
											) / 10
										}s`}</p>
									</Card>
									<Card
										title="Status"
										style={{
											textAlign: 'center',
											borderRadius: '10px',
											backgroundColor: 'var(--card-color)',
											border: 'var(--card-border)',
											margin: '0 0 5vh 0',
										}}
									>
										{testResultIcon(test_data.testResults[0].status, '6rem')}
									</Card>
								</div>
								<div className="p-col-12 p-md-9">
									<Card
										style={{
											borderRadius: '10px',
											backgroundColor: 'var(--card-color)',
											border: 'var(--card-border)',
											margin: '0 auto',
											width: '90vw',
											maxWidth: '100%',
										}}
										title={`Test Results for ${testDate.toLocaleString()}`}
									>
										<DataTable
											className="p-datatable-striped"
											value={test_data.testResults[0].assertionResults}
											paginator
											paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
											currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
											rows={5}
											rowsPerPageOptions={[5, 10, 20, 50]}
										>
											<Column field="title" header="Test" />
											<Column
												style={{ textAlign: 'right' }}
												field="passed"
												header="Result"
												body={(rowData) =>
													testResultIcon(rowData.status, '1rem')
												}
											/>
										</DataTable>
									</Card>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default APITest;
