const express = require('express');
const router = express.Router();
const nano = require('nanopay');

// init nano.init( nanonode, worknode)
nano.init('https://mynano.ninja/api/node', 'https://besoeasy.com/api/nanopow');

// my private key
const seed = '2e2f59ed0b5a369395ff93356f263e3dc32431b3fb12ab0f9ffef446f247e075';
let secrateKey = null;

generateSecrateKey();

router.get('/test', function(req, res, next) {
	const nanoaddress = 'nano_1i4f6ymq356dbwjxwn1e83abf7sxd9xajmhfc3qj4jwr56gfx7dwqi8qszge';
	const amount = 0.000001;

	async function main() {
		//check if secrate key is ready
		if(secrateKey == null){
			console.log("error: secrateKey is not yet loaded")
			res.render('index', { title: 'please try again' });
		}

		// //recieve pending transactions
		// const done1 = await nano.fetchPending(secrateKey);

		// console.log("Fetch Nano requested");

		// if (done1.hash) {
		// 	console.log('fetched : ' + done1.hash);
		// }

		console.log("2sec");

		res.render('index', { title: '2 seconds' });

		console.log("Start requesting payment");

		// send nano to address
		const done2 = await nano.send(secrateKey, nanoaddress, amount);

		console.log("Payment requested");

		if (done2.hash) {
			console.log('sent : ' + done2.hash);
			res.render('index', { title: 'Payment succesfull' });
		}

		
	}

	main();

});

async function generateSecrateKey(){
	// nano.gensecretKey(seed, index)
	secrateKey = await nano.gensecretKey(seed, 0);

	console.log('My secrateKey : ' + secrateKey);

	//generate address from secretKey
	const genaddress = await nano.secretKeytoaddr(secrateKey);

	console.log('My address : ' + genaddress);

	//get account data addressInfo(address, number of recent transactions to load [optional] )
	const accountData = await nano.addressInfo(genaddress);
	console.log(accountData);
}

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


module.exports = router;
