import { format } from './format'
import { isDayValid, parse } from './parser'
import { getDaysFromBsNewYear } from './utils/getDaysFromBsNewYear'
import { addDaysToGregorianDate } from './utils/addDaysToGregorianDate'
import {
  NepaliDaysData,
  NewYearMappingData,
  NepaliMonthsData,
  DaysInMonthsMappingData,
  DateFormat,
  InvalidDate,
  type LanguageCode
} from './data'
import { type Month } from './data/nepali-months'
import { getDaysBetweenTwoAdDates } from './utils/getDaysBetweenTwoAdDates'
import { getNewYearDateInfo } from './utils/getNewYearDateInfo'

export class BikramSambat {
  private static readonly nepaliDays = NepaliDaysData
  private static readonly newYearMap = NewYearMappingData
  private static readonly nepaliMonths = NepaliMonthsData
  private static readonly daysInMonthMap = DaysInMonthsMappingData
  private static readonly MONTHS_IN_A_YEAR = 12
  private static readonly DAYS_IN_A_LEAP_YEAR = 366
  private year: number | undefined
  private month: number | undefined
  private day: number | undefined

  constructor(dateStr?: string | BikramSambat) {
    /* TODO: this needs to be changed to default to current date in 
        case of no data provided, first day of year if only year provided 
        and first day of given month if month and year provided.
        Prerequisite: AD to BS conversion method
     */
    if (typeof dateStr === 'string') {
      const parsedDate = parse(dateStr)
      if (typeof parsedDate === 'string') {
        this.year = undefined
        this.month = undefined
        this.day = undefined
      } else {
        const { year, month, day } = parsedDate
        this.year = year
        this.month = month ?? 1
        this.day = day ?? 1
      }
    } else if (dateStr instanceof BikramSambat) {
      this.year = dateStr.getYear()
      this.month = dateStr.getMonth()
      this.day = dateStr.getDay()
    } else {
      const currentDate = new Date()
      const currentBsDate = BikramSambat.fromAD(currentDate)
      this.year = currentBsDate.getYear()
      this.month = currentBsDate.getMonth()
      this.day = currentBsDate.getDay()
    }
  }

  /**
   * Sets the year property to the provided value.
   * @param {number} year
   */
  public setYear(year: number) {
    this.year = year
  }

  /**
   * Sets the month property to the provided value.
   * @param {number} month
   */
  public setMonth(month: number) {
    this.month = month
  }

  /**
   * Sets the day property to the provided value.
   * @param {number} day
   */
  public setDay(day: number) {
    this.day = day
  }

  /**
   * Returns the year of the Bikram Sambat date.
   * @returns {number} year
   */
  public getYear(): number {
    return this.year ?? NaN
  }

  /**
   * Returns the month of the Bikram Sambat date.
   * @returns {number} month
   */
  public getMonth(): number {
    return this.month ?? NaN
  }

  /**
   * Returns the day of the Bikram Sambat date.
   * @returns {number} day
   */
  public getDay(): number {
    return this.day ?? NaN
  }

  /**
   * Formats a BikramSambat date into the specified format.
   *
   * @param {DateFormat} dateFormat - The desired format for formatting the date.
   * @returns {string} - The formatted date string.
   * @example <caption>DateFormat a BikramSambat date into `YYYY-MM-DD` format.</caption>
   * const date = new BikramSambat('2077-01-01')
   * const formattedDate = format(date, 'YYYY-MM-DD')
   * console.log(formattedDate) // 2077-01-01
   */
  public format(formatStr: DateFormat): string {
    return format(this, formatStr)
  }

  /**
   *
   * @returns {string} - The formatted date string.
   */
  toString(): string {
    if (
      this.year === undefined ||
      this.month === undefined ||
      this.day === undefined
    ) {
      return InvalidDate
    }
    if (!isDayValid(this.year, this.month, this.day)) {
      return InvalidDate
    }
    const month = `${this.month}`.padStart(2, '0')
    const day = `${this.day}`.padStart(2, '0')
    return `${this.year}-${month}-${day}`
  }

  /**
   *
   * @returns {number} - The previous year.
   */
  public getPreviousYear(): number {
    return this.year ? this.year - 1 : NaN
  }

  /**
   *
   * @returns {number} - The next year.
   */
  public getNextYear(): number {
    return this.year ? this.year + 1 : NaN
  }

  public toAD(): Date {
    if (!this.year || !this.month || !this.day) {
      return new Date(InvalidDate)
    }
    const daysFromNewYear = getDaysFromBsNewYear(
      this.year,
      this.month,
      this.day
    )
    const newYearDayAD = BikramSambat.newYearMap[this.year]
    const gregorianDate = addDaysToGregorianDate(
      new Date(newYearDayAD),
      daysFromNewYear - 1
    )
    return gregorianDate
  }

