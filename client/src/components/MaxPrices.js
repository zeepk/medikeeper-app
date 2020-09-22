import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Dialog } from 'primereact/dialog';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';

const MaxPrices = (props) => {
	const [name, updateName] = useState('');
	const items = props.data;
	let toast;
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
			<Toast style={{ maxWidth: '90vw' }} ref={(el) => (toast = el)} />

			<div style={{ maxWidth: '700px', margin: 0 }}>
				<div>
					<InputText
						placeholder="Enter a name"
						value={name}
						onChange={(e) => updateName(e.target.value)}
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
									.then((res) =>
										toast.show({
											severity: 'info',
											summary: 'Max Price',
											detail: `$${res} is the maximum price for ${name}`,
										})
									)
									.catch((err) => console.log(err));
							}
						}}
					/>
				</div>
			</div>
		</Card>
	);
};

export default MaxPrices;
