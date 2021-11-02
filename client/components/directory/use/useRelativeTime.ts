import { MyFile } from 'lib/api'

const units: Map<Intl.RelativeTimeFormatUnit, number> = new Map()
units.set('year', 24 * 60 * 60 * 1000 * 365)
units.set('month', 24 * 60 * 60 * 1000 * (365 / 12))
units.set('day', 24 * 60 * 60 * 1000)
units.set('hour', 60 * 60 * 1000)
units.set('minute', 60 * 1000)
units.set('second', 1000)

const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' })

const getRelativeTime = (from: Date, to = new Date()) => {
  const elapsed = to.getTime() - from.getTime()

  let result = 'now'
  const entries = units.entries()
  for (const [unit, ms] of entries) {
    const value = Math.floor(elapsed / ms)
    if (value > 0) {
      result = rtf.format(-value, unit)
      break
    }
  }

  return result
}

export const useRelativeTimes = (files: MyFile[]) => {
  return files.map((file) => getRelativeTime(new Date(file.modified)))
}
