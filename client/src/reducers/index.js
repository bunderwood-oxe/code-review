import { combineReducers } from '@reduxjs/toolkit';
import connectionStatus from './connectionStatus';
import roomStates from './roomState';

export default combineReducers({
    connectionStatus,
    roomStates,
});
