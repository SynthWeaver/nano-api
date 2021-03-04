var express = require('express');
var router = express.Router();

//load module
// const nano = require('nanopay');

// // Owner data
// $private_key = '2e2f59ed0b5a369395ff93356f263e3dc32431b3fb12ab0f9ffef446f247e075';
// $public_key  = 'nano_1kqwjdygnok5w9f4566p3ywnohqaphx5b19zbc7j4jfbmqamsoi7jh361hej';
// $account     = 'nano_1kqwjdygnok5w9f4566p3ywnohqaphx5b19zbc7j4jfbmqamsoi7jh361hej';

// // Block data
// $send_difficulty = 'fffffff800000000';
// $destination     = 'nano_34nheyoqjixpxfhfc549sp1bp4s6f1ar563ehmjqcnn668ryuw88i5dt5smu';
// $sending_amount  = '0.000001';

//load module
const nano = require('nanopay');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});

router.get('/test', function(req, res, next) {

// init nano.init( nanonode, worknode)
nano.init('https://mynano.ninja/api/node', 'https://besoeasy.com/api/nanopow');

var seed = '2e2f59ed0b5a369395ff93356f263e3dc32431b3fb12ab0f9ffef446f247e075';
var nanoaddress = 'nano_1i4f6ymq356dbwjxwn1e83abf7sxd9xajmhfc3qj4jwr56gfx7dwqi8qszge';
var amount = 0.000001;

async function main() {
            // generate privatekey from seed and path 
            // nano.gensecretKey(seed, index)
	var secrateKey = await nano.gensecretKey(seed, 0);

            //generate address from secretKey
	var genaddress = await nano.secretKeytoaddr(secrateKey);

	console.log('My address : ' + genaddress);


            //get account data addressInfo(address, number of recent transactions to load [optional] )
	var accountData = await nano.addressInfo(genaddress);
	console.log(accountData);

           //recieve pending transactions
	var done1 = await nano.fetchPending(secrateKey);

	if (done1.hash) {
		console.log('fetched : ' + done1.hash);
	}

          // send nano to address
	var done2 = await nano.send(secrateKey, nanoaddress, amount);

	if (done2.hash) {
		console.log('sent : ' + done2.hash);
		res.render('index', { title: 'Express' });
	}
}

main();

});


module.exports = router;
