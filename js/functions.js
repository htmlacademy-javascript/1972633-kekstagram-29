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
