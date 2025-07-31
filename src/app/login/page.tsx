'use client'
import ValidatedForm from '@/components/ValidatedForm'
import { loginSchema } from '@/utils/validationSchema'

export default function LoginPage() {
  return <ValidatedForm validationSchema={loginSchema} />
}
