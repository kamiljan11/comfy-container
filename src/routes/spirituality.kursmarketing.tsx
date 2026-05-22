import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/spirituality/kursmarketing')({
  beforeLoad: () => {
    throw redirect({ to: '/spirituality/marketing-training' })
  },
  component: () => null,
})
