import { BikramSambat } from './BikramSambat'
import { InvalidDate } from './data'
describe('BikramSambat Class', () => {
  it('should create an instance of BikramSambat with empty constructor', () => {
    const bikramSambat = new BikramSambat()
    expect(bikramSambat).toBeInstanceOf(BikramSambat)
  })

  it('should set the property year to given value', () => {
    const bikramSambat = new BikramSambat()
    bikramSambat.setYear(2000)
    expect(bikramSambat.getYear()).toBe(2000)
  })

  it('should set the property month to given value', () => {
    const bikramSambat = new BikramSambat()
    bikramSambat.setMonth(8)
    expect(bikramSambat.getMonth()).toBe(8)
  })

  it('should set the property day to given value', () => {
    const bikramSambat = new BikramSambat()
    bikramSambat.setDay(15)
    expect(bikramSambat.getDay()).toBe(15)
  })

  it('should return correct formatted date .format()', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    expect(bikramSambat.format('YYYY-MM-DD')).toBe('2075-01-01')
  })

  it('should return correct string .toString()', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    expect(bikramSambat.toString()).toBe('2075-01-01')
  })

  it('should return correct year .getYear()', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    expect(bikramSambat.getYear()).toBe(2075)
  })

  it('should return correct month .getMonth()', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    expect(bikramSambat.getMonth()).toBe(1)
  })

  it('should return correct day .getDay()', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    expect(bikramSambat.getDay()).toBe(1)
  })

  it('should return Invalid Date .toString()', () => {
    const bikramSambat = new BikramSambat('207501-01')
    expect(bikramSambat.toString()).toBe(InvalidDate)
  })

  it('should return Invalid Date DateFormat .getDay()', () => {
    const bikramSambat = new BikramSambat('207501-01')
    expect(bikramSambat.getDay()).toBe(NaN)
  })

  it('should return Invalid Date DateFormat .getMonth()', () => {
    const bikramSambat = new BikramSambat('207501-01')
    expect(bikramSambat.getMonth()).toBe(NaN)
  })
  it('should return Invalid Date DateFormat .getYear()', () => {
    const bikramSambat = new BikramSambat('207501-01')
    expect(bikramSambat.getYear()).toBe(NaN)
  })

  it('should return NaN for Invalid Day', () => {
    const bikramSambat = new BikramSambat('2075-01-32')
    expect(bikramSambat.getDay()).toBe(NaN)
  })

  it('should return NaN for Invalid Month', () => {
    const bikramSambat = new BikramSambat('2075-13-01')
    expect(bikramSambat.getMonth()).toBe(NaN)
  })
  // sampleData = [bsDate, adDate]
  const sampleData = [
    ['2075-01-01', '2018-04-14'],
    ['2072-10-03', '2016-01-17'],
    ['2069-11-30', '2013-03-13'],
    ['2082-10-30', '2026-02-12'],
    ['2086-12-30', '2030-04-13'],
    ['2089-01-29', '2032-05-13'],
    ['2080-05-08', '2023-08-25']
  ]
  it('should properly convert to Gregorian Date', () => {
    sampleData.forEach(([bsDate, adDate]) => {
      const bikramSambat = new BikramSambat(bsDate)
      expect(bikramSambat.toAD().toISOString().slice(0, 10)).toBe(adDate)
    })
  })
  it('should properly convert dates to BikramSambat using both instance and static methods', () => {
    const bsDateFromInstance = new BikramSambat().toString()
    const bsDateFromStaticMethod = BikramSambat.fromAD(new Date()).toString();
    expect(bsDateFromInstance).toEqual(bsDateFromStaticMethod)
  })
  it('should properly convert to BikramSambat Date', () => {
    sampleData.forEach(([bsDate, adDate]) => {
      expect(BikramSambat.fromAD(adDate).toString()).toBe(bsDate)
    })
  })

  it('should return Invalid Date for Invalid Date', () => {
    const bikramSambat = new BikramSambat('2075-01-32')
    const gregorianDate = new Date(InvalidDate)
    expect(bikramSambat.toAD().toString()).toBe(InvalidDate)
    expect(BikramSambat.fromAD(gregorianDate).toString()).toBe(InvalidDate)
  })

  it('should return previous year', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    expect(bikramSambat.getPreviousYear()).toBe(2074)
  })

  it('should return next year', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    expect(bikramSambat.getNextYear()).toBe(2076)
  })

  it('should return NaN for Invalid Date', () => {
    const bikramSambat = new BikramSambat('2075-01-32')
    expect(bikramSambat.getPreviousYear()).toBe(NaN)
    expect(bikramSambat.getNextYear()).toBe(NaN)
  })

  it('should properly add years', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    const bikramSambat2 = new BikramSambat('2075-01-01')
    expect(bikramSambat.addYears(5).toString()).toBe('2080-01-01')
    expect(bikramSambat2.addYears(-10).toString()).toBe('2065-01-01')
  })

  it('should return Invalid Date for Invalid Date', () => {
    const bikramSambat = new BikramSambat('2075-01-32')
    expect(bikramSambat.addYears(5).toString()).toBe(InvalidDate)
  })

  it('should properly add months', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    const bikramSambat2 = new BikramSambat('2075-01-01')
    const bikramSambat3 = new BikramSambat('2075-01-01')
    expect(bikramSambat.addMonths(5).toString()).toBe('2075-06-01')
    expect(bikramSambat2.addMonths(-10).toString()).toBe('2074-03-01')
    expect(bikramSambat3.addMonths(-1).toString()).toBe('2074-12-01')
  })

  it('should properly handle days if day is greater than number of days in given month', () => {
    const bikramSambat = new BikramSambat('2075-03-32')
    expect(bikramSambat.addMonths(1).toString()).toBe('2075-04-31')
  })

  it('should return Invalid Date for Invalid Date', () => {
    const bikramSambat = new BikramSambat('2075-01-32')
    expect(bikramSambat.addMonths(5).toString()).toBe(InvalidDate)
  })

  it('should properly add days', () => {
    const bikramSambat = new BikramSambat('2075-01-01')
    const bikramSambat2 = new BikramSambat('2075-01-01')
    const bikramSambat3 = new BikramSambat('2072-01-01')
    expect(bikramSambat.addDays(5).toString()).toBe('2075-01-06')
    expect(bikramSambat2.addDays(-10).toString()).toBe('2074-12-22')
    expect(bikramSambat3.addDays(278).toString()).toBe('2072-10-03')
  })

  it("should return proper weekDay for BikramSambat's date", () => {
    const bikramSambat = new BikramSambat('2072-10-03')
    expect(bikramSambat.getDayOfWeek()).toBe(0)
  })

  it('should properly return startOfWeek, endOfWeek', () => {
    const bikramSambat = new BikramSambat('2080-05-07')
    expect(bikramSambat.getWeekStartDate().toString()).toBe('2080-05-03')
    expect(bikramSambat.getWeekEndDate().toString()).toBe('2080-05-09')
  })
  it('should properly check if two date are in same week', () => {
    const bikramSambat = new BikramSambat('2080-05-07')
    const bikramSambat2 = new BikramSambat('2080-05-06')
    expect(bikramSambat.isSameWeek(bikramSambat2)).toBe(true)
  })

  it('should properly return isAfter value', () => {
    const sampleData = [
      // [date1, date2, expected] - expected is true if date2 is after date1
      ['2073-01-01', '2073-01-02', true],
      ['2073-01-01', '2073-01-01', false], // Equal dates
      ['2073-01-01', '2074-06-15', true], // Different years, months, and days
      ['2073-01-01', '2073-06-15', true], // Different months and days
      ['2073-01-01', '2073-01-15', true], // Different days in the same month
      ['2073-01-01', '2072-12-31', false], // Previous year but same month and day
      ['2073-01-01', '2073-02-01', true], // Next month in the same year
      ['2073-01-01', '2072-12-01', false], // Previous month in the same year
      ['2073-01-01', '2072-12-01', false], // Previous month in the same year
      ['2073-01-01', '2072-01-01', false], // Previous year
      ['2073-01-01', '2074-01-01', true] // Next year
    ]
    sampleData.forEach(([date1, date2, expected]) => {
      const bikramSambat1 = new BikramSambat(date1 as string)
      const bikramSambat2 = new BikramSambat(date2 as string)
      expect(bikramSambat1.isAfter(bikramSambat2)).toBe(expected)
    })
  })
  it('should properly return isBefore value', () => {
    const sampleData = [
      // [date1, date2, expected] - expected is true if date2 is after date1
      ['2073-01-01', '2073-01-02', false],
      ['2073-01-01', '2073-01-01', false], // Equal dates
      ['2073-01-01', '2074-06-15', false], // Different years, months, and days
      ['2073-01-01', '2073-06-15', false], // Different months and days
      ['2073-01-01', '2073-01-15', false], // Different days in the same month
      ['2073-01-01', '2072-12-30', true], // Previous year but same month and day
      ['2073-01-01', '2073-02-01', false], // Next month in the same year
      ['2073-01-01', '2072-12-01', true], // Previous month in the same year
      ['2073-01-01', '2072-12-01', true], // Previous month in the same year
      ['2073-01-01', '2072-01-01', true], // Previous year
      ['2073-01-01', '2074-01-01', false] // Next year
    ]
    sampleData.forEach(([date1, date2, expected]) => {
      const bikramSambat1 = new BikramSambat(date1 as string)
      const bikramSambat2 = new BikramSambat(date2 as string)
      expect(bikramSambat1.isBefore(bikramSambat2)).toBe(expected)
    })
  })
  it('should properly return startOfMonth value', () => {
    const originalDate = new BikramSambat('2078-08-15')
    const startOfMonth = originalDate.startOfMonth()
    expect(startOfMonth.toString()).toBe('2078-08-01')
  })
  it('should properly return endOfMonth value', () => {
    const originalDate = new BikramSambat('2078-08-15')
    const endOfMonth = originalDate.endOfMonth()
    expect(endOfMonth.toString()).toBe('2078-08-29')
  })
})
