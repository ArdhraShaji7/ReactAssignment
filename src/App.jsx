import React, { useEffect, useState } from 'react';
import cusTransDetails from './TransactionData';
import moment from 'moment';
import './App.css';

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
    loading: false,
    error: '',
  });

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dateError, setDateError] = useState('');

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const response = await fetchTransactionData(cusTransDetails);

        const sortedTransactions = sortTransDate(response);
        const latestTransaction =
          sortedTransactions[sortedTransactions.length - 1];
        const latestDate = moment(
          latestTransaction.dateOfTransaction,
          'MMM-DD-YYYY'
        );

        setStartDate(latestDate.clone().startOf('month').format('YYYY-MM-DD'));
        setEndDate(latestDate.clone().endOf('month').format('YYYY-MM-DD'));
        setState({
          transactions: sortedTransactions,
          loading: false,
          error: '',
        });
      } catch (error) {
        setState({
          transactions: [],
          loading: false,
          error: error.message,
        });
      }
    };

    loadTransactions();
  }, []);

  const validateDateRange = (start, end) => {
    if (!start || !end) {
      return true;
    }

    const days = moment(end).diff(moment(start), 'days');

    if (days > 90) {
      setDateError('Please select a date range within 90 days');
      return false;
    }

    setDateError('');
    return true;
  };

  const handleStartDateChange = (value) => {
    if (validateDateRange(value, endDate)) {
      setStartDate(value);
    }
  };

  const handleEndDateChange = (value) => {
    if (validateDateRange(startDate, value)) {
      setEndDate(value);
    }
  };

  if (state.loading) {
    return <h2>Loading...</h2>;
  }

  if (state.error) {
    return <h2>{state.error}</h2>;
  }

  const filteredTransactions = state.transactions.filter((transaction) => {
    const transactionDate = moment(
      transaction.dateOfTransaction,
      'MMM-DD-YYYY'
    );

    return transactionDate.isBetween(startDate, endDate, 'day', '[]');
  });
  const hasData = filteredTransactions.length > 0;
  const monthlyRewards = getReward(filteredTransactions);
  const totalRewards = getTotalReward(filteredTransactions);

  return (
    <div className="container">
      <div className="dashboard-header">
        <h1>Customer Rewards Dashboard</h1>
      </div>

      <div className="date-filter">
        <label>Start Date:</label>
        <input
          type="date"
          value={startDate}
          max={moment().format('YYYY-MM-DD')}
          onChange={(e) => handleStartDateChange(e.target.value)}
        />

        <input
          type="date"
          value={endDate}
          max={moment().format('YYYY-MM-DD')}
          onChange={(e) => handleEndDateChange(e.target.value)}
        />
      </div>

      {dateError && <p className="error-message">{dateError}</p>}

      <div className="card">
        {hasData ? (
          <TransactionsTable cusTransDetails={filteredTransactions} />
        ) : (
          <p>No transactions found for the selected date range.</p>
        )}
      </div>
      <div className="card">
        {hasData ? (
          <MonthlyRewardsTable rewards={monthlyRewards} />
        ) : (
          <p>No reward data available for the selected date range.</p>
        )}
      </div>

      <div className="card">
        {hasData ? (
          <TotalRewardsTable rewards={totalRewards} />
        ) : (
          <p>No reward data available for the selected date range.</p>
        )}
      </div>
    </div>
  );
}

export default App;
