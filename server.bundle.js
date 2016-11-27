/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*******************!*\
  !*** ./server.js ***!
  \*******************/
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';__webpack_require__(/*! dotenv */ 1).config({silent:true});var express=__webpack_require__(/*! express */ 2);var logger=__webpack_require__(/*! morgan */ 3);var path=__webpack_require__(/*! path */ 4);var bodyParser=__webpack_require__(/*! body-parser */ 5);var app=express();var PORT=process.argv[2]||process.env.port||3000;app.use(logger('dev'));app.use(bodyParser.json());app.use(express.static(path.join(__dirname,'public')));app.use(express.static(path.join(__dirname,'dist')));app.use('/api/v1',__webpack_require__(/*! ./routes/api.js */ 6));// import some new stuff
	var React=__webpack_require__(/*! react */ 17);// we'll use this to render our app to an html string
	var _require=__webpack_require__(/*! react-dom/server */ 18),renderToString=_require.renderToString;// and these to match the url to routes and then render
	var _require2=__webpack_require__(/*! react-router */ 19),match=_require2.match,RouterContext=_require2.RouterContext;var routes=__webpack_require__(/*! ./src/routes.js */ 20);// send all requests to index.html so browserHistory works
	app.get('*',function(req,res){// match the routes to the url
	match({routes:routes,location:req.url},function(err,redirect,props){// `RouterContext` is what the `Router` renders. `Router` keeps these
	// `props` in its state as it listens to `browserHistory`. But on the
	// server our app is stateless, so we need to use `match` to
	// get these props before rendering.
	var appHtml=renderToString(React.createElement(RouterContext,props));// dump the HTML into a template, lots of ways to do this, but none are
	// really influenced by React Router, so we're just using a little
	// function, `renderPage`
	res.send(renderPage(appHtml));});});function renderPage(appHtml){return'\n    <!DOCTYPE html>\n    <!--[if lt IE 7 ]>             <html class="ie6" lang="en"> <![endif]-->\n    <!--[if IE 7 ]>                <html class="ie7" lang="en"> <![endif]-->\n    <!--[if IE 8 ]>                <html class="ie8" lang="en"> <![endif]-->\n    <!--[if IE 9 ]>                <html class="ie9" lang="en"> <![endif]-->\n    <!--[if (gt IE 9)|!(IE)]><!--> <html lang="en"> <!--<![endif]-->\n      <head>\n        <meta charset="utf-8">\n        <meta content="ie=edge" http-equiv="x-ua-compatible">\n        <title>ReactJS Hello World</title>\n        <link href="/css/main.css" rel="stylesheet">\n      </head>\n      <body>\n        <div id="root-container">'+appHtml+'</div>\n        <script src="/js/main.js" type="text/javascript"></script>\n      </body>\n    </html>\n   ';}app.listen(PORT,function(){return console.warn('Server here! Listening on port '+PORT+'!');});
	/* WEBPACK VAR INJECTION */}.call(exports, ""))

/***/ },
/* 1 */
/*!*************************!*\
  !*** external "dotenv" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("dotenv");

/***/ },
/* 2 */
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ function(module, exports) {

	module.exports = require("express");

/***/ },
/* 3 */
/*!*************************!*\
  !*** external "morgan" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("morgan");

/***/ },
/* 4 */
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ function(module, exports) {

	module.exports = require("path");

/***/ },
/* 5 */
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ function(module, exports) {

	module.exports = require("body-parser");

/***/ },
/* 6 */
/*!***********************!*\
  !*** ./routes/api.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var router=__webpack_require__(/*! express */ 2).Router();var usersRouter=__webpack_require__(/*! ./users.js */ 7);var productsRouter=__webpack_require__(/*! ./products.js */ 15);// const applicantsRouter = require('./applicants.js');
	// const questionsRouter  = require('./questions.js');
	router.use('/users',usersRouter);router.use('/products',productsRouter);module.exports=router;

/***/ },
/* 7 */
/*!*************************!*\
  !*** ./routes/users.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var router=__webpack_require__(/*! express */ 2).Router();var userModel=__webpack_require__(/*! ../models/user.js */ 8);var questionModel=__webpack_require__(/*! ../models/question.js */ 14);var auth=__webpack_require__(/*! ../lib/auth.js */ 12);function sendAsJSON(req,res,next){res.json(res.rows);}router.route('/survey').get(questionModel.getQuestions,questionModel.shuffleQuestions,sendAsJSON).post(questionModel.saveAnswers,questionModel.checkAnswers,questionModel.getTempID,questionModel.storeTempID,sendAsJSON);router.route('/login').post(userModel.logIn,sendAsJSON);// TODO: get rid of this route; this is just for testing
	router.route('/:token').get(auth.authenticateUser,userModel.getUserData,userModel.getUserPosts,userModel.getUserWatches,userModel.prepareResponse,sendAsJSON);router.route('/').get(auth.authenticateUser,userModel.getUserData,sendAsJSON).post(userModel.createUser,sendAsJSON).put(sendAsJSON).delete(sendAsJSON);module.exports=router;

