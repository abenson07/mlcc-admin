import { LoginForm } from '@/src/components/auth/LoginForm'
import { getSession } from '@/src/lib/auth'
import { redirect } from 'next/navigation'

export default async function LoginPage() {
  const session = await getSession()
  
  // If already authenticated, redirect to home
  if (session) {
    redirect('/')
  }

  return <LoginForm />
}


