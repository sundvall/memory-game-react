/* eslint-disable import/no-extraneous-dependencies, import/no-unresolved, import/extensions */

import React from 'react';
import { storiesOf } from '@storybook/react';
import Board from './Board.js';
import '../scss/style.css';
// 'quick' way to switch background color, in absence of better solution
document.querySelector('body').style.background = 'white';

const onClick = () => {
    console.log('amount-input.stories:onClick');
};
const onChange = e => {
    console.log('amount-input.stories:onChange', e.target.value);
};
const onUkFirstDeposit = e => {
    console.log('amount-input.stories:onUkFirstDeposit', e.target.value);
};
const pairs = 8;
const cards = [];
const colums = 4;
// pairs: a a b b c c ... y y
// cards.length = pairs * 2
// create array like :  [{a 1},{a 2},{b 3},{b 4},{b 5},{b 6},...{X N-3},{X N-2},{Y N-1},{Y N}]
for (let i = 0; i < pairs * 2; i += 2) {
    cards.push({ value: i, id: i });
    cards.push({ value: i, id: i + 1 });
}
const values = [
    '#3be6c4',
    '#e6e03b',
    '#6f3be6',
    '#4fe63b',
    '#e63b3b',
    '#ff5a00',
    '#ff00de',
    '#3b8fe6',
];

const createCards = (rows = 4, cols = 4, values) => {
    /* one card per position, each card-value is a duplicate of another */
    // let i,
    //     j,
    //     card,
    //     v = 0,
    //     items = [];
    // rows = p.rows,
    // cols = p.cols,
    // values = p.values;
    // card_at_position = {};
    // for (row = 0; row < rows; row += 1) {
    //     card_at_position[row] = {};
    //     for (col = 0; col < cols; col += 1) {
    //         card = {
    //             row,
    //             col,
    //             value: values[v],
    //             selected: false,
    //             selectable: true,
    //         };
    //         /* store card in array and also by position */
    //         items.push(card);
    //         card_at_position[row][col] = card;
    //         /* select new value for card by looping the array of possible values */
    //         v = cycleArr(values, v);
    //     }
    // }
    // return items;
};
const shuffleArray = function(array) {
    /* Fisher-Yates shuffle algorithm. */
    let i,
        j,
        temp,
        MATHFLOOR = Math.floor,
        MATHRAND = Math.random,
        shuffled = [];
    for (i = array.length - 1; i > 0; i -= 1) {
        j = MATHFLOOR(MATHRAND() * (i + 1));
        temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
};

storiesOf('Board', module)
    .add('props view', () => (
        <Board
            placeholder="placeholder"
            amount="amount"
            onClick={onClick}
            onChange={onChange}
            feedbackTxt="feedbackTxt"
            onUkFirstDeposit={onUkFirstDeposit}
            hasError
            cols={colums}
            cards={cards}
        />
    ))
    .add('confirmation view', () => (
        <Board
            confirmreset
            placeholder="placeholder"
            amount="amount"
            onClick={onClick}
            onChange={onChange}
            feedbackTxt="feedbackTxt"
            onUkFirstDeposit={onUkFirstDeposit}
            hasError
            cols={4}
            cards={cards}
        />
    ));