/***/ },
/* 8 */
/*!************************!*\
  !*** ./models/user.js ***!
  \************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var bcrypt=__webpack_require__(/*! bcrypt */ 9);var db=__webpack_require__(/*! ../db/db.js */ 10);var auth=__webpack_require__(/*! ../lib/auth.js */ 12);var SALTROUNDS=10;function isValidEmail(email){// regex for testing an email obtained from http://www.regular-expressions.info/email.html on 11/25/2016
	// allows for all valid emails - including those on subdomains of subdomains, up to the maximum SMTP supports
	// for more info, see above article
	var emailRegex=new RegExp(/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);// more basic regex obtained from the same article as the previous one
	// const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
	return emailRegex.test(email);}function createUser(req,res,next){// get data
	var first=req.body.firstName;var last=req.body.lastName;var email=req.body.email.toLowerCase();var password=bcrypt.hashSync(req.body.password,SALTROUNDS);// validate data
	if(!(first||last||email||password))next(new Error('Please check that all fields were filled out properly.'));if(!isValidEmail(email))next(new Error('Please submit a valid email address.'));// build query
	var query='INSERT INTO "user" (fname, lname, email, password) VALUES ($1, $2, $3, $4) RETURNING user_id, fname, lname, email;';// prepare values array
	var values=[first,last,email,password];// execute query with the data...
	db.one(query,values).then(function(data){// ...then get a token for the user and send it back to the caller
	auth.getUserToken(data).then(function(token){return res.rows=token;}).then(function(){return next();}).catch(function(err){return next(err);});})/* end of db then; catch db errors now */.catch(function(err){return next(err);});}function getUserData(req,res,next){var token=req.headers['token_authorization']||req.body.token||req.params.token||req.query.token;auth.getUserData(token).then(function(user){return res.userInfo=user.data;}).then(function(){return next();}).catch(function(err){return next(err);});}function getUserPosts(req,res,next){var values=[res.userInfo.user_id];var query='SELECT * FROM post INNER JOIN user_post_ref ON user_post_ref.post_id = post.post_id WHERE user_post_ref.user_id = $1;';db.any(query,values).then(function(posts){return res.userPosts=posts;}).then(function(){return next();}).catch(function(err){return next(err);});}function getUserWatches(req,res,next){var values=[res.userInfo.user_id];var query='SELECT * FROM post INNER JOIN watched_items_ref ON watched_items_ref.post_id = post.post_id WHERE watched_items_ref.user_id = $1;';db.any(query,values).then(function(watches){return res.userWatches=watches;}).then(function(){return next();}).catch(function(err){return next(err);});}function prepareResponse(req,res,next){var userInfo=res.userInfo;var userPosts=res.userPosts;var userWatches=res.userWatches;var retObj={user_info:userInfo,user_posts:userPosts,user_watched_items:userWatches};res.rows=retObj;next();}// logIn is a middleware function that expects to receive an email and a plain text password in the request,
	// and checks the combination against the database to see if the credentials are correct. If the credentials
	// exist in the database, logIn calls the getUserToken method with the user object received from the db to generate
	// a JWT to send back to the user for future calls to protected routes.
	function logIn(req,res,next){var email=req.body.email.toLowerCase();var password=req.body.password;if(!email||!password)next(new Error('Logging in requires both an email and a password.'));if(!isValidEmail(email))next(new Error('Please submit a valid email address.'));// build query and value variables
	var query='SELECT * FROM "user" WHERE email = $1;';var values=[email];// execute query, expecting either one row or none - for emails that don't exist
	db.oneOrNone(query,values).then(function(data){// if email doesn;t exist, reject the user
	if(!data)next(new Error('Invalid login credentials.'));// email definitely exists; next step:
	// check if submitted password matches the one in the db
	if(bcrypt.compareSync(password,data.password)){// password matches - good to go!
	// build out an object that we're going to send to the getUserToken method as payload to jwt.sign
	var userObj={};for(var key in data){if(key!='password')userObj[key]=data[key];}// call getUserToken on user's data and send it back to the user
	auth.getUserToken(userObj).then(function(token){return res.rows=token;}).then(function(){return next();}).catch(function(err){return next(err);});}else{// if password doesn't match, reject the login attempt
	next(new Error('Invalid login credentials.'));}})/* all that happend inside the then of the db call; now we catch db errors */.catch(function(err){return next(err);});}module.exports={createUser:createUser,getUserData:getUserData,getUserPosts:getUserPosts,getUserWatches:getUserWatches,prepareResponse:prepareResponse,logIn:logIn};

/***/ },
/* 9 */
/*!*************************!*\
  !*** external "bcrypt" ***!
  \*************************/
/***/ function(module, exports) {

	module.exports = require("bcrypt");

/***/ },
/* 10 */
/*!******************!*\
  !*** ./db/db.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var pg=__webpack_require__(/*! pg-promise */ 11)({});var pgConfig={host:process.env.PG_HOST,port:process.env.PG_PORT,database:process.env.PG_DATABASE,user:process.env.PG_USER,password:process.env.PG_PASSWORD};var db=pg(pgConfig);module.exports=db;

/***/ },
/* 11 */
/*!*****************************!*\
  !*** external "pg-promise" ***!
  \*****************************/
/***/ function(module, exports) {

	module.exports = require("pg-promise");

/***/ },
/* 12 */
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var db=__webpack_require__(/*! ../db/db.js */ 10);var jwt=__webpack_require__(/*! jsonwebtoken */ 13);var SECRET_APPROVED=process.env.SECRET_APPROVED;var SECRET_APPLICANT=process.env.SECRET_APPLICANT;function getUserToken(user){return new Promise(function(resolve,reject){jwt.sign({data:user},SECRET_APPROVED,{expiresIn:'1h'},function(err,token){if(err)return reject(err);resolve(token);});});}function getUserData(token){return new Promise(function(resolve,reject){jwt.verify(token,SECRET_APPROVED,function(err,decoded){if(err)return reject(err);resolve(decoded);});});}function getApplicantToken(user){return new Promise(function(resolve,reject){jwt.sign({data:user},SECRET_APPLICANT,{expiresIn:'1h'},function(err,token){if(err)return reject(err);resolve(token);});});}function getApplicantData(token){return new Promise(function(resolve,reject){jwt.verify(token,SECRET_APPLICANT,function(err,decoded){if(err)return reject(err);resolve(decoded);});});}function authenticateUser(req,res,next){var token=req.headers['token_authorization']||req.body.token||req.params.token||req.query.token;jwt.verify(token,SECRET_APPROVED,function(err,decoded){if(err)return next(err);next();});}function authenticateApplicant(req,res,next){var token=req.headers['token_authorization']||req.body.token||req.params.token||req.query.token;jwt.verify(token,SECRET_APPLICANT,function(err,decoded){if(err)return next(err);next();});}module.exports={getUserToken:getUserToken,getUserData:getUserData,getApplicantToken:getApplicantToken,getApplicantData:getApplicantData,authenticateUser:authenticateUser,authenticateApplicant:authenticateApplicant};

/***/ },
/* 13 */
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("jsonwebtoken");

