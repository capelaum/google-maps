export type EventCategory = {
  id: number
  title: string
}

export type EventGeometry = {
  date: string
  type: string
  coordinates: number[]
}

export type NaturalEvent = {
  id: string
  title: string
  description: string
  categories: EventCategory[]
  geometries: EventGeometry[]
}

export type eventInfo = Pick<NaturalEvent, 'id' | 'title'>
