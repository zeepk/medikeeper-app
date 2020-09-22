import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const AddItem = (props) => {
	const [name, updateName] = useState('');
	const [cost, updateCost] = useState(0);
	let toast;

	return (
		<Card
			title="Add Item"
			style={{
				width: '100%',
				maxWidth: '95vw',
				borderRadius: '10px',
				margin: '0 0 20px 0',
				backgroundColor: 'var(--card-color)',
				border: 'var(--card-border)',
			}}
		>
			<Toast style={{ maxWidth: '90vw' }} ref={(el) => (toast = el)} />
			<form
				onSubmit={(e) => {
					e.preventDefault();
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
							toast.show({
								severity: 'success',
								summary: `Successfully added a ${name} for $${cost}`,
							});
							updateName('');
							updateCost(0);
							props.refreshItems();
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
				<Button label="Add Item" type="submit" />
			</form>
		</Card>
	);
};

export default AddItem;
