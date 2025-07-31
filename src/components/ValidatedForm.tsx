'use client'

import { useFormik } from 'formik'
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  InputAdornment,
  Link,
} from '@mui/material'
import { AccountCircle, Email, Lock } from '@mui/icons-material'
import { useRouter } from 'next/navigation'

interface ValidatedFormProps {
  isSignup?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validationSchema: any
}

const ValidatedForm = ({
  isSignup = false,
  validationSchema,
}: ValidatedFormProps) => {
  const router = useRouter()

  const formik = useFormik({
    initialValues: { name: '', email: '', password: '' },
    validationSchema,
    onSubmit: (values) => {
      if (isSignup) {
        localStorage.setItem('user', JSON.stringify(values))
        alert('Signup successful! Please login.')
        router.push('/login')
      } else {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
          const user = JSON.parse(storedUser)
          if (
            user.email === values.email &&
            user.password === values.password
          ) {
            localStorage.setItem('isLoggedIn', 'true')
            router.push('/dashboard')
          } else {
            alert('Invalid email or password')
          }
        } else {
          alert('No user found. Please sign up first.')
        }
      }
    },
  })

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
        p: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 400,
          width: '100%',
          borderRadius: 4,
          backgroundColor: '#fff',
        }}
      >
        <Typography
          variant='h4'
          mb={3}
          textAlign='center'
          fontWeight='bold'
          color='primary'
        >
          {isSignup ? 'Sign Up' : 'Login'}
        </Typography>

        <form onSubmit={formik.handleSubmit}>
          {isSignup && (
            <Box mb={2}>
              <TextField
                fullWidth
                label='Name'
                name='name'
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <AccountCircle color='primary' />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>
          )}

          <Box mb={2}>
            <TextField
              fullWidth
              label='Email'
              name='email'
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Email color='primary' />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box mb={3}>
            <TextField
              fullWidth
              type='password'
              label='Password'
              name='password'
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <Lock color='primary' />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Button
            fullWidth
            variant='contained'
            type='submit'
            sx={{
              py: 1.2,
              borderRadius: 3,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #5a0eb8 0%, #1e63d9 100%)',
              },
            }}
          >
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
        </form>

        <Typography mt={2} textAlign='center'>
          {isSignup ? (
            <>
              Already have an account?{' '}
              <Link href='/login' underline='hover'>
                Login
              </Link>
            </>
          ) : (
            <>
              Dont have an account?{' '}
              <Link href='/signup' underline='hover'>
                Sign Up
              </Link>
            </>
          )}
        </Typography>
      </Paper>
    </Box>
  )
}

export default ValidatedForm
