import { getDaysBetweenTwoAdDates } from './getDaysBetweenTwoAdDates'

describe('getDaysBetweenTwoAdDates', () => {
  it('calculates the correct number of days for positive difference', () => {
    const startDate = new Date('2023-08-15')
    const endDate = new Date('2023-09-01')
    expect(getDaysBetweenTwoAdDates(startDate, endDate)).toBe(17)
  })

  it('calculates the correct number of days for negative difference', () => {
    const startDate = new Date('2023-09-01')
    const endDate = new Date('2023-08-15')
    expect(getDaysBetweenTwoAdDates(startDate, endDate)).toBe(17)
  })

  it('calculates the correct number of days for same dates', () => {
    const startDate = new Date('2023-08-15')
    const endDate = new Date('2023-08-15')
    expect(getDaysBetweenTwoAdDates(startDate, endDate)).toBe(0)
  })

  it('calculates the correct number of days ignoring partial days', () => {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMinutes(startDate.getMinutes() + 5); // Add 5 minutes
    expect(getDaysBetweenTwoAdDates(startDate, endDate)).toBe(0)
  })
})
