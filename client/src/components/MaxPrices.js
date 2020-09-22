import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Toast } from 'primereact/toast';

const MaxPrices = (props) => {
	const [name, updateName] = useState('');
	// const [prices, updatePrices] = useState([]);
	const [visible, updateVisible] = useState(false);
	const items = props.data;
	let toast;
	return (
		<Card style={{ width: '100%', maxWidth: '95vw', borderRadius: '10px' }}>
			<Toast style={{ maxWidth: '90vw' }} ref={(el) => (toast = el)} />
			{/* <Dialog
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
			</Dialog> */}
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
				{/* <div className="p-col-6 p-sm-3">
					<Button
						className="p-button-rounded"
						style={{ backgroundColor: '#009a6e' }}
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
				</div> */}
			</div>
		</Card>
	);
};

export default MaxPrices;
