import { CheckCircle } from 'lucide-react'

import { cn } from '@farmers/ui'
import { Alert, AlertTitle } from '@farmers/ui/alert'

export default function Success({
  message,
  className,
}: {
  message: string
  className?: string
}) {
  return (
    <Alert className={cn('border-none bg-[#edf7ed] text-[#1e4620]', className)}>
      <CheckCircle className='h-4 w-4 !text-[#2e7d32]' />
      <AlertTitle className='mb-0'>{message}</AlertTitle>
    </Alert>
  )
}
