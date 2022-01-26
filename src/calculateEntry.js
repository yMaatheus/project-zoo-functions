const data = require('../data/zoo_data');

function countEntrants(entrants) {
  return entrants.reduce((acc, entrant) => {
    if (entrant.age < 18) {
      acc.child += 1;
      return acc;
    } if (entrant.age < 50) {
      acc.adult += 1;
      return acc;
    }
    acc.senior += 1;
    return acc;
  }, { adult: 0, child: 0, senior: 0 });
}

function calculateEntry(entrants) {
  if (!Array.isArray(entrants)) {
    return 0;
  }
  const count = Object.entries(countEntrants(entrants));
  return count.reduce((acc, [typeEntrant, countEntrant]) =>
    acc + data.prices[typeEntrant] * countEntrant, 0);
}

module.exports = { calculateEntry, countEntrants };
