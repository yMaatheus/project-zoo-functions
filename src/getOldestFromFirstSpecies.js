const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getOldestFromFirstSpecies(id) {
  const employee = employees.find(({ id: employeeID }) => employeeID === id);
  const firstSpecieID = employee.responsibleFor[0];
  const specie = species.find(({ id: specieID }) => specieID === firstSpecieID);
  const oldestAnimal = specie.residents.reduce((acc, animal) =>
    (animal.age > acc.age ? animal : acc));
  return Object.values(oldestAnimal);
}

module.exports = getOldestFromFirstSpecies;
