const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// get all records for all items
router.get('/', async (req, res) => {
	try {
		const items = await Item.find();
		res.json(items);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// get all records for all items
router.get('/maxprices', async (req, res) => {
	try {
		const items = await Item.find();
		const prices = {};
		Array.from(new Set(items.map((item) => item.name))).map(
			(name) => (prices[name] = 0)
		);
		for (const item in items) {
			prices[items[item].name] =
				prices[items[item].name] < items[item].cost
					? items[item].cost
					: prices[items[item].name];
		}
		res.json(prices);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

// create one item
router.post('/', async (req, res) => {
	const items = await Item.find().sort({ id: -1 }).limit(1);
	const item = new Item({
		id: +items[0].id + 1,
		name: req.body.name,
		cost: req.body.cost,
		lastUpdated: Date.now(),
	});
	try {
		const newItem = await item.save();
		res.status(201).json(newItem);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});

// update one item
router.put('/:id', getItem, async (req, res) => {
	console.log(res.item);
	res.item[0].name = req.body.name || res.item[0].name;
	res.item[0].cost = req.body.cost || res.item[0].cost;
	res.item[0].lastUpdated = Date.now();
	res.item[0].edited = false;

	try {
		const updatedUser = await res.item[0].save();
		res.json(updatedUser);
	} catch (err) {
		console.log('Error saving in API endpoint');
		res.status(400).json({ message: err.message });
	}
});

// delete one item
router.delete('/:id', getItem, async (req, res) => {
	try {
		await res.item[0].remove();
		res.json({ message: 'Deleted Item' });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

async function getItem(req, res, next) {
	console.log(req.params.id);
	let item;
	try {
		item = await Item.find({ _id: req.params.id });
		if (item == null) {
			return res.status(404).json({ message: 'Cannot find item' });
		}
	} catch (err) {
		return res.status(500).json({ message: err.message });
	}

	res.item = item;
	next();
}

module.exports = router;
