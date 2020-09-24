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
		content:
			'Use the Add Item panel to append a new item to the inventory list.',
	},
	{
		image: TableImage,
		altText: 'Table Edits',
		content:
			'Edit items by typing directly into the Name or Cost text box in the table.',
	},
	{
		image: ActionButtonsImage,
		altText: 'Save or Delete',
		content:
			'Save your changes or delete an item by selecting the appropriate Save or Delete button. Note that the Save button will only display once an item in the table has been edited.',
	},
	{
		image: MaxItemPriceImage,
		altText: 'Max Item Price',
		content:
			'Check the maximum price for an item by entering the item name in the Max Item Price section, and selecting the Get Max Price button.',
	},
];

const apitestItems = [
	{
		image: CrudImage,
		altText: 'CRUD Data',
		content:
			'Create, Update, or Delete data by entering the corresponding fields, and selecting the appropriate button. JSON data in the text panel will update automatically.',
	},
	{
		image: MaxItemPriceImage,
		altText: 'Max Item Price',
		content:
			'Check the maximum price for an item by entering the item name in the Max Item Price section, and selecting the Get Max Price button.',
	},
	{
		image: AllMaxPricesImage,
		altText: 'All Max Prices',
		content:
			'Selecting the All Max Prices button will display a pop up with a table of all maximum prices for each item.',
	},
	{
		image: TestTableImage,
		altText: 'Test Table',
		content:
			'The Test Results table shows test results from the most recent deployment. The date and time are shown in the title. The indicator on the right shows the status of each test result.',
	},
	{
		image: TestDurationImage,
		altText: 'Test Duration',
		content:
			'The Test Duration shows the time in seconds that it took for all tests to run during the most recent deployment.',
	},
	{
		image: TestStatusImage,
		altText: 'Test Status',
		content:
			'The Test Status is the overall status of all test results. If tests all passed, the icon will be green. If at least one test failed, the icon will be red.',
	},
];

const HelpModal = () => {
	const helpContent = window.location.href.includes('apitest')
		? apitestItems
		: dashboardItems;
	return (
		<div style={{ textAlign: 'center' }}>
			{helpContent.map(({ image, altText, content }) => (
				<div key={content} style={{ margin: '100px 0' }}>
					<img src={image} alt={altText} style={{ maxWidth: '100%' }} />
					<p>{content}</p>
				</div>
			))}
		</div>
	);
};

export default HelpModal;
