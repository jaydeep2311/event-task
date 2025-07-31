'use client'
import ValidatedForm from '@/components/ValidatedForm'
import { signupSchema } from '@/utils/validationSchema'

export default function SignupPage() {
  return <ValidatedForm isSignup validationSchema={signupSchema} />
}
