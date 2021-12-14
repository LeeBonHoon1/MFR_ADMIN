import dateformat from 'dateformat';

export const filterDate = (dateStr) => {
  const y = dateStr.substr(0, 4);
  const m = dateStr.substr(4, 2);
  const d = dateStr.substr(6, 2);

  return dateformat(new Date(`${y}-${m}-${d}`), 'yyyy-mm-dd');
}

export const filterLongText = (str, num=10) => {
  if(typeof str !== 'string') return str;

  if(str.length > num) {
    return str.substring(0, num) + '...';
  } else {
    return str;
  }
}