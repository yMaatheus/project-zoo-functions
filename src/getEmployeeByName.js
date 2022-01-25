const data = require('../data/zoo_data');

function getEmployeeByName(employeeName) {
  return data.employees
    .find(({ firstName, lastName }) => firstName === employeeName || lastName === employeeName)
    || {}; // Se o find for undefined(falsy) então será: {}
}

module.exports = getEmployeeByName;
