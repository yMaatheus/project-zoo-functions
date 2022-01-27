const { species, hours } = require('../data/zoo_data');
const data = require('../data/zoo_data');

function isSpecie(arg) {
  return species.some(({ name }) => name === arg);
}

function isDay(arg) {
  return Object.keys(hours).includes(arg);
}

function getFindDay(scheduleTarget) {
  return Object.entries(hours).find(([day]) => day === scheduleTarget)
    .reduce((acc, { open, close }) => {
      if (open === 0 && close === 0) {
        acc[scheduleTarget].officeHour = 'CLOSED';
        acc[scheduleTarget].exhibition = 'The zoo will be closed!';
      } else {
        acc[scheduleTarget].officeHour = `Open from ${open}am until ${close}pm`;
      }
      return acc;
    }, { [scheduleTarget]: { officeHour: '', exhibition: [] } });
}

function createHours() {
  return Object.entries(hours)
    .reduce((acc, [day, { open, close }]) => {
      if (open === 0 && close === 0) {
        acc[day] = { officeHour: 'CLOSED', exhibition: 'The zoo will be closed!' };
      } else {
        acc[day] = { officeHour: `Open from ${open}am until ${close}pm`, exhibition: [] };
      }
      return acc;
    }, {});
}

function getSchedule(scheduleTarget) {
  if (isSpecie(scheduleTarget)) {
    return species.find(({ name }) => name === scheduleTarget).availability;
  }
  if (isDay(scheduleTarget)) {
    const day = getFindDay(scheduleTarget);
    species.forEach(({ name, availability }) => (availability.includes(scheduleTarget)
      ? day[scheduleTarget].exhibition.push(name) : undefined));
    return day;
  }
  const days = createHours();
  species.forEach(({ name, availability }) =>
    availability.forEach((day) => days[day].exhibition.push(name)));
  return days;
}

module.exports = getSchedule;
