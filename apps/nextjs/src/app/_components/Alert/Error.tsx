import { AlertCircle } from 'lucide-react'

import { cn } from '@farmers/ui'
import { Alert, AlertTitle } from '@farmers/ui/alert'

export default function Error({
  message,
  className,
}: {
  message: string
  className?: string
}) {
  return (
    <Alert className={cn('border-none bg-[#fdeded] text-[#5f2120]', className)}>
      <AlertCircle className='h-4 w-4 !text-[#d32f2f]' />
      <AlertTitle className='mb-0'>{message}</AlertTitle>
    </Alert>
  )
}
