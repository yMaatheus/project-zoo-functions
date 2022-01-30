const { employees, species } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function getEmployeeByName(name) {
  return name !== undefined ? employees
    .find(({ firstName, lastName }) => firstName === name || lastName === name) || null : null;
}

function getEmployeeById(id) {
  return id !== undefined ? employees
    .find(({ id: employeeId }) => employeeId === id) || null : null;
}

function getSpecies(responsibleFor) {
  return species.reduce((acc, specie) => {
    if (responsibleFor.includes(specie.id)) {
      acc.names.push(specie.name);
      acc.locations.push(specie.location);
    }
    return acc;
  }, { names: [], locations: [] });
}

function getEmployeesCoverage(object) {
  if (typeof object === 'object') {
    if (getEmployeeByName(object.name) !== null) {
      const { id, firstName, lastName, responsibleFor } = getEmployeeByName(object.name);
      const { names, locations } = getSpecies(responsibleFor);
      return { id, fullName: `${firstName} ${lastName}`, species: names, locations };
    }
    if (getEmployeeById(object.id) !== null) {
      const { id, firstName, lastName, responsibleFor } = getEmployeeById(object.id);
      const { names, locations } = getSpecies(responsibleFor);
      return { id, fullName: `${firstName} ${lastName}`, species: names, locations };
    }
    throw new Error('Informações inválidas');
  }
  return employees.map(({ id, firstName, lastName, responsibleFor }) => {
    const { names, locations } = getSpecies(responsibleFor); // { names: [], locations: [] }
    return { id, fullName: `${firstName} ${lastName}`, species: names, locations };
  });
}

module.exports = getEmployeesCoverage;
