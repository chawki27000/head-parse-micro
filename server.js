var express = require('express')
var app = express()

var ipaddress

app.get('/', function (req, res) {

	// 1st part of information
  	var user_agent = req.headers['user-agent'].split('(')
  	user_agent = user_agent[1].split(')')

  	// 2nd part of information
  	var accept_language = req.headers['accept-language'].split(',')

  	// 3rd part of information
	if (req.headers['x-forwarded-for']) {
	    ipaddress = req.headers['x-forwarded-for'].split(",")[0];
	} else if (req.connection && req.connection.remoteAddress) {
	    ipaddress = req.connection.remoteAddress;
	} else {
	    ipaddress = req.ip;
	}


	ipaddress = ipaddress.split(':')

	//building JSON response
	data = {
		'ipaddress': ipaddress[3],
		'language': accept_language[0],
		'software': user_agent[0]
	}

	res.json(data)

})

app.listen(process.env.PORT)
