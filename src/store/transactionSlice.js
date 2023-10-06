// transactionSlice.js
import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transactions",
  initialState: {
    transactions: [
      {
        id: "1",
        type: "expense",
        date: "2023-10-05",
        category: "Groceries",
        name: "Bread",
        amount: 350,
      },
      {
        id: "2",
        type: "income",
        date: "2023-10-06",
        category: "Salary",
        name: "day-job-salary",
        amount: 1000,
      },
      {
        id: "3",
        type: "expense",
        date: "2023-10-07",
        category: "Other",
        name: "Tuition fee",
        amount: 10000,
      },
    ],
  },
  reducers: {
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
    updateTransaction: (state, action) => {
      const { id, data } = action.payload;
      const transactionIndex = state.transactions.findIndex(
        (transaction) => transaction.id === id
      );
      if (transactionIndex !== -1) {
        state.transactions[transactionIndex] = data;
      }
    },
    deleteTransaction: (state, action) => {
      state.transactions = state.transactions.filter(
        (transaction) => transaction.id !== action.payload
      );
    },
  },
});

export const { addTransaction, updateTransaction, deleteTransaction } =
  transactionSlice.actions;
export default transactionSlice.reducer;
