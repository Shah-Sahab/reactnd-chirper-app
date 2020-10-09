import { combineReducers } from 'redux';
import authedUsers from './authedUser';
import tweets from './tweets';
import users from './users';
import { loadingBarReducer } from 'react-redux-loading';

export default combineReducers({
    authedUsers,
    users,
    tweets,
    loadingBar: loadingBarReducer
});