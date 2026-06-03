import { monthNamesGenitive } from "../enums/months.enum";

export function formatDate(date: Date) {
  const [
    day,
    month,
    year
  ] = [
    date.getDate(),
    date.getMonth() + 1,
    date.getFullYear(),
  ];

  return `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year}`;
}

export function formatStartEndDates(startDate: Date, endDate: Date) {
  const startDay = startDate.getDate();
  const endDay = endDate.getDate();
  const startMonth = startDate.getMonth();
  const endMonth = endDate.getMonth();
  const startYear = startDate.getFullYear();
  const endYear = endDate.getFullYear();

  const sameYear = startYear === endYear;
  const sameMonth = (startMonth === endMonth) && sameYear;

  const formattedStartDate = `${startDay}${sameMonth ? '' : ` ${monthNamesGenitive[startMonth]}${sameYear ? '' : ` ${startYear} года`}`}`;
  const formattedEndDate = `${endDay} ${monthNamesGenitive[endMonth]} ${endYear} года`;

  return [
    formattedStartDate,
    formattedEndDate,
  ];
}