import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign Up - Chess Analyzer',
  description: 'Create an account to start analyzing your chess games',
}

export default function SignUpLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
} 