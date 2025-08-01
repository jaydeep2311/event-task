'use client'

import {
  AppBar,
  Avatar,
  Box,
  Button,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material'
import EventCreateModalForm from '@/components/EventCreateModalForm'
import Table from '@/components/Table'
import {
  EventManagementProvider,
  useEventManagementContext,
} from '@/context/EventHandlerContext'
import { useState } from 'react'
import { usePathname } from 'next/navigation'
import { clearSession } from '@/utils/auth'

function DashboardContent() {
  const [modalOpen, setModalOpen] = useState(false)
  const [editEvent, setEditEvent] = useState(null)
  const { filters, setFilters } = useEventManagementContext()
  const pathname = usePathname()
  const publicRoutes = ['/login', '/signup']
  const session = JSON.parse(localStorage.getItem('user') ?? '{}')

  const handleLogout = () => {
    clearSession()
    window.location.assign('/login')
  }

  return (
    <Box p={4}>
      {!publicRoutes.includes(pathname) && (
        <AppBar
          position='static'
          sx={{ backgroundColor: '#1976d2', marginBottom: '10px' }}
        >
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6'>Event Manager</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar src='/demo-profile.jpg' alt='User' />
              <Typography>{session?.name || 'User'}</Typography>
              <Button color='inherit' onClick={handleLogout}>
                Logout
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      )}
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
