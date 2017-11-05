/* Fisher-Yates shuffle algorithm.
Math.random gives a number between 0-0.9999999, so the multiplied
result of it and current index gives a number lower than current index.
Math.floor then rounds down to the closest integer.
The rearrangement is then done so that the value in the current index is
stored in a temporary variable, before it is assigned the random value.
The random index is then assigned the previous value of the current index, stored
in the temporary variable.
In this way the current index has switched position with some of the other.
*/
function shuffleArray(array) {
    const MATHFLOOR = Math.floor;
    const MATHRAND = Math.random;
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i -= 1) {
        const j = MATHFLOOR(MATHRAND() * (i + 1));
        const temp = shuffled[i];
        shuffled[i] = shuffled[j];
        shuffled[j] = temp;
    }
    return shuffled;
}
export default shuffleArray;