/***/ },
/* 14 */
/*!****************************!*\
  !*** ./models/question.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var db=__webpack_require__(/*! ../db/db.js */ 10);var scoreThreshold=7;function isValidEmail(email){// regex for testing an email obtained from http://www.regular-expressions.info/email.html on 11/25/2016
	// allows for all valid emails - including those on subdomains of subdomains, up to the maximum SMTP supports
	// for more info, see above article
	var emailRegex=new RegExp(/^[A-Z0-9._%+-]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i);// more basic regex obtained from the same article as the previous one
	// const emailRegex = new RegExp(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
	return emailRegex.test(email);}function getQuestions(req,res,next){var query='SELECT * FROM question;';db.any(query).then(function(questions){return res.questions=questions;}).then(function(){return next();}).catch(function(err){return next(err);});}function shuffleQuestions(req,res,next){var sorted=res.questions;res.rows=sorted;next();}function checkIfTooSoon(req,res,next){var email=req.body.email;// check the email address
	if(!isValidEmail(email))next(new Error('Please submit a valid email address.'));var query='SELECT email, submit_date FROM survey_response WHERE email = $1 ORDER BY submit_date DESC;';var values=[email];db.any(query,values).then(function(data){// if there are no entries then this is a brand new user, so they're good to go
	if(!data)next();// otherwise, we need to check the date of the most recent submission against the current date
	var currentDate=Date.now();// TODO: make this be 7 days ago from now
	if(data[0].submit_date-currentDate<=7)next(new Error('You must wait 7 days betweeen submissionsn attempts.'));// if we've reached this point, the user is allowed to submit, so move them forward
	next();});}function saveAnswers(req,res,next){// don't need to check the validity of the email because checkIfTooSoon already checked it #DRY
	var email=req.body.email;// req.body.answers is an object
	var answers=req.body.answers;// email is good; create an empty array to hold the responses
	var values=[];// 10 questions; so we want to iterate through them
	for(var i=1;i<=10;i++){// check that each question has a valid choice
	// make sure that each answer exists, and that it's a number between 1 and 4 (inclusive); otherwise throw an error
	if(!(answers[i]||parseInt(answers[i])<1||parseInt(answers[i]>4))){next(new Error('Please submit an answer to every question and try again.'));}// if the answer exists, push it onto the values array. since we're incrementing i, the values will always be in order.
	values.push(answers[i]);}// if we've reached this point, values has 10 answers in it, in order of question numbers. now we need to push the email
	values.push(email);// build the query string
	var query='INSERT INTO survey_response (q1, q2, q3, q4, q5, q6, q7, q8, q9, q10, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *;';// ready to insert!
	db.oneOrNone(query,values).then(function(data){return res.valuesArray=values;}).then(function(){return next();}).catch(function(err){return next(err);});}function checkAnswers(req,res,next){var userAnswers=res.valuesArray;var query='SELECT * FROM answers ORDER BY question_num ASC;';var score=0;db.any(query).then(function(data){data.forEach(function(answer,i){if(userAnswers[i]==answer.correct_answer)score++;if(score>=scoreThreshold){res.rows={status:'approved',status_code:1};}else{res.rows={status:'denied',status_code:0};}});next();}).catch(function(err){return next(err);});}function getTempID(req,res,next){if(res.rows.status_code==0){res.rows.temp_id=null;next();}if(res.rows.status_code==1){var query='SELECT * FROM approved_emails;';db.any(query).then(function(users){var newID=Math.floor(Math.random()*1000000);var isValid=false;while(!isValid){isValid=true;users.forEach(function(user){if(user.temp_id==newID){isValid=false;}});newID=Math.floor(Math.random()*1000000);}res.rows.temp_id=newID;res.rows.email=req.body.email;next();}).catch(function(err){return next(err);});}}function storeTempID(req,res,next){var query='INSERT INTO approved_emails (temp_id, email) VALUES ($1, $2) RETURNING *;';var values=[res.rows.temp_id,res.rows.email];db.oneOrNone(query,values).then(function(data){return console.log(data);}).then(function(){return next();}).catch(function(err){return next(err);});}module.exports={getQuestions:getQuestions,shuffleQuestions:shuffleQuestions,checkIfTooSoon:checkIfTooSoon,saveAnswers:saveAnswers,checkAnswers:checkAnswers,getTempID:getTempID,storeTempID:storeTempID};

/***/ },
/* 15 */
/*!****************************!*\
  !*** ./routes/products.js ***!
  \****************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var router=__webpack_require__(/*! express */ 2).Router();var productModel=__webpack_require__(/*! ../models/product.js */ 16);var auth=__webpack_require__(/*! ../lib/auth.js */ 12);function sendAsJSON(req,res,next){res.json(res.rows);}router.route('/:id').get(auth.authenticateUser,productModel.getOneProduct,sendAsJSON).put(auth.authenticateUser,productModel.editProduct,sendAsJSON).delete(auth.authenticateUser,productModel.deleteProduct,sendAsJSON);router.route('/').get(productModel.getAllProducts,sendAsJSON).post(auth.authenticateUser,productModel.createProduct,sendAsJSON);module.exports=router;

/***/ },
/* 16 */
/*!***************************!*\
  !*** ./models/product.js ***!
  \***************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var db=__webpack_require__(/*! ../db/db.js */ 10);var auth=__webpack_require__(/*! ../lib/auth.js */ 12);function getAllProducts(req,res,next){var query='SELECT * FROM post;';db.any(query).then(function(data){return res.rows=data;}).then(function(){return next();}).catch(function(err){return next(err);});}function getOneProduct(req,res,next){var prod_id=req.params.id;var query='SELECT * FROM post WHERE post_id = $1;';var values=[prod_id];db.oneOrNone(query,values).then(function(data){return res.rows=data;}).then(function(){return next();}).catch(function(err){return next(err);});}function createProduct(req,res,next){var title=req.body.title;var description=req.body.description;var token=req.headers['token_authorization']||req.body.token||req.params.token||req.query.token;var user_id=null;auth.getUserData(token).then(function(user){user_id=user.data.user_id;}).then(function(){var queryOne='\n      INSERT INTO post\n        (title, description, user_id)\n      VALUES\n        ($1, $2, $3)\n      RETURNING post_id;\n    ';var queryTwo='\n      INSERT INTO user_post_ref\n        (user_id, post_id)\n      VALUES\n        ($3, $4)\n      ;\n    ';var values=[title,description,user_id];db.one(queryOne,values).then(function(inserted){values.push(parseInt(inserted.post_id));db.none(queryTwo,values).then(function(){return next();}).catch(function(err){return next(err);});}).catch(function(err){return next(err);});}).catch(function(err){return next(err);});}function editProduct(req,res,next){var prod_id=req.params.id;var title=req.body.title;var description=req.body.description;var query='UPDATE post SET title = $2, description = $3 WHERE post_id = $1 RETURNING *;';var values=[prod_id,title,description];db.one(query,values).then(function(data){return res.rows=data||'yup';}).then(function(){return next();}).catch(function(err){return next(err);});}function deleteProduct(req,res,next){var post_id=req.params.id;var query='DELETE FROM user_post_ref WHERE post_id = $1; DELETE FROM post WHERE post_id = $1;';var values=[post_id];db.none(query,values).then(function(){return res.rows='Succesfully Deleted';}).then(function(){return next();}).catch(function(err){return next(err);});}module.exports={getAllProducts:getAllProducts,getOneProduct:getOneProduct,createProduct:createProduct,editProduct:editProduct,deleteProduct:deleteProduct};

/***/ },
/* 17 */
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ function(module, exports) {

	module.exports = require("react");

/***/ },
/* 18 */
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ function(module, exports) {

	module.exports = require("react-dom/server");

/***/ },
/* 19 */
/*!*******************************!*\
  !*** external "react-router" ***!
  \*******************************/
