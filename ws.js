var axios = require('axios');
var WebSocketServer = require('ws').Server,
wss = new WebSocketServer({port: 40510})

wss.on('connection', function (ws) {
  ws.on('message', function (message) {
    console.log('received: %s', message)
	var arr = [];
	var createdDate;
	axios.get('https://www.quandl.com/api/v3/datasets/NSE/'+message+'.json?api_key=MX4zkypoSjUzp8CyotQg')
  		.then(function (response) {
			arr.push(message);
			var data = response.data.dataset.data;
			var openarr = [],higharr = [],lowarr = [],lastarr = [],closearr =[] ,ttqarr = [],turnoverarr = [],dates = [];
			data.forEach(function(element) {
				dates.push(element[0]);
				openarr.push(element[1]);
				higharr.push(element[2]);
				lowarr.push(element[3]);
				lastarr.push(element[4]);
				closearr.push(element[5]);
				ttqarr.push(element[6]);
				turnoverarr.push(element[7]);
			});
			var tickers =response.data.dataset.dataset_code;
			if(arr.filter(i => i === message).length==1)
				 createdDate = Date.now();
			var updatedDate = Date.now();
			var obj = {
				ticker:tickers,
				priceHistory:{
						Dates:dates,
						Open:openarr,
						High:higharr,
						Low:lowarr,
						Last:lastarr,
						Close:closearr,
						TTQ:ttqarr,
						Turnover:turnoverarr
					      },
				createdDate:createdDate,
				updatedDate:updatedDate
			}
			return obj;
		})
		.then(function (obj) {
			ws.send(JSON.stringify(obj));  
		})
		.catch(function (error) {
		 	console.log(error);
		})  
	})	
});
