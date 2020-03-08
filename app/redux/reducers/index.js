import userReducer from './user';
import settingReducer from './settings';
import { combineReducers } from 'redux';


const allReducers = combineReducers({
    user: userReducer,
    settings:settingReducer
});

export default allReducers;