/***/ function(module, exports) {

	module.exports = require("react-router");

/***/ },
/* 20 */
/*!***********************!*\
  !*** ./src/routes.js ***!
  \***********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _reactRouter=__webpack_require__(/*! react-router */ 19);var _OverallApp=__webpack_require__(/*! ./components/OverallApp.jsx */ 21);var _OverallApp2=_interopRequireDefault(_OverallApp);var _HomePage=__webpack_require__(/*! ./components/HomePage/HomePage.jsx */ 55);var _HomePage2=_interopRequireDefault(_HomePage);var _CreateUser=__webpack_require__(/*! ./components/CreateUser/CreateUser.jsx */ 57);var _CreateUser2=_interopRequireDefault(_CreateUser);var _LogIn=__webpack_require__(/*! ./components/LogIn/LogIn.jsx */ 59);var _LogIn2=_interopRequireDefault(_LogIn);var _App=__webpack_require__(/*! ./components/App/App1/App1.jsx */ 24);var _App2=_interopRequireDefault(_App);var _App3=__webpack_require__(/*! ./components/App/App2/App2.jsx */ 42);var _App4=_interopRequireDefault(_App3);var _App5=__webpack_require__(/*! ./components/App/App3/App3.jsx */ 47);var _App6=_interopRequireDefault(_App5);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}module.exports=_react2.default.createElement(_reactRouter.Route,{path:'/',component:_OverallApp2.default},_react2.default.createElement(_reactRouter.IndexRoute,{component:_HomePage2.default}),_react2.default.createElement(_reactRouter.Route,{path:'/signup',component:_CreateUser2.default}),_react2.default.createElement(_reactRouter.Route,{path:'/login',component:_LogIn2.default}),_react2.default.createElement(_reactRouter.Route,{path:'/app'},_react2.default.createElement(_reactRouter.IndexRoute,{component:_App2.default}),_react2.default.createElement(_reactRouter.Route,{path:'/profile',component:_App2.default}),_react2.default.createElement(_reactRouter.Route,{path:'/create',component:_App4.default}),_react2.default.createElement(_reactRouter.Route,{path:'/product',component:_App6.default})));

/***/ },
/* 21 */
/*!***************************************!*\
  !*** ./src/components/OverallApp.jsx ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _reactRouter=__webpack_require__(/*! react-router */ 19);var _Header=__webpack_require__(/*! ./App/Common/Header/Header.jsx */ 22);var _Header2=_interopRequireDefault(_Header);var _App=__webpack_require__(/*! ./App/App1/App1.jsx */ 24);var _App2=_interopRequireDefault(_App);var _App3=__webpack_require__(/*! ./App/App2/App2.jsx */ 42);var _App4=_interopRequireDefault(_App3);var _App5=__webpack_require__(/*! ./App/App3/App3.jsx */ 47);var _App6=_interopRequireDefault(_App5);var _HomePage=__webpack_require__(/*! ./HomePage/HomePage.jsx */ 55);var _HomePage2=_interopRequireDefault(_HomePage);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _defineProperty(obj,key,value){if(key in obj){Object.defineProperty(obj,key,{value:value,enumerable:true,configurable:true,writable:true});}else{obj[key]=value;}return obj;}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var OverallApp=function(_Component){_inherits(OverallApp,_Component);function OverallApp(props){_classCallCheck(this,OverallApp);var _this=_possibleConstructorReturn(this,(OverallApp.__proto__||Object.getPrototypeOf(OverallApp)).call(this,props));_this.state={productListItem:'',products:'',totalResults:0,searchTerm:'',title:'',image:'',description:'',firstName:'',lastName:'',email:'',password:'',url:''};return _this;}_createClass(OverallApp,[{key:'setOverallState',value:function setOverallState(obj){this.setState(obj);}},{key:'doLogin',value:function doLogin(email,password){var bodyObj={email:email,password:password};fetch('/api/v1/users/login',{headers:new Headers({'Content-Type':'application/json'}),method:'POST',body:JSON.stringify(bodyObj)}).then(function(r){return r.json();}).then(function(token){console.log(token);localStorage.setItem('userAuthToken',token);}).catch(function(err){return console.log(err);});}},{key:'createUser',value:function createUser(e){e.preventDefault();var bodyObj={firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password};fetch('/api/v1/users',{headers:new Headers({'Content-Type':'application/json'}),method:'POST',body:JSON.stringify(bodyObj)}).then(function(r){return r.json();}).then(function(token){localStorage.setItem('userAuthToken',token);}).catch(function(err){return console.log(err);});}},{key:'updateBodyForm',value:function updateBodyForm(e){console.log(e.target.value);this.setState(_defineProperty({},e.target.name,e.target.value));}// Get users survery
	},{key:'userSurvey',value:function userSurvey(e){var _this2=this;fetch('/users/survey/',{headers:new Headers({'Content-Type':'application/json'}),method:'GET'}).then(function(r){return r.json();}).then(function(array){_this2.setState({questions:array});}).catch(function(err){return console.log(err);});}// mutator function changes slected product
	// Code acquired from FireHouse lab.
	},{key:'changeProduct',value:function changeProduct(item){this.setState({products:this.state.productListItem[item]});}// we are setting the state like this because we are using react router.
	},{key:'render',value:function render(){var _React$cloneElement;return _react2.default.createElement('div',null,this.props.children&&_react2.default.cloneElement(this.props.children,(_React$cloneElement={overallState:this.state,setOverallState:this.setOverallState.bind(this),doLogin:this.doLogin.bind(this),createUser:this.createUser.bind(this),firstName:this.state.firstName,lastName:this.state.lastName,email:this.state.email,password:this.state.password,formChange:this.updateBodyForm.bind(this)},_defineProperty(_React$cloneElement,'createUser',this.createUser.bind(this)),_defineProperty(_React$cloneElement,'products',this.state),_defineProperty(_React$cloneElement,'changeProduct',this.changeProduct.bind(this)),_React$cloneElement)));}}]);return OverallApp;}(_react.Component);exports.default=OverallApp;module.exports=exports['default'];

/***/ },
/* 22 */
/*!*****************************************************!*\
  !*** ./src/components/App/Common/Header/Header.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _reactRouter=__webpack_require__(/*! react-router */ 19);var _Header=__webpack_require__(/*! ./Header.css */ 23);var _Header2=_interopRequireDefault(_Header);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var Header=function(_Component){_inherits(Header,_Component);function Header(){_classCallCheck(this,Header);return _possibleConstructorReturn(this,(Header.__proto__||Object.getPrototypeOf(Header)).apply(this,arguments));}_createClass(Header,[{key:'render',value:function render(){return _react2.default.createElement('div',{className:_Header2.default['header-container']},_react2.default.createElement('div',{className:_Header2.default['logo']},_react2.default.createElement('img',{src:'',alt:''}),_react2.default.createElement('h1',null,'chairShare')),_react2.default.createElement('nav',{className:_Header2.default['links']},_react2.default.createElement(_reactRouter.Link,{className:_Header2.default['create-post'],to:'/create'},'Create Post'),_react2.default.createElement(_reactRouter.Link,{className:_Header2.default['profile'],to:'/profile'},'Profile')));}}]);return Header;}(_react.Component);exports.default=Header;module.exports=exports['default'];

