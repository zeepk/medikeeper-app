import React, { useState, useEffect } from 'react';
import MaxPrices from './MaxPrices';
import { ProgressSpinner } from 'primereact/progressspinner';
import { InputTextarea } from 'primereact/inputtextarea';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { Toast } from 'primereact/toast';

const APITest = () => {
	const [items, updateItems] = useState([]);
	const [loading, updateLoading] = useState(true);
	const [id, updateID] = useState('');
	const [name, updateName] = useState('');
	const [cost, updateCost] = useState(0);
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
			<p style={{ margin: '2vh 5vw' }}>
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
						<MaxPrices data={items} />
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
									className="p-button-rounded p-button-danger"
									label="Delete"
									type="submit"
									onClick={() => {
										fetch(`/api/items/${id}`, {
											method: 'DELETE',
											headers: {
												'Content-Type': 'application/json',
											},
										})
											.then((response) => response.json())
											.then(() => {
												updateItems([
													...items.filter((arrayItem) => arrayItem._id !== id),
												]);
											});
									}}
									style={{ margin: '0 0 10px 0' }}
								/>
								<Button
									className="p-button-rounded"
									style={{ backgroundColor: '#009a6e' }}
									label="Update"
									type="submit"
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
							</div>
						</div>
					</div>
					<div className="p-col-12 p-md-6">
						<InputTextarea
							rows={2 + items.length * 10}
							cols={20}
							value={JSON.stringify(items, undefined, 4)}
							autoResize
						/>
					</div>
				</div>
			)}
		</div>
	);
};

export default APITest;