  public static toAD(date: BikramSambat | string | undefined): Date {
    const bsDate = new BikramSambat(date)
    return bsDate.toAD()
  }

  public static fromAD(date: Date | string | undefined): BikramSambat {
    if (!date) {
      return new BikramSambat()
    }

    const gregorianDate = new Date(date)

    if (isNaN(gregorianDate.getTime())) {
      return new BikramSambat(InvalidDate)
    }

    if (gregorianDate.toString() === InvalidDate) {
      return new BikramSambat(InvalidDate)
    }
    const { newYearDate, bsYear } = getNewYearDateInfo(gregorianDate)
    const daysFromNewYear = getDaysBetweenTwoAdDates(
      gregorianDate,
      new Date(newYearDate)
    )
    const bsDate = new BikramSambat(`${bsYear}-01-01`)
    bsDate.addDays(daysFromNewYear)
    return bsDate
  }

  /**
   * Adds the given number of years to the BikramSambat instance.
   * @param years - The number of years to add.
   * @returns - The BikramSambat instance.
   */
  public addYears(years: number): BikramSambat {
    if (this.year === undefined) {
      return this
    }
    this.year += years
    return this
  }

  /**
   * Adds the given number of months to the BikramSambat instance.
   * @param months - The number of months to add.
   * @returns `BikramSambat`
   */
  public addMonths(months: number): BikramSambat {
    if (this.month === undefined || this.year === undefined) {
      return this
    }
    const totalMonths = this.month + months
    const adjustYear = (
      remainingMonths: number,
      yearsToAdd: number
    ): BikramSambat => {
      const monthsInYear = BikramSambat.MONTHS_IN_A_YEAR
      if (remainingMonths > monthsInYear) {
        return adjustYear(remainingMonths - monthsInYear, yearsToAdd + 1)
      } else if (remainingMonths <= 0) {
        return adjustYear(remainingMonths + monthsInYear, yearsToAdd - 1)
      } else {
        this.month = remainingMonths
        this.addYears(yearsToAdd)
        /* If the day is greater than the number of days in the month added 
         to then the day is adjusted to the last day of the month for
         the given year and month.
         2075 Ashar has 32 days , and Shrawan has 31 days
         for example: 2075-03-32 + 1 month = 2075-04-31
        */
        const daysInCurrentMonth = this.getDaysInMonth()
        if (this.day && this.day > daysInCurrentMonth) {
          this.day = daysInCurrentMonth
        }
        return this
      }
    }
    return adjustYear(totalMonths, 0)
  }

  /**
   * Adds the given number of days to the BikramSambat instance.
   * @param days - The number of days to add.
   * @returns `BikramSambat`
   */
  public addDays(days: number): BikramSambat {
    if (this.day === undefined || this.month === undefined) {
      return this
    }
    const totalDays = this.day + days
    const adjustMonth = (remainingDays: number): BikramSambat => {
      const daysInMonth = this.getDaysInMonth()
      if (remainingDays > daysInMonth) {
        this.addMonths(1)
        return adjustMonth(remainingDays - daysInMonth)
      } else if (remainingDays <= 0) {
        this.addMonths(-1)
        return adjustMonth(daysInMonth + remainingDays)
      } else {
        this.day = remainingDays
        return this
      }
    }
    return adjustMonth(totalDays)
  }

  /**
   *
   * @returns {number} - The number of days in the month.
   */
  public getDaysInMonth(): number {
    if (this.month === undefined || this.year === undefined) {
      return NaN
    }
    return BikramSambat.daysInMonthMap[this.year][this.month - 1]
  }

  /**
   *
   * @returns {boolean} Whether the year is a leap year or not.
   */
  public isLeapYear(): boolean {
    if (this.year === undefined) {
      return false
    }
    const daysInCurrentYear = BikramSambat.daysInMonthMap[this.year].reduce(
      (acc, days) => acc + days,
      0
    )
    return daysInCurrentYear === BikramSambat.DAYS_IN_A_LEAP_YEAR
  }

  public getDayOfWeek(): number {
    if (this.year === undefined || this.month === undefined) {
      return NaN
    }
    const dateInGregorian = this.toAD()
    const dayOfWeek = dateInGregorian.getDay()
    return dayOfWeek
  }

  public getPreviousMonth(): Month | null {
    if (!this.month) {
      return null
    }
    const month = this.month === 1 ? 12 : this.month - 1
    return BikramSambat.nepaliMonths[month - 1]
  }

