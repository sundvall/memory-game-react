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
// pairs: a a b b c c ... y y
// cards.length = pairs * 2
// create array like :  [{a 1},{a 2},{b 3},{b 4},{b 5},{b 6},...{X N-3},{X N-2},{Y N-1},{Y N}]
for(let i=0; i<pairs*2; i+=2){
    cards.push({value:i, id:i});
    cards.push({value:i, id:i+1});
}

storiesOf('Board', module)
	.add('props view', () =>
		<Board
			placeholder="placeholder"
			amount="amount"
			onClick={onClick}
			onChange={onChange}
			feedbackTxt="feedbackTxt"
			onUkFirstDeposit={onUkFirstDeposit}
			hasError
            cols = {4}
            cards = {cards}
		/>
	).add('confirmation view', () =>
		<Board
			confirmreset
			placeholder="placeholder"
			amount="amount"
			onClick={onClick}
			onChange={onChange}
			feedbackTxt="feedbackTxt"
			onUkFirstDeposit={onUkFirstDeposit}
			hasError
            cols = {4}
            cards = {cards}
		/>
	);
