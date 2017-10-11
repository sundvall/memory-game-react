const FOO = 'FOO';

// function fooActionCreator() {
//     console.log('foo:fooActionCreator');
//     return dispatch => dispatch({ type: FOO });
// }

function fooActionCreator(payload = []) {
    console.log('fooActionCreator');
    return dispatch => {
        console.log('dispatching');
        return dispatch({
            type: FOO,
            payload,
        });
    };
}

function reducer(state = {}, { type, payload }) {
    switch (type) {
        case FOO:
            return { ...state, ...payload };
        default:
            return state;
    }
}
export { fooActionCreator };
export default reducer;
