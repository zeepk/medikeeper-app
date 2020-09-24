import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

const MaxPrices = (props) => {
	const [name, updateName] = useState('');
	const [price, updatePrice] = useState(0);
	const [visible, updateVisible] = useState(false);
	let toast;

	const items = props.data;
	return (
		<Card
			style={{
				width: '100%',
				maxWidth: '95vw',
				borderRadius: '10px',
				backgroundColor: 'var(--card-color)',
				border: 'var(--card-border)',
			}}
			title="Max Item Price"
		>
			<Dialog
				header="Maximum Price"
				visible={visible}
				style={{ maxWidth: '90vw', width: '400px' }}
				onHide={() => {
					updateVisible(false);
					updateName('');
				}}
			>
				{`$${price} is the maximum price for ${name}.`}
			</Dialog>
			<Toast
				style={{ maxWidth: '90vw', width: '300px', left: 'calc(50% - 150px)' }}
				ref={(el) => (toast = el)}
			/>
			<div style={{ maxWidth: '700px', margin: 0 }}>
				<div>
					<InputText
						placeholder="Enter a name"
						value={name}
						onChange={(e) => updateName(e.target.value)}
						aria-label="name"
					/>
				</div>
				<div>
					<Button
						style={{ margin: '10px 0 0 0' }}
						label="Get Max Price"
						type="submit"
						onClick={() => {
							if (
								!items.some(
									(item) => item.name.toLowerCase() === name.toLowerCase()
								)
							) {
								toast.show({
									severity: 'error',
									summary: `Cannot find ${name}`,
									detail:
										name.length === 0
											? 'Enter a name.'
											: `No item called ${name} exists in the database. Please try again.`,
								});
							} else {
								fetch(`/api/items/maxitemprice/${name}`)
									.then((response) => response.json())
									.then((res) => {
										updatePrice(res);
										updateVisible(true);
										updateName('');
									})
									.catch((err) => console.log(err));
							}
						}}
						aria-label="get max price"
					/>
				</div>
			</div>
		</Card>
	);
};

export default MaxPrices;
