const formatDate = (date) => {
  let d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();
  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;
  return [year, month, day].join('-');
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function serializeObject(obj) {
  let str = [];
  for (let prop in obj)
    if (Object.prototype.hasOwnProperty.call(obj, prop)) {
      str.push(encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]));
    }
  return '?' + str.join('&');
}

export { formatDate, capitalizeFirstLetter, serializeObject };
