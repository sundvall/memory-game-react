const FOO = 'FOO';

// function gameActionCreator() {
//     console.log('foo:gameActionCreator');
//     return dispatch => dispatch({ type: FOO });
// }

function gameActionCreator(payload = []) {
    return dispatch => dispatch({
            type: FOO,
            payload,
        });
}

function reducer(state = {}, { type, payload }) {
    switch (type) {
        case FOO:
            return { ...state, ...payload };
        default:
            return state;
    }
}
export { gameActionCreator };
export default reducer;
