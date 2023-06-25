const checksLengthString = (checkString, maxLength) =>
  checkString.length <= maxLength;
checksLengthString('проверяемая строка', 20);
checksLengthString('проверяемая строка', 10);
checksLengthString('проверяемая строка', 5);


function checksPalindrome(string) {
  const normalaseString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = normalaseString.length - 1; i >= 0; i--) {
    newString += normalaseString[i];
  }
  return normalaseString === newString;
}
checksPalindrome('Лёша на полке клопа нашёл ');
checksPalindrome('дерево ');


function extractsDigits(string) {
  const numberString = Number.isFinite(string) ? string.toString() : string;
  let newString = '';
  for (let i = 0; i < numberString.length; i++) {
    const parse = Number.isNaN(parseInt(numberString[i], 10));
    if (!parse) {
      newString += numberString[i];
    }
  }
  return (parseInt(newString, 10));
}
extractsDigits('-jhjh001.6');

// eslint-disable-next-line no-return-assign
const getNumber = (string) => Number(string.replace(':', '.'));

const getWorkTime = (startDay, endDay, startMeet, timeMeet) => {
  // Переводим минуты в часы
  const newTime = timeMeet / 60;
  const durationMeet = getNumber(startMeet) + newTime;
  return (durationMeet <= getNumber(endDay) && durationMeet >= getNumber(startDay));
};

console.log(getWorkTime('08:00', '17:30', '14:00', 90)); // true
console.log(getWorkTime('8:0', '10:0', '8:0', 120)); // true
console.log(getWorkTime('08:00', '14:30', '14:00', 90));// false
console.log(getWorkTime('14:00', '17:30', '08:0', 90)); // false
console.log(getWorkTime('8:00', '17:30', '08:00', 900)); // false
