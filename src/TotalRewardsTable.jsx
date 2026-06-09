import React from "react";


function TotalRewardsTable({ rewards }) {
  return (
    <>
      <h2>Total Rewards</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Reward Points</th>
          </tr>
        </thead>

        <tbody>
          {Object.values(rewards).map((reward) => (
            <tr key={reward.customerName}>
              <td>{reward.customerName}</td>
              <td>{reward.rewardPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default TotalRewardsTable;
