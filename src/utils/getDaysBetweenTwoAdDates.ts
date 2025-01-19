const MILLISECONDS_IN_A_DAY = 1000 * 60 * 60 * 24

export const getDaysBetweenTwoAdDates = (startDate: Date, endDate: Date) => {
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.floor(timeDiff / MILLISECONDS_IN_A_DAY)
  return diffDays
}
