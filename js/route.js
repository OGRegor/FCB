Router.onBeforeAction(function () {
  // this.render('nav', {to: 'header'});
  if (!Meteor.userId()) {
    // if the user is not logged in, render the Login template
    this.render('filler');
  } else {
    this.next();
  }
});

Router.route('/', function () {
	//sets the layout of the application to the layout template
	this.layout('layout1');
	//renders the menu bar
	if(Session.get('isSanic')){
  	this.render('navAccel', {to: 'header'});
	  this.render('homeAccel');
 	} else {
    this.render('nav', {to: 'header'});
	  this.render('home');
 	}
	//renders the footer
	this.render('foot', {to: 'footer'});
});

Router.route('/games/:_id', function () {
	var game = myData.findOne({_id: this.params._id});
	this.layout('layout1');
  if(Session.get('isSanic')){
  	this.render('navAccel', {to: 'header'});
 	} else {
    this.render('nav', {to: 'header'});
 	}
	this.render('gameCore', {data: game});
	this.render('foot', {to: 'footer'});
});

Router.route('/joinGame', function() {
  this.layout('layout1');
  if(Session.get('isSanic')){
  	this.render('navAccel', {to: 'header'});
 	} else {
    this.render('nav', {to: 'header'});
 	}
 	this.render('joinGameTemplate');
 	this.render('foot', {to: 'footer'});
});

Router.route('/charCreate', function () {
  this.layout('layout1');
  if(Session.get('isSanic')){
  	this.render('navAccel', {to: 'header'});
 	} else {
    this.render('nav', {to: 'header'});
 	}
 	this.render('charCreateCore');
  this.render('foot', {to:'footer'});
});

Router.route('/charViewer', function() {
  this.layout('layout1');
  this.render('nav', {to: 'header'});
  this.render('charViewer');
  this.render('foot', {to: 'footer'});
});

Router.route('/about', function() {
  this.layout('layout1');
  if(Session.get('isSanic')){
  	this.render('navAccel', {to: 'header'});
 	} else {
    this.render('nav', {to: 'header'});
 	}
 	this.render('about');
  this.render('foot', {to: 'footer'});
});