export function capitaliaze(word) {
  return word ? word[0].toUpperCase() + word.substring(1).toLowerCase() : "";
  // if (!word) return "";
  // return word[0].toUpperCase() + word.substring(1).toLowerCase();
}
