import { createStore, combineReducers } from 'redux';
import users, { gotUsers, gotNewUser } from './users';
import messages, { gotMessages, gotNewMessage } from './messages';
import user, { gotUser } from './user';

let navigate;
const reducers = combineReducers({ users, messages, user });
const store = createStore(reducers);

export default store;
export * from './users';
export * from './messages';