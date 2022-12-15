const request = require('request');
const apiOptions = {
    server: `http://localhost:3000`
    }
//const application = JSON.parse(fs.readFileSync('./data/trips.json','utf8'));  Old code



/* Get travel list */
const travelList = (req, res) => {//  Method designed to make a list of trips
	const path = `/api/trips`;
	const requestOptions = {
		url: `${apiOptions.server}${path}`,// notice the back ticks
		method: 'GET',
		json: {}
	};

	console.info('>> travelController.travelList calling. ' + requestOptions.url);

	request(requestOptions,
		(err, {statusCode}, body) => {
			if (err) {
				console.error(err);
			}
			renderTravelList(req, res, body);
		}
	);
};

const renderTravelList = (req, res, responseBody) => {
	let message = null;
	let pageTitle = process.env.npm_package_description + ' - Travel';
	if (!(responseBody instanceof Array)) {
		message = 'API lookup error';
		responseBody = [];
	} else {
		if (!responseBody.length) {
			message = 'No trips exist in our database!';
		}
	}
	res.render('travel', {
		title: pageTitle,
		trips: responseBody,
		message: message
	});
};
   module.exports = {
    travel
   };
   