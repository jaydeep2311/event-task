/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useFormik } from 'formik'
import {
  Box,
  Button,
  Modal,
  TextField,
  MenuItem,
  Typography,
} from '@mui/material'
import { eventManagementSchema } from '@/utils/eventValidationSchema'
import { useEventManagementContext } from '@/context/EventHandlerContext'
import { latestCurrentSessionSession } from '@/utils/auth'
import { v4 as uuid } from 'uuid'
import { useEffect } from 'react'

export default function EventCreateFormModal({
  open,
  handleClose,
  editEvent,
}: any) {
  const { events, storeEvent, updateIndividualEvent } =
    useEventManagementContext()
  const session = latestCurrentSessionSession()

  const formik = useFormik({
    initialValues: editEvent || {
      title: '',
      description: '',
      eventType: 'Online',
      location: '',
      eventLink: '',
      startDateTime: '',
      endDateTime: '',
      category: '',
    },
    validationSchema: eventManagementSchema,
    onSubmit: (values) => {
      const isOverlap = events.some((event) => {
        if (editEvent && event.id === editEvent.id) return false
        const start = new Date(values.startDateTime).getTime()
        const end = new Date(values.endDateTime).getTime()
        const eStart = new Date(event.startDateTime).getTime()
        const eEnd = new Date(event.endDateTime).getTime()
        return start < eEnd && end > eStart
      })

      if (isOverlap) {
        alert('Event overlaps with another event!')
        return
      }

      const eventData = {
        ...values,
        id: editEvent?.id || uuid(),
        organizer: session?.name || 'Unknown',
      }

      editEvent ? updateIndividualEvent(eventData) : storeEvent(eventData)
      handleClose()
      formik.resetForm()
    },
    enableReinitialize: true,
  })

  const now = new Date()
  const minStartDate = now.toISOString().slice(0, 16)
  const minEndDate = formik.values.startDateTime
    ? new Date(formik.values.startDateTime).toISOString().slice(0, 16)
    : minStartDate

  useEffect(() => {
    return () => {
      formik.resetForm()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          p: 4,
          backgroundColor: 'white',
          borderRadius: 3,
          maxWidth: 500,
          mx: 'auto',
          mt: 10,
        }}
      >
        <Typography variant='h6' mb={2}>
          {editEvent ? 'Edit Event' : 'Add Event'}
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label='Title'
            name='title'
            fullWidth
            margin='normal'
            value={formik.values.title}
            onChange={formik.handleChange}
            error={formik.touched.title && Boolean(formik.errors.title)}
            helperText={
              formik.touched.title && typeof formik.errors.title === 'string'
                ? formik.errors.title
                : ''
            }
          />
          <TextField
            label='Description'
            name='description'
            fullWidth
            multiline
            rows={3}
            margin='normal'
            value={formik.values.description}
            onChange={formik.handleChange}
            error={
              formik.touched.description && Boolean(formik.errors.description)
            }
            helperText={
              formik.touched.description &&
              typeof formik.errors.description === 'string'
                ? formik.errors.description
                : ''
            }
          />
          <TextField
            select
            label='Event Type'
            name='eventType'
            fullWidth
            margin='normal'
            value={formik.values.eventType}
            onChange={formik.handleChange}
          >
            <MenuItem value='Online'>Online</MenuItem>
            <MenuItem value='In-Person'>In-Person</MenuItem>
          </TextField>
          {formik.values.eventType === 'In-Person' && (
            <TextField
              label='Location'
              name='location'
              fullWidth
              margin='normal'
              value={formik.values.location}
              onChange={formik.handleChange}
              error={formik.touched.location && Boolean(formik.errors.location)}
              helperText={
                formik.touched.location &&
                typeof formik.errors.location === 'string'
                  ? formik.errors.location
                  : ''
              }
            />
          )}
          {formik.values.eventType === 'Online' && (
            <TextField
              label='Event Link'
              name='eventLink'
              fullWidth
              margin='normal'
              value={formik.values.eventLink}
              onChange={formik.handleChange}
              error={
                formik.touched.eventLink && Boolean(formik.errors.eventLink)
              }
              helperText={
                formik.touched.eventLink &&
                typeof formik.errors.eventLink === 'string'
                  ? formik.errors.eventLink
                  : ''
              }
            />
          )}
          <TextField
            type='datetime-local'
            label='Start Date & Time'
            name='startDateTime'
            fullWidth
            margin='normal'
            InputLabelProps={{ shrink: true }}
            value={formik.values.startDateTime}
            onChange={formik.handleChange}
            error={
              formik.touched.startDateTime &&
              Boolean(formik.errors.startDateTime)
            }
            inputProps={{
              min: minStartDate,
            }}
            helperText={
              formik.touched.startDateTime &&
              typeof formik.errors.startDateTime === 'string'
                ? formik.errors.startDateTime
                : ''
            }
          />
          <TextField
            type='datetime-local'
            label='End Date & Time'
            name='endDateTime'
            fullWidth
            margin='normal'
            InputLabelProps={{ shrink: true }}
            value={formik.values.endDateTime}
            onChange={formik.handleChange}
            error={
              formik.touched.endDateTime && Boolean(formik.errors.endDateTime)
            }
            inputProps={{
              min: minEndDate,
            }}
            helperText={
              formik.touched.endDateTime &&
              typeof formik.errors.endDateTime === 'string'
                ? formik.errors.endDateTime
                : ''
            }
          />
          <TextField
            label='Category'
            name='category'
            fullWidth
            margin='normal'
            value={formik.values.category}
            onChange={formik.handleChange}
            error={formik.touched.category && Boolean(formik.errors.category)}
            helperText={
              formik.touched.category &&
              typeof formik.errors.category === 'string'
                ? formik.errors.category
                : ''
            }
          />
          <Button type='submit' variant='contained' fullWidth sx={{ mt: 2 }}>
            {editEvent ? 'Update' : 'Create'}
          </Button>
        </form>
      </Box>
    </Modal>
  )
}
