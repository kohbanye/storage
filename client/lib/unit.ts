export const fileSizeToString = (size: number) => {
  if (size == 0) {
    return '0 B'
  }

  const units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']
  const log = Math.floor(Math.log(size) / Math.log(1024))
  const res = size / Math.pow(1024, log)
  if (`${Math.round(res)}`.length > 2) {
    return `${Math.round(res)} ${units[log]}`
  } else {
    return `${(size / Math.pow(1024, log)).toFixed(2)} ${units[log]}`
  }
}
