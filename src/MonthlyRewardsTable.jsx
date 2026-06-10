import React from "react";
function MonthlyRewardsTable({ rewards }) {
  return (
    <>
      <h2>User Monthly Rewards</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Customer Id</th>
            <th>Name</th>
            <th>Month</th>
            <th>Year</th>
            <th>Reward Points</th>
          </tr>
        </thead>

        <tbody>
          {Object.values(rewards)
            .sort((a, b) => {
              if (a.year !== b.year) {
                return a.year - b.year;
              }

              const monthA = new Date(`${a.month} 1, ${a.year}`).getMonth();
              const monthB = new Date(`${b.month} 1, ${b.year}`).getMonth();

              if (monthA !== monthB) {
                return monthA - monthB;
              }

              return a.customerId - b.customerId;
            })
            .map((reward) => (
              <tr key={`${reward.customerId}-${reward.month}-${reward.year}`}>
                <td>{reward.customerId}</td>
                <td>{reward.customerName}</td>
                <td>{reward.month}</td>
                <td>{reward.year}</td>
                <td>{reward.rewardPoints}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </>
  );
}

export default MonthlyRewardsTable;
