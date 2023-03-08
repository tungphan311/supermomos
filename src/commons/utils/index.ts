export const mergeDateAndTime = (d1: Date, d2: Date): Date => {
  // Extract the date and time values from the two objects
  const year = d1.getFullYear();
  const month = d1.getMonth();
  const day = d1.getDate();
  const hours = d2.getHours();
  const minutes = d2.getMinutes();
  const seconds = d2.getSeconds();

  // Create a new Date object with the merged values
  const mergedDate = new Date(year, month, day, hours, minutes, seconds);
  return mergedDate;
};
