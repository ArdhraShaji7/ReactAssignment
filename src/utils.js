
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
      new Date(a.dateOfTransaction) -
      new Date(b.dateOfTransaction)
  );
};

export const getReward = (cusTransDetails) => {
  return cusTransDetails.reduce((acc, transaction) => {
    const date = new Date(transaction.dateOfTransaction);

    const month = date.toLocaleString("default", {
      month: "long",
    });

    const year = date.getFullYear();

    const points = rewardCalculator(
      transaction.amountPaid
    );

    const key = `${transaction.cusId}-${month}-${year}`;

    if (!acc[key]) {
      acc[key] = {
        customerId: transaction.cusId,
        customerName: transaction.cusName,
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
    const points = rewardCalculator(
      transaction.amountPaid
    );

    if (!acc[transaction.cusId]) {
      acc[transaction.cusId] = {
        customerName: transaction.cusName,
        rewardPoints: 0,
      };
    }

    acc[transaction.cusId].rewardPoints += points;

    return acc;
  }, {});
};

