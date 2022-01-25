const data = require('../data/zoo_data');

function isManager(id) {
  return data.employees.some(({ managers }) => managers.includes(id));
}

function getRelatedEmployees(managerId) {
  if (!isManager(managerId)) {
    throw new Error('O id inserido não é de uma pessoa colaboradora gerente!');
  }
  return data.employees.reduce((acc, { firstName, lastName, managers }) =>
    (managers.includes(managerId) ? acc.concat([`${firstName} ${lastName}`]) : acc), []);
}

module.exports = { isManager, getRelatedEmployees };
