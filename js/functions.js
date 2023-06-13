function checksLengthString(checkString, maxLength) {
  if (checkString.length <= maxLength) {
    return true;
  } return false;
}
checksLengthString('проверяемая строка', 20);
checksLengthString('проверяемая строка', 10);
checksLengthString('проверяемая строка', 5);


function checksPalindrome(string) {
  const normalaseString = string.replaceAll(' ', '').toUpperCase();
  let newString = '';
  for (let i = normalaseString.length - 1; i >= 0; i--) {
    newString += normalaseString[i];
  }
  if (normalaseString === newString) {
    return true;
  } return false;
}
checksPalindrome('Лёша на полке клопа нашёл ');
checksPalindrome('дерево ');


function extractsDigits(string) {
  string = string.toString();
  let newString = '';
  for (let i = 0; i < string.length; i++) {
    const parse = Number.isNaN(parseInt(string[i], 10));
    if (parse === false) {
      newString += string[i];
    }
  }
  return (parseInt(newString, 10));
}
extractsDigits('-jhjh001.6');