/***/ },
/* 23 */
/*!*****************************************************!*\
  !*** ./src/components/App/Common/Header/Header.css ***!
  \*****************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"header-container":"Header__header-container___Yvv_9","logo":"Header__logo___1sD81","links":"Header__links___23sAI","create-post":"Header__create-post___21RTb","profile":"Header__profile___1w-X4"};

/***/ },
/* 24 */
/*!******************************************!*\
  !*** ./src/components/App/App1/App1.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _reactRouter=__webpack_require__(/*! react-router */ 19);var _App=__webpack_require__(/*! ./App1.css */ 25);var _App2=_interopRequireDefault(_App);var _PostItems=__webpack_require__(/*! ./../Common/PostItems/PostItems.jsx */ 26);var _PostItems2=_interopRequireDefault(_PostItems);var _Profile=__webpack_require__(/*! ./Profile/Profile.jsx */ 32);var _Profile2=_interopRequireDefault(_Profile);var _Header=__webpack_require__(/*! ./../Common/Header/Header.jsx */ 22);var _Header2=_interopRequireDefault(_Header);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var App1=function(_Component){_inherits(App1,_Component);function App1(){_classCallCheck(this,App1);return _possibleConstructorReturn(this,(App1.__proto__||Object.getPrototypeOf(App1)).apply(this,arguments));}_createClass(App1,[{key:'render',value:function render(){return _react2.default.createElement('div',null,_react2.default.createElement(_reactRouter.Link,{to:'/product'},'App3'),_react2.default.createElement('div',{className:_App2.default["Header"]},_react2.default.createElement(_Header2.default,null)),_react2.default.createElement(_PostItems2.default,{showProducts:this.props.showProducts}),_react2.default.createElement('div',{className:_App2.default['app']},_react2.default.createElement(_Profile2.default,null)));}}]);return App1;}(_react.Component);exports.default=App1;module.exports=exports['default'];

/***/ },
/* 25 */
/*!******************************************!*\
  !*** ./src/components/App/App1/App1.css ***!
  \******************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"app":"App1__app___3XJLW"};

/***/ },
/* 26 */
/*!***********************************************************!*\
  !*** ./src/components/App/Common/PostItems/PostItems.jsx ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _PostItem=__webpack_require__(/*! ./PostItem/PostItem.jsx */ 27);var _PostItem2=_interopRequireDefault(_PostItem);var _SearchBox=__webpack_require__(/*! ./SearchBox/SearchBox.jsx */ 29);var _SearchBox2=_interopRequireDefault(_SearchBox);var _PostItems=__webpack_require__(/*! ./PostItems.css */ 31);var _PostItems2=_interopRequireDefault(_PostItems);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var PostItems=function(_Component){_inherits(PostItems,_Component);function PostItems(){_classCallCheck(this,PostItems);return _possibleConstructorReturn(this,(PostItems.__proto__||Object.getPrototypeOf(PostItems)).apply(this,arguments));}_createClass(PostItems,[{key:'showProducts',value:function showProducts(){return props.products.map(function(item,i){return _react2.default.createElement(_PostItem2.default,{key:i,title:item.title,images:item.images,description:item.description,id:item.post_id});});}},{key:'componentWillMount',value:function componentWillMount(){this.props.getAllProducts();}},{key:'render',value:function render(){return _react2.default.createElement('div',{className:_PostItems2.default['side-bar']},_react2.default.createElement('p',null,this.showProducts()),_react2.default.createElement(_SearchBox2.default,null),_react2.default.createElement(_PostItem2.default,null));}}]);return PostItems;}(_react.Component);exports.default=PostItems;module.exports=exports['default'];

/***/ },
/* 27 */
/*!*******************************************************************!*\
  !*** ./src/components/App/Common/PostItems/PostItem/PostItem.jsx ***!
  \*******************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _PostItem=__webpack_require__(/*! ./PostItem.css */ 28);var _PostItem2=_interopRequireDefault(_PostItem);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var PostItem=function PostItem(props){return _react2.default.createElement('div',{className:_PostItem2.default["post-item"],onClick:props.changeProduct},_react2.default.createElement('div',{className:_PostItem2.default["item-desc"]},_react2.default.createElement('h3',null,'Product Title'),_react2.default.createElement('p',null,'Product Description. yada yada yada. here\'s my description')),_react2.default.createElement('img',{src:'',alt:'Product Image'}));};exports.default=PostItem;module.exports=exports['default'];

/***/ },
/* 28 */
/*!*******************************************************************!*\
  !*** ./src/components/App/Common/PostItems/PostItem/PostItem.css ***!
  \*******************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"post-item":"PostItem__post-item___1iBaN","item-desc":"PostItem__item-desc___30ehf"};

/***/ },
/* 29 */
/*!*********************************************************************!*\
  !*** ./src/components/App/Common/PostItems/SearchBox/SearchBox.jsx ***!
  \*********************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _SearchBox=__webpack_require__(/*! ./SearchBox.css */ 30);var _SearchBox2=_interopRequireDefault(_SearchBox);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var SearchBox=function SearchBox(props){return _react2.default.createElement('div',{className:_SearchBox2.default["search"]},_react2.default.createElement('div',{className:_SearchBox2.default["search-input"]},_react2.default.createElement('p',null,'Search'),_react2.default.createElement('input',{type:'text'})),_react2.default.createElement('select',{className:_SearchBox2.default["drop-down"]},_react2.default.createElement('option',{value:''},'Option 1'),_react2.default.createElement('option',{value:''},'Option 2')));};exports.default=SearchBox;module.exports=exports['default'];

