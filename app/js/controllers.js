/**
* CardControllers Module
*
* Description
*/

var cardControllers = angular.module('CardControllers', ['underscore']);

cardControllers.controller('CardListCtrl', ['$scope', '$http', '_', function($scope, $http, _){

  $scope.cards = [];
  $scope.newCard = {content: '', date: ''}
  $scope.adding = false;
  $scope.editing = false;

  initialize();

  $scope.addCard = function() {
    $scope.adding = true;
  }

  $scope.cancelAdd = function() {
    finishAdd();
  }

  $scope.saveCard = function() {
    $scope.newCard.id = parseInt((Math.random() * 10) + 10);
    $scope.cards.push($scope.newCard);
    finishAdd();
  }

  $scope.removeCard = function(id) {
    $scope.cards = _.reject($scope.cards, function(card){ return card.id == id;});
  }

  $scope.editCard = function(card) {
    $scope.lockedCard = angular.copy(card);
    $scope.editing = true;
  }

  $scope.updateCard = function() { 
    var editCardIndex = _.findIndex($scope.cards, function(card){
      return card.id == $scope.lockedCard.id;
    });
    $scope.cards[editCardIndex] = $scope.lockedCard;
    finishEditing();
  }

  $scope.cancelEdit = function() {
    finishEditing();
  }

  /*
  * initialization stuff
  */
  function initialize(){
    loadCards();
  }

  function loadCards(){
    $http.get('cards.json').
      success(function(data){
        $scope.cards = _.map(angular.fromJson(data), function(card){
          card.date = new Date(card.date);
          return card;
        });
      });
  }

  function finishAdd() {
    $scope.adding = false;
    $scope.newCard = {content: '', date: ''};
  };

  function finishEditing() {
    $scope.editing = false;
    $scope.lockedCard = null;
  }

}]);


