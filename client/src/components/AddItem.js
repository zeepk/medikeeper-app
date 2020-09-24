import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

const AddItem = (props) => {
	const [name, updateName] = useState('');
	const [cost, updateCost] = useState(0);
	const [visible, updateVisible] = useState(false);
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
			<Dialog
				header="Item Added"
				visible={visible}
				style={{ maxWidth: '90vw', width: '400px' }}
				onHide={() => updateVisible(false)}
			>
				{`Successfully added ${name} for $${cost}`}
			</Dialog>
			<Toast
				style={{ maxWidth: '90vw', width: '300px', left: 'calc(50% - 150px)' }}
				ref={(el) => (toast = el)}
			/>
			<form
				onSubmit={(e) => {
					e.preventDefault();
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
								toast.show({
									severity: 'success',
									summary: `Successfully added a ${name} for $${cost}`,
								});
								// updateVisible(true);
								updateName('');
								updateCost(0);
								props.refreshItems();
							});
					}
				}}
			>
				<div className="p-field">
					<InputText
						value={name}
						onChange={(e) => updateName(e.target.value)}
						placeholder="Enter a name"
						aria-label="name"
					/>
				</div>
				<div className="p-field">
					<InputNumber
						value={cost}
						onChange={(e) => updateCost(e.value)}
						mode="currency"
						currency="USD"
						locale="en-US"
						aria-label="cost"
					/>
				</div>
				<Button label="Confirm" type="submit" aria-label="confirm" />
			</form>
		</Card>
	);
};

export default AddItem;
