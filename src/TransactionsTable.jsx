import React from 'react';

import { rewardCalculator } from './utils';

function TransactionsTable({ cusTransDetails }) {
  return (
    <div>
      <h2>Transactions</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Transaction Id</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product</th>
            <th>Price</th>
            <th>Reward Points</th>
          </tr>
        </thead>

        <tbody>
          {cusTransDetails.map((transaction) => (
            <tr key={transaction.transactionId}>
              <td>{transaction.transactionId}</td>
              <td>{`${transaction.firstName} ${transaction.lastName}`}</td>
              <td>{transaction.dateOfTransaction}</td>
              <td>{transaction.product}</td>
              <td>${transaction.amountPaid.toFixed(2)}</td>
              <td>{rewardCalculator(transaction.amountPaid)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionsTable;
