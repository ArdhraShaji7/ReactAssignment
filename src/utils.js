import moment from 'moment';

export const fetchTransactionData = (cusTransDetails) => {
  return Promise.resolve(cusTransDetails);
};

export const rewardCalculator = (amountPaid) => {
  const amount = Math.floor(amountPaid);

  if (amount <= 50) {
    return 0;
  }

  if (amount <= 100) {
    return amount - 50;
  }

  return 50 + (amount - 100) * 2;
};

export const sortTransDate = (cusTransDetails) => {
  return [...cusTransDetails].sort(
    (a, b) =>
      moment(a.dateOfTransaction, 'MMM-DD-YYYY').valueOf() -
      moment(b.dateOfTransaction, 'MMM-DD-YYYY').valueOf()
  );
};

export const getReward = (cusTransDetails) => {
  return cusTransDetails.reduce((acc, transaction) => {
    const date = moment(transaction.dateOfTransaction, 'MMM-DD-YYYY');

    const month = date.format('MMMM');
    const year = date.format('YYYY');

    const points = rewardCalculator(transaction.amountPaid);

    const key = `${transaction.customerId}-${month}-${year}`;

    if (!acc[key]) {
      acc[key] = {
        customerId: transaction.customerId,
        customerName: `${transaction.firstName} ${transaction.lastName}`,
        month,
        year,
        rewardPoints: 0,
      };
    }

    acc[key].rewardPoints += points;

    return acc;
  }, {});
};

export const getTotalReward = (cusTransDetails) => {
  return cusTransDetails.reduce((acc, transaction) => {
    const points = rewardCalculator(transaction.amountPaid);

    if (!acc[transaction.customerId]) {
      acc[transaction.customerId] = {
        customerName: `${transaction.firstName} ${transaction.lastName}`,
        rewardPoints: 0,
      };
    }

    acc[transaction.customerId].rewardPoints += points;

    return acc;
  }, {});
};
