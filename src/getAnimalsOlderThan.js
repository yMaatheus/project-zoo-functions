const data = require('../data/zoo_data');

function getAnimalsOlderThan(animal, age) {
  return data.species.reduce((acc, { name, residents }) =>
    (name === animal ? acc.concat(residents) : acc), [])
    .every(({ age: residentAge }) => residentAge > age);
}

module.exports = getAnimalsOlderThan;
