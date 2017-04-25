import { expect } from 'chai';
import { Map, List, fromJS } from 'immutable';

import { newDeck, deal } from '../../app/lib/cards';

/* Write test using Mocha & Chai:
   Go to 'https://mochajs.org/' to see syntax */

describe('cards.js', () => {

    describe('newDeck', () => {
        it('the deck is an immutable list', () => {
            expect(newDeck()).to.be.instanceOf(List);
        });
        it('the deck starts out with 52 cards', () => {
            expect(newDeck().size).to.eq(52);
        });
        it('returns the same deck with same seed', () => {
            expect(newDeck(1)).to.eq(newDeck(1));
        });
        it('returns different deck with different seeds', () => {
            expect(newDeck(1)).not.to.eq(newDeck(2));
        });

    });

    describe('deal', () => {
        const deck = newDeck();
        const n = 2;
        const [new_deck, new_hand] = deal(deck, n);

        it('returns the smaller deck', () => {
            expect(new_deck.size).to.eq(52 - n);    
        });

        it('returns hand of n cards', () => {
            expect(new_hand.size).to.eq(n);
        });

        it('deals the same card each time with the same seed', () => {
            const cards = [];
            for(let i = 0; i < 10; i += 1) {
                cards.push(deal(deck, 1, 1)[1].first());
            }
            const all_same = cards.reduce( (prev, curr) => prev && (cards[0] === curr), true);
            expect(all_same).to.eq(true);

        })

        it('does not deal the same card each time with different seeds', () => {
            const cards = [];
            for(let i = 0; i < 10; i += 1) {
                cards.push(deal(deck, 1, i)[1].first());
            }
            const all_same = cards.reduce((prev, curr) => prev && (cards[0] == curr), true);
            expect(all_same).to.eq(false);
        });
    });
});