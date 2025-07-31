'use client'
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { latestCurrentSessionSession } from '@/utils/auth'

export interface MyEventType {
  id: string
  title: string
  description: string
  eventType: 'Online' | 'In-Person'
  location?: string
  eventLink?: string
  startDateTime: string
  endDateTime: string
  category: string
  organizer: string
}
interface MyEventContextFilters {
  search: string
  eventType: string
  category: string
  startDate: string
  endDate: string
  sortBy: 'startDate' | 'title'
}
interface MyEventContextWrapperType {
  events: MyEventType[]
  storeEvent: (event: MyEventType) => void
  updateIndividualEvent: (event: MyEventType) => void
  removeEvent: (id: string) => void
  filters: MyEventContextFilters
  setFilters: (filters: Partial<MyEventContextFilters>) => void
}

const MyEventManagementContext = createContext<
  MyEventContextWrapperType | undefined
>(undefined)

export const EventManagementProvider = ({
  children,
}: {
  children: ReactNode
}) => {
  const [events, setEventsData] = useState<MyEventType[]>([])
  const [filtersData, setFiltersDataState] = useState<MyEventContextFilters>({
    search: '',
    eventType: '',
    category: '',
    startDate: '',
    endDate: '',
    sortBy: 'startDate',
  })

  useEffect(() => {
    const session = latestCurrentSessionSession()
    if (session) {
      const stored = localStorage.getItem(`events_${session.email}`)
      if (stored) setEventsData(JSON.parse(stored))
    }
  }, [])

  const storeEvents = (newEvents: MyEventType[]) => {
    const session = latestCurrentSessionSession()
    if (session) {
      localStorage.setItem(`events_${session.email}`, JSON.stringify(newEvents))
    }
    setEventsData(newEvents)
  }

  const storeEvent = (event: MyEventType) => storeEvents([...events, event])

  const updateIndividualEvent = (event: MyEventType) =>
    storeEvents(events.map((e) => (e.id === event.id ? event : e)))

  const removeEvent = (id: string) =>
    storeEvents(events.filter((e) => e.id !== id))

  const setFiltersAction = (updated: Partial<MyEventContextFilters>) => {
    setFiltersDataState((prev) => ({ ...prev, ...updated }))
  }

  return (
    <MyEventManagementContext.Provider
      value={{
        events,
        storeEvent,
        updateIndividualEvent,
        removeEvent,
        filters: filtersData,
        setFilters: setFiltersAction,
      }}
    >
      {children}
    </MyEventManagementContext.Provider>
  )
}

export const useEventManagementContext = () => {
  const context = useContext(MyEventManagementContext)
  if (!context)
    throw new Error('useEventContext must be used inside EventProvider')
  return context
}
