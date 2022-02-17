import { DateTime } from 'luxon'

export const formatDate = (dateStr, format='DATE_SHORT') => {
  return DateTime.fromISO(dateStr)
    .setZone('Asia/Tokyo')
    .toLocaleString(DateTime[format])
}