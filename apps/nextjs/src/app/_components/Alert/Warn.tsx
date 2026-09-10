import { AlertTriangle } from 'lucide-react'

import { cn } from '@farmers/ui'
import { Alert, AlertTitle } from '@farmers/ui/alert'

export default function Warn({
  message,
  className,
}: {
  message: string
  className?: string
}) {
  return (
    <Alert className={cn('border-none bg-[#fff4e5] text-[#663c00]', className)}>
      <AlertTriangle className='h-4 w-4 !text-[#ed6c02]' />
      <AlertTitle className='mb-0'>{message}</AlertTitle>
    </Alert>
  )
}
