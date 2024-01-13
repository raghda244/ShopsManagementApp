import { combineReducers } from 'redux';
import shopReducer from './reducers/shopReducers';

export default combineReducers({
  shops: shopReducer
});
