import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const AddItem = (props) => {
	const [name, updateName] = useState('');
	const [cost, updateCost] = useState(0);
	return (
		<Card
			title="Add Item"
			style={{
				width: '100%',
				maxWidth: '95vw',
				borderRadius: '10px',
				margin: '0 0 20px 0',
			}}
		>
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
