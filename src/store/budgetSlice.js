// budgetReducer.js
import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budgets',
  initialState: {
    budgets: [
      {
        id: 'march-2023',
        estimatedAmount: 20000,
        totalIncome: 0,
        totalExpenses: 0,
      },
      {
        id: 'january-2023',
        estimatedAmount: 30000,
        totalIncome: 0,
        totalExpenses: 0,
      }
    ],
  },
  reducers: {
    updateBudget: (state, action) => {
      const { id, data } = action.payload;
      const budgetIndex = state.budgets.findIndex((budget) => budget.id === id);
      if (budgetIndex !== -1) {
        state.budgets[budgetIndex] = data;
      }
    },
    updateTransaction: (state, action) => {
      const { id, data } = action.payload;
      const transactionIndex = state.transactions.findIndex((transaction) => transaction.id === id);
      if (transactionIndex !== -1) {
        state.transactions[transactionIndex] = data;
      }
    },
  },
});

export const { updatebudget } = budgetSlice.actions;
export default budgetSlice.reducer;
