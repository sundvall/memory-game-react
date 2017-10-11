import { combineReducers } from 'redux';
import foo from '../ducks/foo.js';

const rootReducer = combineReducers({
    foo,
});

export default rootReducer;