/***/ },
/* 30 */
/*!*********************************************************************!*\
  !*** ./src/components/App/Common/PostItems/SearchBox/SearchBox.css ***!
  \*********************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"search":"SearchBox__search___2BfMW","search-input":"SearchBox__search-input___2fg-Y","drop-down":"SearchBox__drop-down___3fVcD"};

/***/ },
/* 31 */
/*!***********************************************************!*\
  !*** ./src/components/App/Common/PostItems/PostItems.css ***!
  \***********************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"side-bar":"PostItems__side-bar___1zFA3"};

/***/ },
/* 32 */
/*!*****************************************************!*\
  !*** ./src/components/App/App1/Profile/Profile.jsx ***!
  \*****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _Watching=__webpack_require__(/*! ./Watching/Watching.jsx */ 33);var _Watching2=_interopRequireDefault(_Watching);var _MyPostContainer=__webpack_require__(/*! ./MyPostContainer/MyPostContainer.jsx */ 37);var _MyPostContainer2=_interopRequireDefault(_MyPostContainer);var _Profile=__webpack_require__(/*! ./Profile.css */ 41);var _Profile2=_interopRequireDefault(_Profile);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Profile=function Profile(props){return _react2.default.createElement('div',{className:_Profile2.default['profile']},_react2.default.createElement('h1',null,'Profile'),_react2.default.createElement(_Watching2.default,null),_react2.default.createElement(_MyPostContainer2.default,null));};exports.default=Profile;module.exports=exports['default'];

/***/ },
/* 33 */
/*!***************************************************************!*\
  !*** ./src/components/App/App1/Profile/Watching/Watching.jsx ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _WatchItems=__webpack_require__(/*! ./WatchItems/WatchItems.jsx */ 34);var _WatchItems2=_interopRequireDefault(_WatchItems);__webpack_require__(/*! ./Watching.css */ 36);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Watching=function Watching(props){return _react2.default.createElement('div',{className:'watching'},_react2.default.createElement('h3',null,'Watching'),_react2.default.createElement(_WatchItems2.default,null));};exports.default=Watching;module.exports=exports['default'];

/***/ },
/* 34 */
/*!****************************************************************************!*\
  !*** ./src/components/App/App1/Profile/Watching/WatchItems/WatchItems.jsx ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);__webpack_require__(/*! ./WatchItems.css */ 35);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var WatchItems=function WatchItems(props){return _react2.default.createElement('div',{className:'watch-items'},_react2.default.createElement('p',null,'Product Title'),_react2.default.createElement('p',null,'Description'),_react2.default.createElement('img',{src:'',alt:'Product Image'}),_react2.default.createElement('button',null,'Delete'));};exports.default=WatchItems;module.exports=exports['default'];

/***/ },
/* 35 */
/*!****************************************************************************!*\
  !*** ./src/components/App/App1/Profile/Watching/WatchItems/WatchItems.css ***!
  \****************************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 36 */
/*!***************************************************************!*\
  !*** ./src/components/App/App1/Profile/Watching/Watching.css ***!
  \***************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 37 */
/*!*****************************************************************************!*\
  !*** ./src/components/App/App1/Profile/MyPostContainer/MyPostContainer.jsx ***!
  \*****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _MyPost=__webpack_require__(/*! ./MyPost/MyPost.jsx */ 38);var _MyPost2=_interopRequireDefault(_MyPost);__webpack_require__(/*! ./MyPostContainer.css */ 40);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var MyPostContainer=function MyPostContainer(props){return _react2.default.createElement('div',{className:'my-post-container'},_react2.default.createElement('h3',null,'My Posts'),_react2.default.createElement(_MyPost2.default,null),_react2.default.createElement('button',null,'Submit New Post'));};exports.default=MyPostContainer;module.exports=exports['default'];

/***/ },
/* 38 */
/*!***************************************************************************!*\
  !*** ./src/components/App/App1/Profile/MyPostContainer/MyPost/MyPost.jsx ***!
  \***************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);__webpack_require__(/*! ./MyPost.css */ 39);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var MyPost=function MyPost(props){return _react2.default.createElement('div',{className:'my-post'},_react2.default.createElement('p',null,'Post Title'),_react2.default.createElement('p',null,'Post Description'),_react2.default.createElement('img',{src:'',alt:'Product Image'}),_react2.default.createElement('button',null,'Delete'));};exports.default=MyPost;module.exports=exports['default'];

/***/ },
/* 39 */
/*!***************************************************************************!*\
  !*** ./src/components/App/App1/Profile/MyPostContainer/MyPost/MyPost.css ***!
  \***************************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 40 */
/*!*****************************************************************************!*\
  !*** ./src/components/App/App1/Profile/MyPostContainer/MyPostContainer.css ***!
  \*****************************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 41 */
/*!*****************************************************!*\
  !*** ./src/components/App/App1/Profile/Profile.css ***!
  \*****************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"profile":"Profile__profile___2H7qD"};

/***/ },
/* 42 */
/*!******************************************!*\
  !*** ./src/components/App/App2/App2.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _App=__webpack_require__(/*! ./App2.css */ 43);var _App2=_interopRequireDefault(_App);var _PostItems=__webpack_require__(/*! ./../Common/PostItems/PostItems.jsx */ 26);var _PostItems2=_interopRequireDefault(_PostItems);var _CreatePost=__webpack_require__(/*! ./CreatePost/CreatePost.jsx */ 44);var _CreatePost2=_interopRequireDefault(_CreatePost);var _Header=__webpack_require__(/*! ./../Common/Header/Header.jsx */ 22);var _Header2=_interopRequireDefault(_Header);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var App2=function(_Component){_inherits(App2,_Component);function App2(){_classCallCheck(this,App2);return _possibleConstructorReturn(this,(App2.__proto__||Object.getPrototypeOf(App2)).apply(this,arguments));}_createClass(App2,[{key:'render',value:function render(){return _react2.default.createElement('div',null,_react2.default.createElement('div',{className:_App2.default["Header"]},_react2.default.createElement(_Header2.default,null)),_react2.default.createElement('div',{className:_App2.default["app"]},_react2.default.createElement(_PostItems2.default,null),_react2.default.createElement(_CreatePost2.default,null)));}}]);return App2;}(_react.Component);exports.default=App2;module.exports=exports['default'];

/***/ },
/* 43 */
/*!******************************************!*\
  !*** ./src/components/App/App2/App2.css ***!
  \******************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"app":"App2__app___22x4N"};

/***/ },
/* 44 */
/*!***********************************************************!*\
  !*** ./src/components/App/App2/CreatePost/CreatePost.jsx ***!
  \***********************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _reactDropzone=__webpack_require__(/*! react-dropzone */ 45);var _reactDropzone2=_interopRequireDefault(_reactDropzone);var _CreatePost=__webpack_require__(/*! ./CreatePost.css */ 46);var _CreatePost2=_interopRequireDefault(_CreatePost);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var CreatePost=function(_Component){_inherits(CreatePost,_Component);function CreatePost(props){_classCallCheck(this,CreatePost);var _this=_possibleConstructorReturn(this,(CreatePost.__proto__||Object.getPrototypeOf(CreatePost)).call(this,props));_this.state={title:'',description:'',formData:new FormData()};return _this;}// function to set the state of the input fields and send it back up to app
	_createClass(CreatePost,[{key:'onImageDrop',value:function onImageDrop(images){this.setState({formData:this.state.formData.append('image',images[0])});}},{key:'postProduct',value:function postProduct(e){e.preventDefault();var token=localStorage.getItem('userAuthToken');fetch('/api/v1/products',{headers:new Headers({Token_Authorization:token}),method:'POST',body:this.state.formData}).catch(function(err){return console.log(err);});}},{key:'render',value:function render(){return _react2.default.createElement('div',{className:_CreatePost2.default["create-post"]},_react2.default.createElement('h1',null,'Create Post:'),_react2.default.createElement('p',null,'Title:'),_react2.default.createElement('input',{type:'text',value:this.state.title}),_react2.default.createElement('p',null,'Images:'),_react2.default.createElement(_reactDropzone2.default,{multiple:false,accept:'image/*',onDrop:this.onImageDrop.bind(this)}),_react2.default.createElement('p',null,'Description:'),_react2.default.createElement('input',{type:'text',value:this.state.description}));}}]);return CreatePost;}(_react.Component);exports.default=CreatePost;module.exports=exports['default'];

