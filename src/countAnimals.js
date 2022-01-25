const data = require('../data/zoo_data');

function countAnimals(animal) {
  const { species } = data;
  if (typeof animal === 'object') {
    const specieName = animal.specie;
    const animalSex = animal.sex;
    const specieResidents = data.species.find(({ name }) => specieName === name).residents;
    return specieResidents.reduce((acc, { sex }) =>
      (animalSex === undefined || sex === animalSex ? acc + 1 : acc), 0);
  }
  const objectExit = {};
  species.forEach(({ name, residents }) =>
    (Object.assign(objectExit, { [name]: residents.reduce((count) => count + 1, 0) })));
  return objectExit;
}

module.exports = countAnimals;
