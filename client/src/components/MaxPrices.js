import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';

const MaxPrices = (props) => {
	const [name, updateName] = useState('');
	const [prices, updatePrices] = useState([]);
	const [visible, updateVisible] = useState(false);
	const items = props.data;
	let toast;
	return (
		<div style={{ marginBottom: '30px' }}>
			<Toast style={{ maxWidth: '90vw' }} ref={(el) => (toast = el)} />
			<Dialog
				header="Max Prices"
				visible={visible}
				style={{ width: '50vw' }}
				onHide={() => updateVisible(false)}
			>
				<DataTable value={prices}>
					<Column field="name" header="Name" />
					<Column field="cost" header="Max Price" />
				</DataTable>
			</Dialog>
			<div className="p-grid" style={{ maxWidth: '700px' }}>
				<div className="p-col-12 p-sm-6 p-md-3">
					<InputText
						placeholder="Enter a name"
						value={name}
						onChange={(e) => updateName(e.target.value)}
					/>
				</div>
				<div className="p-col-6 p-sm-3">
					<Button
						className="p-button-rounded"
						style={{ backgroundColor: '#009a6e' }}
						label="Get Max Price"
						type="submit"
						onClick={() => {
							if (!items.some((item) => item.name === name)) {
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
				<div className="p-col-6 p-sm-3">
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
				</div>
			</div>
		</div>
	);
};

export default MaxPrices;