/***/ },
/* 45 */
/*!*********************************!*\
  !*** external "react-dropzone" ***!
  \*********************************/
/***/ function(module, exports) {

	module.exports = require("react-dropzone");

/***/ },
/* 46 */
/*!***********************************************************!*\
  !*** ./src/components/App/App2/CreatePost/CreatePost.css ***!
  \***********************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"create-post":"CreatePost__create-post___11-3x"};

/***/ },
/* 47 */
/*!******************************************!*\
  !*** ./src/components/App/App3/App3.jsx ***!
  \******************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _App=__webpack_require__(/*! ./App3.css */ 48);var _App2=_interopRequireDefault(_App);var _PostItems=__webpack_require__(/*! ./../Common/PostItems/PostItems.jsx */ 26);var _PostItems2=_interopRequireDefault(_PostItems);var _SelectedItem=__webpack_require__(/*! ./SelectedItem/SelectedItem.jsx */ 49);var _SelectedItem2=_interopRequireDefault(_SelectedItem);var _Header=__webpack_require__(/*! ./../Common/Header/Header.jsx */ 22);var _Header2=_interopRequireDefault(_Header);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var App3=function(_Component){_inherits(App3,_Component);function App3(){_classCallCheck(this,App3);return _possibleConstructorReturn(this,(App3.__proto__||Object.getPrototypeOf(App3)).apply(this,arguments));}_createClass(App3,[{key:'render',value:function render(){return _react2.default.createElement('div',null,_react2.default.createElement('div',{className:_App2.default["Header"]},_react2.default.createElement(_Header2.default,null)),_react2.default.createElement('div',{className:_App2.default['app']},_react2.default.createElement(_PostItems2.default,null),_react2.default.createElement(_SelectedItem2.default,null)));}}]);return App3;}(_react.Component);exports.default=App3;module.exports=exports['default'];

/***/ },
/* 48 */
/*!******************************************!*\
  !*** ./src/components/App/App3/App3.css ***!
  \******************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"app":"App3__app___HypeH"};

/***/ },
/* 49 */
/*!***************************************************************!*\
  !*** ./src/components/App/App3/SelectedItem/SelectedItem.jsx ***!
  \***************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _ProductBox=__webpack_require__(/*! ./ProductBox/ProductBox.jsx */ 50);var _ProductBox2=_interopRequireDefault(_ProductBox);var _RelatedItems=__webpack_require__(/*! ./RelatedItems/RelatedItems.jsx */ 52);var _RelatedItems2=_interopRequireDefault(_RelatedItems);var _SelectedItem=__webpack_require__(/*! ./SelectedItem.css */ 54);var _SelectedItem2=_interopRequireDefault(_SelectedItem);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var SelectedItem=function SelectedItem(props){return _react2.default.createElement('div',{className:_SelectedItem2.default["selected-item"]},_react2.default.createElement('h1',null,'Selected Product'),_react2.default.createElement(_ProductBox2.default,null),_react2.default.createElement(_RelatedItems2.default,null));};exports.default=SelectedItem;module.exports=exports['default'];

/***/ },
/* 50 */
/*!************************************************************************!*\
  !*** ./src/components/App/App3/SelectedItem/ProductBox/ProductBox.jsx ***!
  \************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);__webpack_require__(/*! ./ProductBox.css */ 51);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var ProductBox=function ProductBox(props){return _react2.default.createElement('div',{className:'product-box'},_react2.default.createElement('div',{className:'product-text'},_react2.default.createElement('p',null,'Product Title'),_react2.default.createElement('p',null,'Product Description')),_react2.default.createElement('img',{src:'',alt:'Product Image'}));};exports.default=ProductBox;module.exports=exports['default'];

/***/ },
/* 51 */
/*!************************************************************************!*\
  !*** ./src/components/App/App3/SelectedItem/ProductBox/ProductBox.css ***!
  \************************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 52 */
/*!****************************************************************************!*\
  !*** ./src/components/App/App3/SelectedItem/RelatedItems/RelatedItems.jsx ***!
  \****************************************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);__webpack_require__(/*! ./RelatedItems.css */ 53);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var RelatedItems=function RelatedItems(props){return _react2.default.createElement('div',{className:'RelatedItems'},_react2.default.createElement('div',null,_react2.default.createElement('h2',null,'Related Item'),_react2.default.createElement('p',null,'Product Title'),_react2.default.createElement('p',null,'Product Description')),_react2.default.createElement('img',{src:'',alt:'Product Image'}),_react2.default.createElement('button',null,'Add to Watch List'));};exports.default=RelatedItems;module.exports=exports['default'];

/***/ },
/* 53 */
/*!****************************************************************************!*\
  !*** ./src/components/App/App3/SelectedItem/RelatedItems/RelatedItems.css ***!
  \****************************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 54 */
