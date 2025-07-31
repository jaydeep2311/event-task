'use client'

import { Box, Button, MenuItem, TextField, useTheme } from '@mui/material'
import EventCreateModalForm from '@/components/EventCreateModalForm'
import Table from '@/components/Table'
import {
  EventManagementProvider,
  useEventManagementContext,
} from '@/context/EventHandlerContext'
import { useState } from 'react'

function DashboardContent() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editEvent, setEditEvent] = useState(null)
  const { filters, setFilters } = useEventManagementContext()
  const theme = useTheme()

  return (
    <Box p={4}>
      {/* Top Bar with Add Event Button */}
      <Box display='flex' justifyContent='flex-end' mb={2}>
        <Button
          variant='contained'
          onClick={() => {
            setEditEvent(null)
            setModalOpen(true)
          }}
          sx={{ borderRadius: 2 }}
        >
          Add Event
        </Button>
      </Box>

      {/* Filters */}
      <Box
        display='flex'
        gap={1.5}
        mb={2}
        flexWrap='wrap'
        sx={{ alignItems: 'center' }}
      >
        <TextField
          size='small'
          label='Search'
          value={filters.search}
          onChange={(e) => setFilters({ search: e.target.value })}
          sx={{
            minWidth: 160,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          size='small'
          select
          label='Event Type'
          value={filters.eventType}
          onChange={(e) => setFilters({ eventType: e.target.value })}
          sx={{
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        >
          <MenuItem value=''>All</MenuItem>
          <MenuItem value='Online'>Online</MenuItem>
          <MenuItem value='In-Person'>In-Person</MenuItem>
        </TextField>
        <TextField
          size='small'
          label='Category'
          value={filters.category}
          onChange={(e) => setFilters({ category: e.target.value })}
          sx={{
            minWidth: 140,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          size='small'
          type='date'
          label='Start Date'
          InputLabelProps={{ shrink: true }}
          value={filters.startDate}
          onChange={(e) => setFilters({ startDate: e.target.value })}
          sx={{
            minWidth: 160,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          size='small'
          type='date'
          label='End Date'
          InputLabelProps={{ shrink: true }}
          value={filters.endDate}
          onChange={(e) => setFilters({ endDate: e.target.value })}
          sx={{
            minWidth: 160,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        />
        <TextField
          size='small'
          select
          label='Sort By'
          value={filters.sortBy}
          onChange={(e) =>
            setFilters({ sortBy: e.target.value as 'startDate' | 'title' })
          }
          sx={{
            minWidth: 150,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
            },
          }}
        >
          <MenuItem value='startDate'>Start Date</MenuItem>
          <MenuItem value='title'>Title</MenuItem>
        </TextField>
      </Box>

      {/* Event Table */}
      <Table
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onEdit={(event: any) => {
          setEditEvent(event)
          setModalOpen(true)
        }}
      />

      {/* Event Modal */}
      <EventCreateModalForm
        open={modalOpen}
        handleClose={() => setModalOpen(false)}
        editEvent={editEvent}
      />
    </Box>
  )
}

export default function DashboardPage() {
  return (
    <EventManagementProvider>
      <DashboardContent />
    </EventManagementProvider>
  )
}
