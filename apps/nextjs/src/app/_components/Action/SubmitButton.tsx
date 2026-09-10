import { Loader2 } from 'lucide-react'

import { Button } from '@farmers/ui/button'

export default function SubmitButton({
  btnClassName,
  loaderClassName,
  label,
  loading,
}: {
  btnClassName: string
  loaderClassName: string
  label: string
  loading: boolean
}) {
  return (
    <Button type='submit' disabled={loading} className={btnClassName}>
      {!loading ? label : <Loader2 className={loaderClassName} />}
    </Button>
  )
}