/*!***************************************************************!*\
  !*** ./src/components/App/App3/SelectedItem/SelectedItem.css ***!
  \***************************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"selected-item":"SelectedItem__selected-item___3r2Zd"};

/***/ },
/* 55 */
/*!**********************************************!*\
  !*** ./src/components/HomePage/HomePage.jsx ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _reactRouter=__webpack_require__(/*! react-router */ 19);var _HomePage=__webpack_require__(/*! ./HomePage.css */ 56);var _HomePage2=_interopRequireDefault(_HomePage);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var HomePage=function(_Component){_inherits(HomePage,_Component);function HomePage(){_classCallCheck(this,HomePage);return _possibleConstructorReturn(this,(HomePage.__proto__||Object.getPrototypeOf(HomePage)).apply(this,arguments));}_createClass(HomePage,[{key:'render',value:function render(){return _react2.default.createElement('div',{className:_HomePage2.default["home-page"]},_react2.default.createElement('div',{className:_HomePage2.default['auth-home']},_react2.default.createElement(_reactRouter.Link,{to:'/signup'},'Signup'),_react2.default.createElement(_reactRouter.Link,{to:'/login'},'Login'),_react2.default.createElement('div',{className:_HomePage2.default["home-logo"]},_react2.default.createElement('img',{src:'/chairShare.png',alt:'Logo'}),_react2.default.createElement('h1',null,'chairShare')),_react2.default.createElement('div',{className:_HomePage2.default['home-about']},_react2.default.createElement('h2',null,'About us'),_react2.default.createElement('p',null,'chairShare is a place for you rich assholes to sell your used crap. But nice used crap like Restoration Hardware and West Elm and antique shit. No poor people allowed. Want to see if you qualify? Take our survey to see if you\'re rich enough, bitch'),_react2.default.createElement('button',null,'See if you qualify'))),_react2.default.createElement('div',{className:_HomePage2.default["box-one"]}),_react2.default.createElement('div',{className:_HomePage2.default["box-two"]}),_react2.default.createElement('div',{className:_HomePage2.default["box-three"]}),_react2.default.createElement('div',{className:_HomePage2.default["box-four"]}));}}]);return HomePage;}(_react.Component);exports.default=HomePage;module.exports=exports['default'];

/***/ },
/* 56 */
/*!**********************************************!*\
  !*** ./src/components/HomePage/HomePage.css ***!
  \**********************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"auth-home":"HomePage__auth-home___39tM0","home-logo":"HomePage__home-logo___35AE3","home-about":"HomePage__home-about___H-EyJ","box-one":"HomePage__box-one___3b5cP","box-two":"HomePage__box-two___2RdGC","box-three":"HomePage__box-three___7_Wq8","box-four":"HomePage__box-four___3mkK8"};

/***/ },
/* 57 */
/*!**************************************************!*\
  !*** ./src/components/CreateUser/CreateUser.jsx ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _CreateUser=__webpack_require__(/*! ./CreateUser.css */ 58);var _CreateUser2=_interopRequireDefault(_CreateUser);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var CreateUser=function CreateUser(props){return _react2.default.createElement('div',{className:_CreateUser2.default["home-page"]},_react2.default.createElement('div',{className:_CreateUser2.default['create-user']},_react2.default.createElement('div',{className:_CreateUser2.default["home-logo"]},_react2.default.createElement('img',{src:'/chairShare.png',alt:'Logo'}),_react2.default.createElement('h1',null,'chairShare')),_react2.default.createElement('div',{className:_CreateUser2.default["home-content"]},_react2.default.createElement('h2',null,'Sign Up'),_react2.default.createElement('div',{className:_CreateUser2.default["home-input"]},_react2.default.createElement('p',null,'First Name'),_react2.default.createElement('input',{type:'text',name:'firstName',placeholder:'First Name',value:props.firstName,onChange:props.formChange})),_react2.default.createElement('div',{className:_CreateUser2.default["home-input"]},_react2.default.createElement('p',null,'Last Name'),_react2.default.createElement('input',{type:'text',name:'lastName',placeholder:'Last Name',value:props.lastName,onChange:props.formChange})),_react2.default.createElement('div',{className:_CreateUser2.default["home-input"]},_react2.default.createElement('p',null,'Email'),_react2.default.createElement('input',{id:'email',type:'text',name:'email',placeholder:'Email',value:props.email,onChange:props.formChange})),_react2.default.createElement('div',{className:_CreateUser2.default["home-input"]},_react2.default.createElement('p',null,'Password'),_react2.default.createElement('input',{type:'password',name:'password',placeholder:'password',value:props.password,onChange:props.formChange})),_react2.default.createElement('button',{onClick:props.createUser},' Submit '))));};exports.default=CreateUser;module.exports=exports['default'];

/***/ },
/* 58 */
/*!**************************************************!*\
  !*** ./src/components/CreateUser/CreateUser.css ***!
  \**************************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"home-page":"CreateUser__home-page___3YtcJ","create-user":"CreateUser__create-user___3sG-s","home-logo":"CreateUser__home-logo___3e4fc","home-content":"CreateUser__home-content___13H84","home-input":"CreateUser__home-input___3XDYE","home-form":"CreateUser__home-form___2BqIZ","email":"CreateUser__email___3pT2M"};

/***/ },
/* 59 */
/*!****************************************!*\
  !*** ./src/components/LogIn/LogIn.jsx ***!
  \****************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=__webpack_require__(/*! react */ 17);var _react2=_interopRequireDefault(_react);var _reactRouter=__webpack_require__(/*! react-router */ 19);var _LogIn=__webpack_require__(/*! ./LogIn.css */ 60);var _LogIn2=_interopRequireDefault(_LogIn);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var LogIn=function(_Component){_inherits(LogIn,_Component);function LogIn(){_classCallCheck(this,LogIn);return _possibleConstructorReturn(this,(LogIn.__proto__||Object.getPrototypeOf(LogIn)).apply(this,arguments));}_createClass(LogIn,[{key:'render',value:function render(){return _react2.default.createElement('div',{className:_LogIn2.default['log-in']},_react2.default.createElement(_reactRouter.Link,{to:'/app'},'App1'),_react2.default.createElement('form',{className:_LogIn2.default['log-box']},_react2.default.createElement('div',{className:_LogIn2.default["home-logo"]},_react2.default.createElement('img',{src:'/chairShare.png',alt:'Logo'}),_react2.default.createElement('h1',null,'chairShare')),_react2.default.createElement('div',{className:_LogIn2.default['input-box']},_react2.default.createElement('div',{className:_LogIn2.default['email-box']},_react2.default.createElement('p',{id:_LogIn2.default['email']},'Email'),_react2.default.createElement('input',null)),_react2.default.createElement('div',{className:_LogIn2.default['password-box']},_react2.default.createElement('p',{id:_LogIn2.default['password']},'Password'),_react2.default.createElement('input',null)),_react2.default.createElement('button',null,'Log In'))));}}]);return LogIn;}(_react.Component);exports.default=LogIn;module.exports=exports['default'];

/***/ },
/* 60 */
/*!****************************************!*\
  !*** ./src/components/LogIn/LogIn.css ***!
  \****************************************/
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin
	module.exports = {"log-in":"LogIn__log-in___1wC2f","home-logo":"LogIn__home-logo___6VBS-","log-box":"LogIn__log-box___1PBqF","input-box":"LogIn__input-box___3J3Y9","password-box":"LogIn__password-box___2CMFC","email-box":"LogIn__email-box___1wAPI"};

/***/ }
/******/ ]);
//# sourceMappingURL=server.bundle.js.map