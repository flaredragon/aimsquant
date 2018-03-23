const mongoose = require('mongoose');
const Schema   = mongoose.Schema,
      model    = mongoose.model.bind(mongoose),
      ObjectId = mongoose.Schema.Types.ObjectId;

const stockSchema = Schema({
  id: ObjectId,
  ticker: String,
  priceHistory: {Dates:[String],Open:[Number],High:[Number],Low:[Number],Last:[Number],Close:[Number],TTQ:[Number],Turnover:[Number]},
  createdDate: Date,
  updatedDate: Date
});

const Stock = model('Stock', stockSchema)

module.exports = {Stock};

