const express = require('express');
const stripe = require('stripe')('sk_test_fb8oYTMAa6wAFm7MPYY8rva100TOR71RTM');
const bodyParser = require('body-Parser');
const exphbs = require('express-handlebars');


const app = express();

//Handlebars middleware
app.engine('handlebars',exphbs({defaultlayout:'main'}));
app.set('view engine', 'handlebars');


//Body Parser middleware 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//set static folder
app.use(express.static('${__dirname}/public'));

//index route
app.get('/', (req, res, next) => {
  res.render('cart');
  

});
// main route
app.post('/main', (req, res) =>{
	res.render('main');
});

//service route
app.post('/service', (req, res) =>{
	res.render('service');
});
 //respond route
 app.post('/respond', (req, res) => {
 	
 	console.log(req.body);
 	res.render('respond');
 });



//charge route
app.post('/charge', (req, res) => {
	const amount = 3000;
	
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken
	})
	.then(customer => stripe.charges.create({
		amount,
		description:'product marketing',
		currency:'usd',
		customer:customer.id

	}))
     


	.then(charge => res.render('success'));
	
});

 
const port = process.env.port || 8080;

app.listen(port, () => {
  console.log('server started on port ',{port});

});