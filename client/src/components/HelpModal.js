import React from 'react';
import AddItemImage from '../assets/images/addItem.png';
import TableImage from '../assets/images/table.png';
import ActionButtonsImage from '../assets/images/actionButtons.png';
import MaxItemPriceImage from '../assets/images/maxItemPrice.png';
import CrudImage from '../assets/images/crud.png';
import AllMaxPricesImage from '../assets/images/allMaxPrices.png';
import TestDurationImage from '../assets/images/testDuration.png';
import TestTableImage from '../assets/images/testTable.png';
import TestStatusImage from '../assets/images/testStatus.png';

const dashboardItems = [
	{
		image: AddItemImage,
		altText: 'Add Item',
		content: 'Append a new item using the Add Item panel.',
		details:
			'Use the Add Item panel to append a new item to the inventory list. The table and chart will be updated automatically.',
	},
	{
		image: TableImage,
		altText: 'Table Edits',
		content: 'Edit items directly from the table.',
		details:
			'Edit items by typing directly into the Name or Cost text box in the table.',
	},
	{
		image: ActionButtonsImage,
		altText: 'Save or Delete',
		content: 'Save or Delete with corresponding buttons.',
		details:
			'Save your changes or delete an item by selecting the appropriate Save or Delete button. Note that the Save button will only display once an item in the table has been edited.',
	},
	{
		image: MaxItemPriceImage,
		altText: 'Max Item Price',
		content: 'Check the Max Price for any item.',
		details:
			'Check the maximum price for an item by entering the item name in the Max Item Price section, and selecting the Get Max Price button.',
	},
];

const apitestItems = [
	{
		image: CrudImage,
		altText: 'CRUD Data',
		content: 'Edit data using the CRUD fields.',
		details:
			'Create, Update, or Delete data by entering the corresponding fields, and selecting the appropriate button. JSON data in the text panel will update automatically.',
	},
	{
		image: MaxItemPriceImage,
		altText: 'Max Item Price',
		content: 'Check the Max Price for any item.',
		details:
			'Check the maximum price for an item by entering the item name in the Max Item Price section, and selecting the Get Max Price button.',
	},
	{
		image: AllMaxPricesImage,
		altText: 'All Max Prices',
		content: 'Check the Max Price for all items.',
		details:
			'Selecting the All Max Prices button will display a pop up with a table of all maximum prices for each item.',
	},
	{
		image: TestTableImage,
		altText: 'Test Table',
		content: 'See results for recent unit tests.',
		details:
			'The Test Results table shows test results from the most recent deployment. The date and time are shown in the title. The indicator on the right shows the status of each test result.',
	},
	{
		image: TestDurationImage,
		altText: 'Test Duration',
		content: 'See how long the tests took to run.',
		details:
			'The Test Duration shows the time in seconds that it took for all tests to run during the most recent deployment.',
	},
	{
		image: TestStatusImage,
		altText: 'Test Status',
		content: 'Quickly see the overall status of unit tests.',
		details:
			'The Test Status is the overall status of all test results. If tests all passed, the icon will be green. If at least one test failed, the icon will be red.',
	},
];

const HelpModal = () => {
	const helpContent = window.location.href.includes('apitest')
		? apitestItems
		: dashboardItems;
	return (
		<div>
			{helpContent.map(({ image, altText, content, details }, index) => (
				<div key={content}>
					<hr />
					<div
						className="p-grid"
						style={{
							margin: '100px 0',
						}}
					>
						<div className="p-col-12 p-md-5">
							<p style={{ fontWeight: 'bold', fontSize: '1.4rem' }}>
								{content || ''}
							</p>
							<p>{details || ''}</p>
						</div>
						<div className="p-col-12 p-md-7" style={{ textAlign: 'right' }}>
							<img src={image} alt={altText} style={{ maxWidth: '100%' }} />
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default HelpModal;
