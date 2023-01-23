import { DateTime } from 'luxon'
import { prop as RProp } from 'ramda'

export const DateResolverConvert = (prop: string) => (parent: any) => {
  return DateTime.fromJSDate(RProp(prop, parent)).toISO()
}
