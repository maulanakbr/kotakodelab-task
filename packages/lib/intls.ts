export const getDate = (date: Date) => {
  const currentDate = Intl.DateTimeFormat('en-US', {
    dateStyle: 'full',
  }).format(date);

  return currentDate;
};

export const getDateTime = (date: Date) => {
  const currentTime = Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }).format(date);

  return currentTime;
};
