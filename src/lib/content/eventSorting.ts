export type EventSortItem = { id: number; startAt: string }

export function sortEventsChronologically<T extends EventSortItem>(events: T[]): T[] {
  return [...events].sort((left, right) => left.startAt.localeCompare(right.startAt))
}
