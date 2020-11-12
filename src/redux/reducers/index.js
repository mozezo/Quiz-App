import QuizReducer from './quiz';
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage';

import { combineReducers } from "redux";

const pesistConfig = {
    key: 'root',
    storage,
    whitelist: ['quiz']
  }

const rootReducer = combineReducers({
    quiz: QuizReducer
});

export default persistReducer(pesistConfig, rootReducer);