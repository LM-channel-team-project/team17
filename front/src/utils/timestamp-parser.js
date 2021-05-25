// Created by 오영롱(youngrongoh) on 2021/04/30
function getDays(style) {
  const days = {
    kor: ['일', '월', '화', '수', '목', '금', '토'],
    eng: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
  };

  return days[style];
}

function addZero(num) {
  return num < 10 ? `0${num}` : num;
}

function getMonths(style) {
  const months = {
    eng: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    engFull: [
      'January',
      'February',
      'March',
      'April',
      'May',
      'Jun',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ],
    kor: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
  };

  return months[style];
}

// Created by 오영롱(youngrongoh) on 2021/04/20
class TimestampParser {
  parseMonthIndex = (num, style) => {
    if (num > 11) throw new Error(`A number of months must be one of 0 to 11: ${num}`);

    const days = getMonths(style);

    return days[Number(num)];
  };

  parseDayIndex = (num, style) => {
    if (num > 6) throw new Error(`A number of days must be one of 0 to 6: ${num}`);

    const days = getDays(style);

    return days[Number(num)];
  };

  parseDate = (timestamp, options = {}) => {
    if (!timestamp) return '';
    const { separator, isDay, isTime, isZeroAdded, type = 'string', is12Hours, dayStyle } = options;

    const converted = new Date(Number(timestamp));

    const year = converted.getFullYear();
    const month = isZeroAdded ? addZero(converted.getMonth() + 1) : converted.getMonth() + 1;
    const date = isZeroAdded ? addZero(converted.getDate()) : converted.getDate();
    const day = this.parseDayIndex(converted.getDay(), dayStyle || 'kor');
    const hours = converted.getHours();
    const convertedHours = is12Hours && hours > 12 ? hours - 12 : hours;
    const mins = converted.getMinutes();
    const division = is12Hours ? (hours > 12 ? 'am' : 'pm') : '';

    if (type === 'object') {
      const dateObj = { year, month, date };

      if (isDay) dateObj.day = day;

      if (isTime) {
        dateObj.hours = convertedHours;
        dateObj.mins = mins;
        dateObj.division = division;
      }

      return dateObj;
    }

    const dateArr = [year, month, date];

    if (isDay) dateArr.push(day);
    if (isTime) dateArr.push(convertedHours, mins, division);

    if (type === 'array') return dateArr;

    return dateArr.join(separator != null ? separator : '-');
  };

  parsePeriods = (periods, options) => {
    const { start, end } = periods;

    const parsedStart = start ? this.parseDate(start, options) : '';
    const parsedEnd = end ? this.parseDate(end, options) : '';

    return parsedEnd ? `${parsedStart} - ${parsedEnd}` : parsedStart;
  };

  categorize = (dateStr, option = {}) => {
    const { separator, isDay, dayStyle, monthStyle } = option;
    let dateObj = dateStr;

    if (separator) {
      const units = ['year', 'month', 'date'];

      dateObj = dateStr.split(separator).reduce((obj, value, i) => {
        const copied = obj;
        copied[units[i]] = value;
        return copied;
      }, {});
    } else {
      dateObj = {
        year: dateStr.slice(0, 4),
        month: dateStr.slice(4, 6),
        date: dateStr.slice(6, 8),
      };
    }

    if (isDay) {
      const date = new Date(Object.values(dateObj).join('-'));
      const days = getDays(dayStyle);
      const dayIndex = date.getDay();
      dateObj.day = dayStyle ? days[dayIndex] : dayIndex;
    }

    if (monthStyle) {
      const months = getMonths(monthStyle);
      dateObj.month = months[Number(dateObj.month - 1)];
    }

    return dateObj;
  };

  toTimestamp = (input, separator) => {
    let dateObj = input;

    if (typeof input === 'string') {
      dateObj = this.categorize(input, separator);
    }

    const { year, month, date, hours, mins, division } = dateObj;

    const dateArr = [year, month, date];
    const timeArr = division ? [hours, mins, division] : [hours, mins];

    const parsed = Number(new Date(`${dateArr.join('-')} ${timeArr.join(':')}`));
    return Number.isNaN(parsed) ? '' : parsed;
  };
}

const parser = new TimestampParser();

export default parser;
