import authReducer from './authReducer';
import broadcastReducer from "./broadcastReducer";
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const rootReducer = combineReducers({
   auth: authReducer,
   broadcast: broadcastReducer,
   firestore: firestoreReducer,
   firebase: firebaseReducer
});

export default rootReducer