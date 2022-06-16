//Method To Check If Value is Null Or Empty
function isEmpty(value) {
  return !value || !value.trim();
}
// Method Take Word and Capitalize It
function capitalize(word) {
  if (word.length === 0) return ''
  return word.charAt(0).toUpperCase() + word.slice(1);
}

function capitalizeString(str) {
  return str.split(" ").map(item => capitalize(item)).join(' ')
}

function firstName(fullName) {
  return capitalize(('' + fullName).split(" ")[0])
}

module.exports.isEmpty = isEmpty;
module.exports.capitalize = capitalize;
module.exports.firstName = firstName;
module.exports.capitalizeString = capitalizeString;
