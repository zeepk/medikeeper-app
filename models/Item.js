const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
	id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	cost: {
		type: Number,
		required: false,
		default: 0.0,
	},
	lastUpdated: {
		type: Date,
		required: true,
		default: Date.now,
	},
	createdDate: {
		type: Date,
		required: true,
		default: Date.now,
	},
	edited: {
		type: Boolean,
		required: true,
		default: false,
	},
});

module.exports = mongoose.model('Item', itemSchema);
