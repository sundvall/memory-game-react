// Function selects a random number up to and including 'FFFFFF', since 16777215 is
// 'FFFFFFF' and Math.random() requires an extra '+1' to include the full value.
// toString parses the integer from Math.floor to a string, using the base of 16.
//
// random color generator from
// https://www.paulirish.com/2009/random-hex-color-code-snippets/
const randomColor = () =>
    `#${  Math.floor(Math.random() * (16777215 + 1)).toString(16)}`;

function generateValues(num = 1) {
    const vals = [];
    for(let i=0; i<=num; i+=1) {
        const value = randomColor();
        vals.push(value);
        vals.push(value);
    }
    return vals;
}
export default generateValues;
