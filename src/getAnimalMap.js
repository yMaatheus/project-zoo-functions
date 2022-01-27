const { species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function callback(options, specieName) {
  return (animalAcc, { name: animalName, sex: animalSex }) => {
    if (!Object.keys(animalAcc).includes(specieName)) {
      Object.assign(animalAcc, { [specieName]: [] });
    }
    if (options.sex === undefined || options.sex === animalSex) {
      animalAcc[specieName].push(animalName);
      if (options.sorted !== undefined) {
        animalAcc[specieName].sort();
      }
    }
    return animalAcc;
  };
}

function createAnimalMap(options) {
  return species.reduce((acc, { name: specieName, location, residents }) => {
    if (!Object.keys(acc).includes(location)) {
      Object.assign(acc, { [location]: [] });
    }
    acc[location].push(residents.reduce(callback(options, specieName), {}));
    return acc;
  }, {});
}

function getAnimalMap(options) {
  if (typeof options === 'object' && Object.keys(options).includes('includeNames')) {
    return createAnimalMap(options);
  }
  return species.reduce((acc, { name, location }) => {
    if (!Object.keys(acc).includes(location)) {
      Object.assign(acc, { [location]: [] });
    }
    acc[location].push(name);
    return acc;
  }, {});
}

module.exports = getAnimalMap;
