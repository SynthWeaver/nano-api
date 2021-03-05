const express = require('express');
const router = express.Router();
const nano = require('../code/nano.js');

// init nano.init( nanonode, worknode)
nano.init('https://mynano.ninja/api/node', 'https://besoeasy.com/api/nanopow');

// my private key
const seed = '2e2f59ed0b5a369395ff93356f263e3dc32431b3fb12ab0f9ffef446f247e075';
const publicKey = 'nano_1kqwjdygnok5w9f4566p3ywnohqaphx5b19zbc7j4jfbmqamsoi7jh361hej';
let secretKey = null;

generateSecretKey();

setTimeout(() => {
	// nano.generatePow(secretKey);
	test();
}, 1000);

async function test(){
	// var secretKey = await nano.gensecretKey(seed, 0);
	// var address = await nano.secretKeytoaddr(secretKey);
	var genseed = await nano.genseed();
	console.log(genseed);
};

function middleware (req, res, next) {
	res.on('finish', () => {
        console.log('Response has been sent!');
        pay();
    })
	next();
}

router.get('/test', middleware, function(req, res, next) {
	res.render('index', { title: 'Payment requested' });
});

async function pay() {
	const nanoaddress = 'nano_1i4f6ymq356dbwjxwn1e83abf7sxd9xajmhfc3qj4jwr56gfx7dwqi8qszge';
	const amount = 0.000001;

	//check if secrate key is ready
	if(secretKey == null){
		console.log("error: secretKey is not yet loaded")
		res.render('index', { title: 'please try again' });
	}

	try{

		// send nano to address
		const done2 = await nano.send(secretKey, nanoaddress, amount);

		console.log("Payment requested");

		if (done2.hash) {
			console.log('sent : ' + done2.hash);
		}
	}catch(e){
		console.log("Error: " + e);
	}
}

async function generateSecretKey(){
	// nano.gensecretKey(seed, index)
	secretKey = await nano.gensecretKey(seed, 0);

	// console.log('My secretKey : ' + secretKey);

	//generate address from secretKey
	const genaddress = await nano.secretKeytoaddr(secretKey);

	// console.log('My address : ' + genaddress);

	//get account data addressInfo(address, number of recent transactions to load [optional] )
	const accountData = await nano.addressInfo(genaddress);
	// console.log(accountData);
}

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

module.exports = router;
