// subscribes to the database published by the server
Meteor.subscribe('userData');
Meteor.subscribe('gameData');

Template.navBrand.helpers({
  'modeState': {
    mode:Session.get('isSanic'),
  },
});

Template.navItems.helpers({
// 	when you click the home button, it goes back to the base page
	'char': function() {
	  return myData.find({dataType: 'char'});
	},
	'game': function() {
	  return gameData.find({dataType: 'game'});
	}
});
Template.navItems.events({
'click #gameCreateAnchor': function() {
	 var currentUserId = Meteor.userId();
	 Meteor.call('insertGameDataCore', currentUserId, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
	 alert('Your game is now created, just go to the join game tab and click on it there to join!');
	},
});
	

Template.charViewer.helpers({
  'char': function() {
    return myData.find({dataType: 'char'});
  },
});

Template.charViewer.events({
  'click button': function() {
    if(Session.get('selectedChar' + Meteor.userId()) == document.getElementById(event.target.id).innerHTML){
      $('.count').removeClass('selected');
      $('#' + event.target.id).addClass('selected');
    }
  },
});

// CODE FOR THE CORE CHARACTER CREATOR
//Template.charCreateCore.helpers({
  
// });

Template.charCreateCore.events({
  // when they submit the form, it makes everything do as it should
  'submit form': function() {
    // stops the page refresh
    event.preventDefault();
    // calls the serverside function that shoves all of the data into the database
    var currentUserId = Meteor.userId(),
        charName = $('#charName').val(),
        charDescription = $('#charDescription').val(),
        charHighConceptAspect = $('#charHighConceptAspect').val(),
        charTroubleAspect = $('#charTroubleAspect').val(),
        charAspect1 = $('#charAspect1').val(),
        charAspect2 = $('#charAspect2').val(),
        charAspect3 = $('#charAspect3').val(),
        charSuperbSkill1 =  $('#charSuperbSkill1').val(),
        charSuperbSkill2 =  $('#charSuperbSkill2').val(),
        charSuperbSkill3 =  $('#charSuperbSkill3').val(),
        charSuperbSkill4 =  $('#charSuperbSkill4').val(),
        charSuperbSkill5 =  $('#charSuperbSkill5').val(),
        charGreatSkill1  = $('#charGreatSkill1').val(),
        charGreatSkill2  = $('#charGreatSkill2').val(),
        charGreatSkill3  = $('#charGreatSkill3').val(),
        charGreatSkill4  = $('#charGreatSkill4').val(),
        charGreatSkill5  = $('#charGreatSkill5').val(),
        charGoodSkill1 =  $('#charGoodSkill1').val(),
        charGoodSkill2 =  $('#charGoodSkill2').val(),
        charGoodSkill3 =  $('#charGoodSkill3').val(),
        charGoodSkill4 =  $('#charGoodSkill4').val(),
        charGoodSkill5 =  $('#charGoodSkill5').val(),
        charFairSkill1 =  $('#charFairSkill1').val(),
        charFairSkill2 =  $('#charFairSkill2').val(),
        charFairSkill3 =  $('#charFairSkill3').val(),
        charFairSkill4 =  $('#charFairSkill4').val(),
        charFairSkill5 =  $('#charFairSkill5').val(),
        charAvgSkill1 = $('#charAvgSkill1').val(),
        charAvgSkill2 = $('#charAvgSkill2').val(),
        charAvgSkill3 = $('#charAvgSkill3').val(),
        charAvgSkill4 = $('#charAvgSkill4').val(),
        charAvgSkill5 = $('#charAvgSkill5').val(),
        charExtras = $('#charExtras').val(),
        charStunts = $('#charStunts').val(),
        charMildCon1 = $('#charMildCon1').val(),
        charMildCon2 = $('#charMildCon2').val(),
        charModCon = $('#charModCon').val(),
        charSevCon = $('#charSevCon').val();
    Meteor.call('insertCharDataCore', currentUserId, charName, charDescription , charHighConceptAspect, charTroubleAspect , charAspect1 , charAspect2 , charAspect3 , charSuperbSkill1 , charSuperbSkill2 , charSuperbSkill3 , charSuperbSkill4 , charSuperbSkill5 , charGreatSkill1 , charGreatSkill2 , charGreatSkill3 , charGreatSkill4 , charGreatSkill5 , charGoodSkill1 , charGoodSkill2 , charGoodSkill3 , charGoodSkill4 , charGoodSkill5 , charFairSkill1 , charFairSkill2 , charFairSkill3 , charFairSkill4 , charFairSkill5 , charAvgSkill1 , charAvgSkill2 , charAvgSkill3 , charAvgSkill4 , charAvgSkill5 , charExtras , charStunts , charMildCon1 , charMildCon2 , charModCon , charSevCon);
    Router.go('/charViewer');
  },
});

// CODE FOR THE CORE GAME

Template.gameCore.helpers({
  'char': function(){
    var currentLocation = window.location.href,
        currentGameId = currentLocation.substr(currentLocation.length - 17, currentLocation.length),
        players = myData.find({_id: currentGameId}).fetch()[0].players;
    for (i = 0; i < players.length; i++) {
      return myData.find({createdBy: players[i], dataType: 'char'});
    }
  },
  'userChar': function() {
    return myData.find({createdBy: Meteor.userId(), dataType:'char'});
  },
  'games': function() {
    var currentLocation = window.location.href,
      currentGameId = currentLocation.substr(currentLocation.length - 17, currentLocation.length);
    return myData.find({_id: currentGameId});
  },
  'isCore': function() {
    if (Session.get('isSanic') === true){
      return false;
    } else {
      return true;
    }
  },
  'isSanic': {
    mode: Session.get('isSanic'),
  },
  tabs: function() {
    return [
      { name: 'Game', slug: 'game'},
      { name: 'Game Dials', slug: 'gamedials'},
      { name: 'Game Aspects', slug: 'gameaspects'},
      { name: 'Characters', slug: 'characters'},
      { name: 'Tools', slug: 'tools'},
      ];
  },
  activeTab: function() {
    return Session.get('activeTab');
  },
});

Template.gameCore.events({
  'change input': function() {
    var currentLocation = window.location.href,
        currentGameId = currentLocation.substr(currentLocation.length - 17, currentLocation.length);
        currentUserId = Meteor.userId(),
        gameNameVar = $('#gameName').val(),
        gameSettingVar = $('#gameSetting').val();
    console.log('test');
    console.log(gameSettingVar);
    var gameCurrentIssue1Var = $('#gameCurrentIssue1').val(),
        gameCurrentIssue2Var = $('#gameCurrentIssue2').val(),
        gameImpendingIssue1Var = $('#gameImpendingIssue1').val(),
        gameImpendingIssue2Var = $('#gameImpendingIssue2').val(),
        gameFaceName1Var = $('#gameFaceName1').val(),
        gameFaceIssue1Var = $('#gameFaceIssue1').val(),
        gameFaceName2Var = $('#gameFaceName2').val(),
        gameFaceIssue2Var = $('#gameFaceIssue2').val(),
        gameFaceName3Var = $('#gameFaceName3').val(),
        gameFaceIssue3Var = $('#gameFaceIssue3').val(),
        gameFaceName4Var = $('#gameFaceName4').val(),
        gameFaceIssue4Var = $('#gameFaceIssue4').val(),
        gameFaceName5Var = $('#gameFaceName5').val(),
        gameFaceIssue5Var = $('#gameFaceIssue5').val(),
        gameFaceName6Var = $('#gameFaceName6').val(),
        gameFaceIssue6Var = $('#gameFaceIssue6').val(),
        gameNumberOfAspectsVar = $('#gameNumberOfAspects').val(),
        gameNumberOfPhasesVar = $('#gameNumberOfPhases').val(),
        gameSkillCapVar = $('#gameSkillCap').val(),
        gamePyramidOrColumnVar = $('#gamePyramidOrColumns').val(),
        gameNumberOfColumnsVar = $('#gameNumberOfColumns').val(),
        gameRefreshRateVar = $('#gameRefreshRate').val(),
        gameInitialStuntsVar = $('#gameInitialStunts').val(),
        gameTypeOfStressTracksVar = $('#gameTypeOfStressTracks').val(),
        gameDefaultStressBoxesVar = $('#gameDefaultStressBoxes').val(),
        gameDefaultConsequenceSlotsVar = $('#gameDefaultConsequenceSlots').val(),
        gameSkill1Var = $('#gameSkill1').val(),
        gameSkill2Var = $('#gameSkill2').val(),
        gameSkill3Var = $('#gameSkill3').val(),
        gameSkill4Var = $('#gameSkill4').val(),
        gameSkill5Var = $('#gameSkill5').val(),
        gameSkill6Var = $('#gameSkill6').val(),
        gameSkill7Var = $('#gameSkill7').val(),
        gameSkill8Var = $('#gameSkill8').val(),
        gameSkill9Var = $('#gameSkill9').val(),
        gameSkill10Var = $('#gameSkill10').val(),
        gameStuntsAndExtrasVar = $('#gameStuntsAndExtras').val();
        Meteor.call('updateGameDataCore', currentGameId, currentUserId, gameNameVar,  gameSettingVar, gameCurrentIssue1Var, gameCurrentIssue2Var, gameImpendingIssue1Var, gameImpendingIssue2Var, gameFaceName1Var, gameFaceIssue1Var,  gameFaceName2Var, gameFaceIssue2Var,  gameFaceName3Var, gameFaceIssue3Var,  gameFaceName4Var, gameFaceIssue4Var,  gameFaceName5Var, gameFaceIssue5Var,  gameFaceName6Var, gameFaceIssue6Var,  gameNumberOfAspectsVar, gameNumberOfPhasesVar,  gameSkillCapVar,  gamePyramidOrColumnVar, gameNumberOfColumnsVar, gameRefreshRateVar, gameInitialStuntsVar, gameTypeOfStressTracksVar,  gameDefaultStressBoxesVar,  gameDefaultConsequenceSlotsVar, gameStuntsAndExtrasVar, gameSkill1Var, gameSkill2Var, gameSkill3Var, gameSkill4Var, gameSkill5Var, gameSkill6Var, gameSkill7Var, gameSkill8Var, gameSkill9Var, gameSkill10Var);
  },
  'click #dice': function() {
    if(Session.get('skillVal') === undefined){
      $('#diceLog').append('Please enter a valid skill value!' + '<br>');
    } else {
    values=[parseFloat(Session.get('skillVal'))];
    for(i = 0; i < 4; i++) {
      values.push(Math.floor(Math.random() * 3) - 1);
    }
    function add(a, b) {
      return a + b;
    }
    sum = values.reduce(add, 0);
    var currentLocation = window.location.href,
    currentGameId = currentLocation.substr(currentLocation.length - 17, currentLocation.length);
    // $('#diceLog').append(Meteor.userId() + ' rolled a ' + sum + '!' + '<br>');
    Meteor.call('addToLog', Meteor.userId() + ' rolled a ' + sum + '!' + '<br>', currentGameId);
    }
  },
});

Template.joinGameTemplate.helpers({
  'userGames': function() {
    return myData.find({createdBy: Meteor.userId(), dataType: 'game'});
  }
});

Template.joinGameTemplate.events({
  'click #submitGameId': function() {
    var gameDestination = $('#joinGameId').val();
    Router.go('/games/' + gameDestination);
    Meteor.call('addPlayer', Meteor.userId(), gameDestination);
  },
  'click .delete': function() {
    var gameToBeDeleted = document.getElementById(event.target.id).innerHTML;
    Meteor.call('delete', gameToBeDeleted);
  },
});

ReactiveTabs.createInterface({
  template: 'basicTabs',
});