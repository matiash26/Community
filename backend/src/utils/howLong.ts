import { DateTime } from 'luxon';
function howLong(db: string) {
  const dateFromDB = DateTime.fromJSDate(new Date(db));
  //   const dateFromDB = DateTime.fromISO(db);
  const currentDate = DateTime.now();
  const differOfTime = currentDate.diff(dateFromDB);
  if (differOfTime.as('months') >= 1) {
    return `${differOfTime.as('months').toFixed(0)} mês(es)`;
  } else if (differOfTime.as('days') >= 1) {
    return `${differOfTime.as('days').toFixed(0)} dia(s)`;
  } else if (differOfTime.as('hours') >= 1) {
    return `${differOfTime.as('hours').toFixed(0)} hora(s)`;
  } else if (differOfTime.as('minutes') >= 1) {
    return `${differOfTime.as('minutes').toFixed(0)} minuto(s)`;
  } else {
    return `${differOfTime.as('seconds').toFixed(0)} segundo(s)`;
  }
}
export default howLong;
