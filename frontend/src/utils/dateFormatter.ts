import monthList from './monthList';

const dateFormatter = {
  inFull: (date: Date): string => {
    const day = date.getDate() > 9 ? date.getDate() : '0' + date.getDate();
    const month = monthList[date.getMonth()];
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  },
};

export default dateFormatter;
