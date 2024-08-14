function strToMins(str: string) {
  const [hours, minutes] = str.split(':').map(Number);
  return hours * 60 + minutes;
}

function minsToHours(mins: number) {
  return Math.round(mins / 60);
}

export function timeSubstraction(startTime: string, endTime: string) {
  const differenceInMinutes = strToMins(endTime) - strToMins(startTime);
  const differenceInHours = minsToHours(differenceInMinutes);
  return differenceInHours;
}
