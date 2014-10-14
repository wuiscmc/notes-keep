/**
* app Module
*
* Description
*/

'use strict';

var app = angular.module('notekeep', ['underscore']);

app.controller('CardList', ['$scope', '$http', '_', function($scope, $http, _){

  $scope.cards = [];
  $scope.newCard = {content: '', date: ''}

  initialize();

  $scope.addCard = function(){
    $scope.cards.push($scope.newCard);
    $scope.newCard = {content: '', date: ''};
  }

  $scope.removeCard = function(id) {
    $scope.cards = _.reject($scope.cards, function(card){ return card.id == id;});
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
        var cards = angular.fromJson(data);
        $scope.cards = _.map(cards, function(card){
          card.date = new Date(card.date);
          return card;
        });
      });
  }

}]);


