const data = require('../data/zoo_data');

function countEntrants(entrants) {
  const object = { adult: 0, child: 0, senior: 0 };
  entrants.forEach((entrant) => {
    if (entrant.age < 18) {
      object.child += 1;
    } else if (entrant.age < 50) {
      object.adult += 1;
    } else {
      object.senior += 1;
    }
  });
  return object;
}

function calculateEntry(entrants) {
  if (!Array.isArray(entrants)) {
    return 0;
  }
  const count = Object.entries(countEntrants(entrants));
  return count.reduce((acc, current) => acc + data.prices[current[0]] * current[1], 0);
}

module.exports = { calculateEntry, countEntrants };
