import monthList from './monthList';

const dateFormatter = {
  inFull: (date: Date): string => {
    const newDate = new Date(date);
    const day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
    const month = monthList[newDate.getMonth()];
    const year = newDate.getFullYear();
    return `${day} ${month} ${year}`;
  },
  inFullWithTime: (date: Date): string => {
    const newDate = new Date(date);
    const day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
    const month = monthList[newDate.getMonth()];
    const year = newDate.getFullYear();
    const hours = newDate.getHours() > 9 ? newDate.getHours() : '0' + newDate.getHours();
    const minutes = newDate.getMinutes() > 9 ? newDate.getMinutes() : '0' + newDate.getMinutes();
    return `${day} ${month} ${year} ${hours}:${minutes}`;
  },
  ddMMyyyy: (date: Date): string => {
    const newDate = new Date(date);
    const day = newDate.getDate() > 9 ? newDate.getDate() : '0' + newDate.getDate();
    const month = newDate.getMonth() > 8 ? newDate.getMonth() + 1 : '0' + (newDate.getMonth() + 1);
    const year = newDate.getFullYear();
    return `${day}/${month}/${year}`;
  },
};

export default dateFormatter;
