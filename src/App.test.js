// import React from 'react';
// import ReactDOM from 'react-dom';
// import App from './components/App.js';
import deepFreeze from 'deep-freeze-strict';
import shuffleArray from './components/shuffleArray.js';
import cards from './components/cards.js';
import grid, {
    addActive,
    addGateToReset,
    deactivate,
    moveToActiveLeft,
} from './components/grid.js';
import generateValues from './components/values.js';
import gameReducer, { gameActionCreator } from './ducks/game.js';
// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
// });

describe('immutable actions', () => {
    it('throw error if object is mutated', () => {
        const obj = { foo: 'foo' };
        deepFreeze(obj);
        expect(() => {
            obj.foo = 'bar';
        }).toThrow();
    });
    it('throw error if object is deeply mutated', () => {
        const obj = { foo: { deep: 'foo' } };
        deepFreeze(obj);
        expect(() => {
            obj.foo.deep = 'bar';
        }).toThrow();
    });
});

describe('shuffleArray', () => {
    it('A shuffled array has the same length, and less than the third of indexes have shifted position.', () => {
        const input = [
            { i: 0, val: 10 },
            { i: 1, val: 11 },
            { i: 2, val: 12 },
            { i: 3, val: 13 },
            { i: 4, val: 14 },
            { i: 5, val: 15 },
            { i: 6, val: 16 },
            { i: 7, val: 17 },
            { i: 8, val: 18 },
            { i: 9, val: 19 },
            { i: 10, val: 20 },
        ];
        deepFreeze(input);
        const output = shuffleArray(input);
        let equalities = 0;
        output.forEach((val, i) => {
            equalities = i === val.i ? (equalities += 1) : equalities;
        });
        const lessThanAThirdIsOnSamePosition = Boolean(
            equalities < input.length / 3,
        );
        expect(output.length).toEqual(input.length);
        expect(lessThanAThirdIsOnSamePosition);
    });
});

describe('create cards', () => {
    it('a card have properties for selected and value', () => {
        const actual = cards(4)[0];
        expect(actual).toHaveProperty('value');
        expect(actual).toHaveProperty('selected');
        expect(actual).toHaveProperty('selectable');
        expect(actual).toHaveProperty('id');
    });
    it('values is an array of unique values in pairs', () => {
        const values = generateValues(5);
        values.forEach((valA, index, arr) => {
            const uniquePairs = arr.filter(valB => valB === valA);
            expect(uniquePairs).toHaveLength(2);
        });
    });
    it('number of cards shall be even integer above 3', () => {
        expect(() => cards(0)).toThrow();
        expect(() => cards(1)).toThrow();
        expect(() => cards(2)).toThrow();
        expect(() => cards(3)).toThrow();
        expect(() => cards(4)).not.toThrow();
    });
});

describe('create board', () => {
    it('a specified size of 3 rows and 4 columns gives 12 positions', () => {
        const actual = grid(3, 4);
        const desired = {
            1: { 1: { id: 0 }, 2: { id: 1 }, 3: { id: 2 }, 4: { id: 3 } },
            2: { 1: { id: 4 }, 2: { id: 5 }, 3: { id: 6 }, 4: { id: 7 } },
            3: { 1: { id: 8 }, 2: { id: 9 }, 3: { id: 10 }, 4: { id: 11 } },
        };
        // const desired = [
        //     { id: 0, row: 1, col: 1 },
        //     { id: 1, row: 1, col: 2 },
        //     { id: 2, row: 1, col: 3 },
        //     { id: 3, row: 1, col: 4 },
        //     { id: 4, row: 2, col: 1 },
        //     { id: 5, row: 2, col: 2 },
        //     { id: 6, row: 2, col: 3 },
        //     { id: 7, row: 2, col: 4 },
        //     { id: 8, row: 3, col: 1 },
        //     { id: 9, row: 3, col: 2 },
        //     { id: 10, row: 3, col: 3 },
        //     { id: 11, row: 3, col: 4 },
        // ];
        expect(actual).toEqual(desired);
    });
    it('add properties "active" and "gateToReset" to each position', () => {
        const obj = grid(2, 3);
        deepFreeze(obj);
        const actual = addGateToReset(addActive(obj));
        const desired = {
            1: {
                1: { id: 0, active: true, gateToReset: false },
                2: { id: 1, active: true, gateToReset: false },
                3: { id: 2, active: true, gateToReset: false },
            },
            2: {
                1: { id: 3, active: true, gateToReset: false },
                2: { id: 4, active: true, gateToReset: false },
                3: { id: 5, active: true, gateToReset: false },
            },
        };
        expect(actual).toEqual(desired);
    });
    it('move to left active position from current', () => {
        // const obj = grid(2, 3);
        const obj = addActive(grid(3, 4));
        deepFreeze(obj);
        const actual = deactivate(obj,2,2);
        console.log('app.test:137:adjusted:',actual);
        const desired = {
            1: {
                1: { id: 0, active: true },
                2: { id: 1, active: true },
                3: { id: 2, active: true },
                4: { id: 3, active: true },
            },
            2: {
                1: { id: 4, active: true },
                2: { id: 5, active: false },
                3: { id: 6, active: true },
                4: { id: 7, active: true },
            },
            3: {
                1: { id: 8, active: true },
                2: { id: 9, active: true },
                3: { id: 10, active: true },
                4: { id: 11, active: true },
            },
        };
        expect(actual).toEqual(desired);
        expect(() => {
            moveToActiveLeft(actual, 23, 45);
        }).toThrow();
        expect(moveToActiveLeft(actual, 1, 3).id).toEqual(1);
        expect(moveToActiveLeft(actual, 2, 3).id).toEqual(4);
    });
    it('game action ', () => {
        const state = { some: 'value' };
        deepFreeze(state);
        const actual = gameReducer(state, { type: null, payload: 'empty' });
        const desired = { some: 'value' };
        expect(actual).toEqual(desired);
    });
    it('game reducer returns non mutated object', () => {
        const state = { some: 'value' };
        deepFreeze(state);
        const actual = gameReducer(state, { type: null, payload: 'empty' });
        const desired = { some: 'value' };
        expect(actual).toEqual(desired);
    });
});
