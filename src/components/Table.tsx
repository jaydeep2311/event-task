'use client'

import { useEventManagementContext } from '@/context/EventHandlerContext'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TableContainer,
  Paper,
  Typography,
} from '@mui/material'

export default function EventTable({
  onEdit,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onEdit: (event: any) => void
}) {
  const { events, removeEvent, filters } = useEventManagementContext()

  let filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      event.description?.toLowerCase().includes(filters.search.toLowerCase())

    const matchesType = filters.eventType
      ? event.eventType === filters.eventType
      : true
    const matchesCategory = filters.category
      ? event.category.includes(filters.category)
      : true

      const formattedDate = new Date(event.endDateTime)
        .toISOString()
        .split('T')[0]

    const matchesDate =
      (!filters.startDate ||
        new Date(event.startDateTime) >= new Date(filters.startDate)) &&
      (!filters.endDate || new Date(formattedDate) <= new Date(filters.endDate))

    return matchesSearch && matchesType && matchesCategory && matchesDate
  })

  filteredEvents = filteredEvents.sort((a, b) => {
    if (filters.sortBy === 'startDate') {
      return (
        new Date(a.startDateTime).getTime() -
        new Date(b.startDateTime).getTime()
      )
    }
    return a.title.localeCompare(b.title)
  })

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Start</TableCell>
            <TableCell>End</TableCell>
            <TableCell>Organizer</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredEvents.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} align='center'>
                <Typography variant='body1' color='text.secondary'>
                  No events available
                </Typography>
              </TableCell>
            </TableRow>
          ) : (
            filteredEvents.map((event) => (
              <TableRow key={event.id}>
                <TableCell>{event.title}</TableCell>
                <TableCell>{event.eventType}</TableCell>
                <TableCell>
                  {new Date(event.startDateTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(event.endDateTime).toLocaleString()}
                </TableCell>
                <TableCell>{event.organizer}</TableCell>
                 <TableCell>{event.category}</TableCell>
                <TableCell>
                  <Button onClick={() => onEdit(event)}>Edit</Button>
                  <Button color='error' onClick={() => removeEvent(event.id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
