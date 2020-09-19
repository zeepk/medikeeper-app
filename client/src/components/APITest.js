import React from 'react';
import { InputText } from 'primereact/inputtext';

const APITest = () => {
	return (
		<div>
			<div className="p-field p-grid" style={{ margin: 0 }}>
				<label
					htmlFor="firstname3"
					className="p-col-fixed"
					style={{ width: '100px' }}
				>
					Firstname
				</label>
				<div className="p-col">
					<InputText style={{ width: '100px' }} id="firstname3" type="text" />
				</div>
			</div>
			<div className="p-field p-grid" style={{ margin: 0 }}>
				<label
					htmlFor="lastname3"
					className="p-col-fixed"
					style={{ width: '100px' }}
				>
					Lastname
				</label>
				<div className="p-col">
					<InputText style={{ width: '100px' }} id="lastname3" type="text" />
				</div>
			</div>
		</div>
	);
};

export default APITest;
