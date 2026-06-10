import React from "react";
import { useEffect, useState } from 'react';
import cusTransDetails from './TransactionData';
import "./App.css";

import {
  fetchTransactionData,
  sortTransDate,
  getReward,
  getTotalReward,
} from './utils';

import TransactionsTable from './TransactionsTable.jsx';
 import MonthlyRewardsTable from './MonthlyRewardsTable.jsx';
import TotalRewardsTable from './TotalRewardsTable.jsx';
function App() {
  const [state, setState] = useState({
    transactions: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await fetchTransactionData(cusTransDetails);

        setState({
          transactions: sortTransDate(response),
          loading: false,
          error: '',
        });
      } catch {
        setState({
          transactions: [],
          loading: false,
          error: 'Failed to load transactions',
        });
      }
    };

     loadTransactions();
  }, []);

  if (state.loading) {
    return <h2>Loading...</h2>;
  }

  if (state.error) {
    return <h2>{state.error}</h2>;
  }

  const monthlyRewards = getReward(state.transactions);

  const totalRewards = getTotalReward(state.transactions);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Customer Rewards Dashboard</h1>

      <TransactionsTable cusTransDetails={state.transactions} />

    <br />

     <MonthlyRewardsTable rewards={monthlyRewards} />

   <br />

      <TotalRewardsTable rewards={totalRewards} />
    </div>
  );
}

export default App;
