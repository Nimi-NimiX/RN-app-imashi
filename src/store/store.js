  // store.js
import { configureStore } from '@reduxjs/toolkit';
import budgetSlice from './budgetSlice';
import transactionSlice from './transactionSlice';

// combine two reducers into single store object
const rootReducer = {
  transactions: transactionSlice,
  budgets: budgetSlice
};

const store = configureStore({
    // this method automatically calls 'combineReducers ()'
  reducer: rootReducer,
});

export default store;
