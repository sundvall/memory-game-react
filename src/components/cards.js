import generateValues from './values.js';

/* {
     row: 'i',
     col: 'j',
     value: 'values[v]',
     selected: false,
     selectable: true,
 } */

const cards = (num = 4) => {
    if (num % 2 || num < 4) {
        throw new Error(
            'cards.js: number of cards must be even and above two: num',
            num,
        );
    }
    const valuePairs = generateValues(num / 2);
    const withInfo = valuePairs.map((value, id) => ({
        id,
        value,
        selected: false,
        selectable: true,
    }));
    // console.log('cards:', withInfo);
    return withInfo;
};

export default cards;
