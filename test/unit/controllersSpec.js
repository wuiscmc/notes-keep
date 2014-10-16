'use strict';

/* jasmine specs for controllers go here */
describe('controllers', function() {

  beforeEach(module('notekeep'));

  describe('CardListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      scope = $rootScope.$new();
      ctrl = $controller('CardListCtrl', {$scope: scope});
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('cards.json').
        respond([
          {id: 1, content: 'sample1', date: '12/12/2013'},
          {id: 2, content: 'sample2', date: '12/12/2014'}]);
    }));

    describe('card addition', function(){
      it('gets locked until the card is added', function(){
        expect(scope.adding).toBe(false);
        scope.addCard();
        expect(scope.adding).toBe(true);
        scope.saveCard();
        expect(scope.adding).toBe(false);
       });

      it('lets you add a card', function(){
        scope.cards = [];
        scope.addCard();
        scope.newCard = newCard();
        scope.saveCard();
        expect(scope.newCard.content).toBe('');
        expect(scope.cards.length).toBe(1);
        expect(scope.cards[0].content).toBe('testy');
      })

      it('unlocks when cancelled', function(){
        expect(scope.adding).toBe(false);
        scope.addCard();
        expect(scope.adding).toBe(true);
        scope.cancelAdd();
        expect(scope.adding).toBe(false);
      });
    });

    describe('card edition', function(){
      beforeEach(function(){
        scope.cards = [mockCard()];
        expect(scope.editing).toBe(false);
        scope.editCard(scope.cards[0]);
      });

      it('should lock the edit form', function(){
        expect(scope.editing).toBe(true);
        scope.updateCard();
        expect(scope.editing).toBe(false);
      });

      it('should update a card', function(){
        expect(scope.lockedCard.content).toBe(scope.cards[0].content);
        var newContent = "updated content for this shit";
        scope.lockedCard.content = newContent;
        scope.updateCard();
        expect(scope.cards[0].content).toBe(newContent);
      });

      it('doesnt update anything when cancelled', function(){
        var newContent = "updated content for this shit";
        scope.lockedCard.content = newContent;
        scope.cancelEdit();
        expect(scope.cards[0].content).not.toBe(newContent);
      });


    });

    describe('card list', function(){
      it('should load the cards from the json', function() {
        $httpBackend.flush();
        expect(scope.cards.length).toBe(2);
      });

      it('allows to remove cards', function(){
        scope.cards = [mockCard(1), mockCard(2)];
        expect(scope.cards.length).toBe(2);
        scope.removeCard(1);
        expect(scope.cards.length).toBe(1);
        expect(scope.cards[0].id).toBe(2);
      });
    });


  });

  function newCard() {
    return {content: 'testy', date: '12/12/2025'};
  };

  function mockCard(id) {
    var fakeid = id || parseInt((Math.random() * 10) + 10);
    var content = newCard();
    content['id'] = fakeid;
    return content;
  }

});
