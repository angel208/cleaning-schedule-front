export function getDateFormatted (date: Date): String {
  return new Date(date).toLocaleDateString('en-us', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })
}

export function getExpiredDays (taskDate: Date, frequency: number): number {
  const daysSinceLastExecuted = dateDiffInDays(new Date(taskDate), new Date())
  return (frequency - Math.abs(daysSinceLastExecuted)) * -1
}

// a and b are javascript Date objects
// https://stackoverflow.com/questions/3224834/get-difference-between-2-dates-in-javascript
function dateDiffInDays (a: Date, b: Date): number {
  const _MS_PER_DAY = 1000 * 60 * 60 * 24
  // Discard the time and time-zone information.
  const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
  const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

  return Math.floor((utc1 - utc2) / _MS_PER_DAY)
}
