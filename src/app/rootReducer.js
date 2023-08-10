import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import counterReducer from '../features/menu/counterSlice';
import userDataReducer from '../features/user/userData';

const counterPersistConfig = {
  key: 'counter',
  storage,
};

const userDataPersistConfig = {
  key: 'userData',
  storage,
};

const persistedCounterReducer = persistReducer(counterPersistConfig, counterReducer);
const persistedUserDataReducer = persistReducer(userDataPersistConfig, userDataReducer);

const rootReducer = combineReducers({
  counter: persistedCounterReducer,
  userData: persistedUserDataReducer,
});

export default rootReducer;
