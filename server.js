var express = require('express'),
    bodyParser = require('body-parser'),
    ws = require('./ws'),
    WebSocket = require('ws'),
    Joi = require('joi'),
    expressJoi = require('express-joi-validator'),
    axios = require('axios'),
    mongoose = require('mongoose'),
    Model = require('./models'),
    {Stock} = Model,
    app = express();


app.use(bodyParser.json());

mongoose.connect("mongodb://akash:akash@ds121599.mlab.com:21599/stock")
  .then(
        ()=>{console.log('connected');},
        err =>{console.log('Error Connecting to DataBase');}
);


const schema = {
    query: {
        ticker: Joi.string().required(),
	dataType: Joi.string().default("Close"),
	startDate: Joi.string(),
	endDate: Joi.string(),
    }
};

var ws2 = new WebSocket('ws://localhost:40510');

app.get('/stock' ,expressJoi(schema), function (req, res, next) {

	var dt = req.query.dataType;

	Stock.findOne({ticker:req.query.ticker})
      		.exec((err, products) => { console.log(products)
	
	if(products==null)
	{
		ws2.send(req.query.ticker);
		ws2.on('message', function (message) {
			var msg = JSON.parse(message);
		Stock.findOneAndUpdate({
   			ticker:req.query.ticker}, 
			msg, {upsert: true, 'new': true}, function(err, res) {
    				console.log(res);})
		.then(function(response) { 
			res.json(response.priceHistory[dt])});
				console.log('Done!');
		});

	}
	else
	{
	res.json(products.priceHistory[dt]);
	}
	
     });

})

	


app.use(function (err, req, res, next) {
    if (err.isBoom) {
         return res.status(err.output.statusCode).json(err.output.payload);
    }
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
