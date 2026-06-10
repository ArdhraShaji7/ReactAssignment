import {
rewardCalculator,
sortTransDate,
getReward,
getTotalReward,
} from "./utils";

describe("rewardCalculator", () => {
test("returns 0 for amounts less than or equal to 50", () => {
expect(rewardCalculator(50)).toBe(0);
expect(rewardCalculator(40)).toBe(0);
});

test("returns 1 point per dollar between 50 and 100", () => {
expect(rewardCalculator(75)).toBe(25);
expect(rewardCalculator(100)).toBe(50);
});

test("returns 2 points per dollar over 100 plus 50 base points", () => {
expect(rewardCalculator(120)).toBe(90);
expect(rewardCalculator(150)).toBe(150);
});

test("handles decimal values correctly", () => {
expect(rewardCalculator(100.2)).toBe(50);
expect(rewardCalculator(100.4)).toBe(50);
expect(rewardCalculator(120.9)).toBe(90);
});
});

describe("sortTransDate", () => {
test("sorts transactions by date ascending", () => {
const data = [
{ dateOfTransaction: "08-17-2025" },
{ dateOfTransaction: "06-15-2025" },
{ dateOfTransaction: "07-08-2025" },
];

```
const sorted = sortTransDate(data);

expect(sorted[0].dateOfTransaction).toBe("06-15-2025");
expect(sorted[1].dateOfTransaction).toBe("07-08-2025");
expect(sorted[2].dateOfTransaction).toBe("08-17-2025");
```

});

test("does not mutate original array", () => {
const data = [
{ dateOfTransaction: "08-17-2025" },
{ dateOfTransaction: "06-15-2025" },
];

```
const original = [...data];

sortTransDate(data);

expect(data).toEqual(original);
```

});
});

describe("getReward", () => {
test("aggregates rewards by customer, month and year", () => {
const data = [
{
cusId: 101,
cusName: "Jane",
amountPaid: 120,
dateOfTransaction: "06-15-2025",
},
{
cusId: 101,
cusName: "Jane",
amountPaid: 80,
dateOfTransaction: "06-20-2025",
},
];

```
const rewards = getReward(data);

expect(Object.values(rewards)[0].rewardPoints).toBe(120);
```

});

test("separates same month across different years", () => {
const data = [
{
cusId: 101,
cusName: "Jane",
amountPaid: 120,
dateOfTransaction: "06-15-2024",
},
{
cusId: 101,
cusName: "Jane",
amountPaid: 120,
dateOfTransaction: "06-15-2025",
},
];

```
const rewards = getReward(data);

expect(Object.keys(rewards).length).toBe(2);
```

});
});

describe("getTotalReward", () => {
test("aggregates rewards per customer", () => {
const data = [
{
cusId: 101,
cusName: "Jane",
amountPaid: 120,
},
{
cusId: 101,
cusName: "Jane",
amountPaid: 80,
},
];

```
const rewards = getTotalReward(data);

expect(rewards[101].rewardPoints).toBe(120);
```

});

test("handles multiple customers", () => {
const data = [
{
cusId: 101,
cusName: "Jane",
amountPaid: 120,
},
{
cusId: 102,
cusName: "Ruby",
amountPaid: 150,
},
];

```
const rewards = getTotalReward(data);

expect(rewards[101].rewardPoints).toBe(90);
expect(rewards[102].rewardPoints).toBe(150);
```

});
});
