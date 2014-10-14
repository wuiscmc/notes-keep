'use strict';

/* jasmine specs for controllers go here */
describe('controllers', function() {

  beforeEach(module('notekeep'));

  describe('CardList', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('CardList', {$scope: scope});
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('cards.json').
        respond([
          {id: 1, content: 'sample1', date: '12/12/2013'},
          {id: 2, content: 'sample2', date: '12/12/2014'}]);
    }));

    it('should load the cards from the json', function() {
      $httpBackend.flush();
      expect(scope.cards.length).toBe(2);
    });

    it('allows to add new cards', function(){
      $httpBackend.flush();
      expect(scope.cards.length).toBe(2);
      scope.newCard = {id: 3, content: 'sample3', date: '12/12/2015'};
      scope.addCard();
      expect(scope.cards.length).toBe(3);
      expect(scope.cards[2].content).toBe('sample3');
      expect(scope.newCard.content).toBe('');
    });

    it('allows to remove cards', function(){
      $httpBackend.flush();
      expect(scope.cards.length).toBe(2);
      scope.removeCard(1);
      expect(scope.cards.length).toBe(1);
      expect(scope.cards[0].id).toBe(2);
    });

  });

});
