# Customer Rewards Dashboard

## Overview

This React application calculates and displays customer reward points based on their purchase transactions.

The application:

* Displays all customer transactions.
* Calculates reward points for each transaction.
* Shows monthly reward totals per customer.
* Shows total reward points earned by each customer.

## Reward Calculation Rules

A customer receives:

* 2 points for every dollar spent over $100.
* 1 point for every dollar spent between $50 and $100.
* No points for purchases of $50 or less.

### Examples

| Purchase Amount | Reward Points |
| --------------- | ------------- |
| $40             | 0             |
| $75             | 25            |
| $100            | 50            |
| $120            | 90            |
| $150            | 150           |

## Features

* React functional components
* React Hooks (useState, useEffect)
* Simulated asynchronous API call
* Loading and error handling
* Monthly reward aggregation
* Total reward aggregation
* Transaction sorting by date
* Reusable components
* Unit tests using Jest

## Project Structure

src/
├── App.jsx
├── App.css
├── TransactionData.js
├── utils.js
├── TransactionsTable.jsx
├── MonthlyRewardsTable.jsx
├── TotalRewardsTable.jsx
└── index.js

## Installation

Install dependencies:

```bash
npm install
```

Start the application:

```bash
npm start
```

## Running Tests

```bash
npm test
```

## Assumptions

* Transaction data is provided through a mock data source.
* Reward calculations use whole-dollar values.
* Transactions are grouped by customer, month, and year.
* Dates are stored in MM-DD-YYYY format.

## Future Improvements

* Add filtering and search capabilities.
* Add charts and analytics.
* Connect to a real backend API.
* Improve responsiveness for mobile devices.
