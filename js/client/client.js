// subscribes to the database published by the server
Meteor.subscribe('charData');
Meteor.subscribe('gameData');

Template.layout1.onRendered( function() {
  $(window).resize(function() {
    if($(window).width() > 712) {
      $('.backDrop').parent();
    } else {
      $('.backTarget').addClass('backDrop');
    }
  });
});

Template.navBrand.helpers({
  'modeState': {
    mode:Session.get('isSanic'),
  },
});

Template.navItems.helpers({
// 	when you click the home button, it goes back to the base page
	'char': function() {
	  return charData.find();
	},
	'game': function() {
	  return gameData.find();
	},
});

Template.charViewer.helpers({
  'char': function() {
    return charData.find();
  },
  'noCharDetected': function() {
    var currentUserId = Meteor.userId();
    if (charData.find({createdBy: currentUserId}) === null) {
      return true;
    } else {
      return false;
    }
  },
});

Template.charViewer.events({
  
});

// CODE FOR THE ACCELERATED GAME

//CODE FOR THE CHARACTERS LIST STUFF

// CODE FOR THE ACCELERATED CHARACTER CREATOR

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
        charRefresh = $('#charRefresh').val(),
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
    Meteor.call('insertCharDataCore', currentUserId, charName, charRefresh , charDescription , charHighConceptAspect, charTroubleAspect , charAspect1 , charAspect2 , charAspect3 , charSuperbSkill1 , charSuperbSkill2 , charSuperbSkill3 , charSuperbSkill4 , charSuperbSkill5 , charGreatSkill1 , charGreatSkill2 , charGreatSkill3 , charGreatSkill4 , charGreatSkill5 , charGoodSkill1 , charGoodSkill2 , charGoodSkill3 , charGoodSkill4 , charGoodSkill5 , charFairSkill1 , charFairSkill2 , charFairSkill3 , charFairSkill4 , charFairSkill5 , charAvgSkill1 , charAvgSkill2 , charAvgSkill3 , charAvgSkill4 , charAvgSkill5 , charExtras , charStunts , charMildCon1 , charMildCon2 , charModCon , charSevCon);
    Router.go('/');
  },
});

// CODE FOR THE CORE GAME

Template.gameCore.helpers({
  'char': function(){
    // return charData.find( {createdBy: gameData.find({players}) });
  },
  'game': function() {
    return gameData.find();
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
      { name: 'Game Aspects', slug: 'gameaspects'},
      { name: 'Characters', slug: 'characters'},
      { name: 'Character Aspects', slug: 'characteraspects'},
      { name: 'Tools', slug: 'tools'},
      ];
  },
  activeTab: function() {
    return Session.get('activeTab');
  },
  'players': function() {
    return gameData.find({})
  }
});

Template.gameCore.events({
  'submit form': function() {
    event.preventDefault();
    var currentUserId = Meteor.userId(),
        gameTypeVar = 'core',
        gameNameVar = $('#gameName').val(),
        gameSettingVar = $('#gameSetting').val(),
        gameCurrentIssue1Var = $('#gameCurrentIssue1').val(),
        gameCurrentIssue2Var = $('#gameCurrentIssue2').val(),
        gameImpendingIssue1Var = $('#gameImpendingIssue1').val(),
        gameImpendingIssue2Var = $('#gameImpendingIssue2').val(),
        gameFaceName1Var = $('#gameFaceName1').val(),
        gameFaceIssue1Var = $('#gameFaceIssue1').val(),
        gameNumberOfAspectsVar = $('#gameNumberOfAspects').val(),
        gameNumberOfPhasesVar = $('#gameNumberOfPhases').val(),
        gameSkillCapVar = $('#gameSkillCap').val(),
        gamePyramidOrColumnVar = $('#gamePyramidOrColumn').val(),
        gameNumberOfColumnsVar = $('#gameNumberOfColumns').val(),
        gameRefreshRateVar = $('#gameRefreshRate').val(),
        gameInitialStuntsVar = $('#gameInitialStunts').val(),
        gameTypeOfStressTracksVar = $('#gameTypeOfStressTracks').val(),
        gameDefaultStressBoxesVar = $('#gameDefaultStressBoxes').val(),
        gameDefaultConsequenceSlotsVar = $('#gameDefaultConsequenceSlots').val(),
        gameStuntsAndExtrasVar = $('#gameStuntsAndExtras').val();
        Meteor.call('insertGameDataCore', currentUserId, gameTypeVar,  gameNameVar,  gameSettingVar, gameCurrentIssue1Var, gameCurrentIssue2Var, gameImpendingIssue1Var, gameImpendingIssue2Var, gameFaceName1Var, gameFaceIssue1Var,  gameNumberOfAspectsVar, gameNumberOfPhasesVar,  gameSkillCapVar,  gamePyramidOrColumnVar, gameNumberOfColumnsVar, gameRefreshRateVar, gameInitialStuntsVar, gameTypeOfStressTracksVar,  gameDefaultStressBoxesVar,  gameDefaultConsequenceSlotsVar, gameStuntsAndExtrasVar);
        // make this in the not jank
        // Router.go('/game/:_id');
        Router.go('/');
  },
  'click #dice': function() {
    if(Session.get('skillVal') === undefined){
      $('#diceLog').append('Please enter a valid skill value!' + '<br>')
    } else {
    values=[parseFloat(Session.get('skillVal'))];
    for(i = 0; i < 4; i++) {
      values.push(Math.floor(Math.random() * 3) - 1);
    }
    function add(a, b) {
      return a + b;
    }
    sum = values.reduce(add, 0);
    $('#diceLog').append('You rolled a ' + sum + '!' + '<br>');
    }
  },

});

ReactiveTabs.createInterface({
  template: 'basicTabs',
});