  public getNextMonth(): Month | null {
    if (!this.month) {
      return null
    }
    const month = (this.month + 1) % 12
    return BikramSambat.nepaliMonths[month - 1]
  }

  public static getWeekdayNames(language?: LanguageCode): string[] {
    return BikramSambat.nepaliDays.map((day) => day[language ?? 'np'])
  }

  public static getMonthNames(language?: LanguageCode): string[] {
    return NepaliMonthsData.map((month) => month[language ?? 'np'])
  }

  public isSameYear(date: BikramSambat): boolean {
    if (this.toString() === InvalidDate || date.toString() === InvalidDate) {
      return false
    }
    if (this.year === date.getYear()) {
      return true
    }
    return false
  }

  public isSameMonth(date: BikramSambat): boolean {
    if (this.toString() === InvalidDate || date.toString() === InvalidDate) {
      return false
    }
    if (this.year === date.getYear() && this.month === date.getMonth()) {
      return true
    }
    return false
  }

  public isSameDay(date: BikramSambat): boolean {
    if (this.toString() === InvalidDate || date.toString() === InvalidDate) {
      return false
    }
    if (
      this.year === date.getYear() &&
      this.month === date.getMonth() &&
      this.day === date.getDay()
    ) {
      return true
    }
    return false
  }

  public getWeekStartDate(): BikramSambat {
    if (this.toString() === InvalidDate) {
      return this
    }
    const currentDate = new BikramSambat(this)
    const dayOfWeek = currentDate.getDayOfWeek()
    const startOfWeek = currentDate.addDays(-dayOfWeek)
    return startOfWeek
  }

  public getWeekEndDate(): BikramSambat {
    if (this.toString() === InvalidDate) {
      return this
    }
    const currentDate = new BikramSambat(this)
    const dayOfWeek = currentDate.getDayOfWeek()
    const endOfWeek = currentDate.addDays(6 - dayOfWeek)
    return endOfWeek
  }

  public isSameWeek(date: BikramSambat): boolean {
    if (this.toString() === InvalidDate || date.toString() === InvalidDate) {
      return false
    }
    const weekStartDate = this.getWeekStartDate()
    const weekEndDate = this.getWeekEndDate()
    if (weekStartDate.isAfter(date) && weekEndDate.isBefore(date)) {
      return true
    }
    return false
  }

  /**
   * Returns true if the given date is after the current date.
   * @param date - BikramSambat
   * @returns boolean
   * @example
   * const date = new BikramSambat('2077-01-01')
   * const date2 = new BikramSambat('2077-01-02')
   * date.isAfter(date2) // true
   */
  public isAfter(date: BikramSambat): boolean {
    if (
      this.year === undefined ||
      this.month === undefined ||
      this.day === undefined ||
      date.toString() === InvalidDate
    ) {
      return false
    }
    if (this.year < date.getYear()) {
      return true
    } else if (this.year > date.getYear()) {
      return false
    }

    if (this.month < date.getMonth()) {
      return true
    } else if (this.month > date.getMonth()) {
      return false
    }

    if (this.day < date.getDay()) {
      return true
    } else if (this.day > date.getDay()) {
      return false
    }

    return false // Dates are equal
  }

  /**
   * Returns true if the given date is before the current date.
   * @param date
   * @returns boolean
   * @example
   * const date = new BikramSambat('2077-01-01')
   * const date2 = new BikramSambat('2077-01-02')
   * date.isBefore(date2) // false
   */
  public isBefore(date: BikramSambat): boolean {
    if (
      this.year === undefined ||
      this.month === undefined ||
      this.day === undefined ||
      date.toString() === InvalidDate ||
      this.isSameDay(date)
    ) {
      return false
    }
    return !this.isAfter(date)
  }
  public getPreviousDay(): BikramSambat {
    const currentDate = new BikramSambat(this)
    return currentDate.addDays(-1)
  }
  public getNextDay(): BikramSambat {
    const currentDate = new BikramSambat(this)
    return currentDate.addDays(1)
  }

  public toJSON(): string {
    return this.toString()
  }

  public startOfMonth(): BikramSambat {
    if (this.year === undefined || this.month === undefined) {
      return this
    }
    const firstDayOfMonth = new BikramSambat(this)
    firstDayOfMonth.setDay(1)
    return firstDayOfMonth
  }

  public endOfMonth(): BikramSambat {
    if (this.year === undefined || this.month === undefined) {
      return this
    }
    const daysInMonth = this.getDaysInMonth()
    const lastDayOfMonth = new BikramSambat(this)
    lastDayOfMonth.setDay(daysInMonth)
    return lastDayOfMonth
  }
}
