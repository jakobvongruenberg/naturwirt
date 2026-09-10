import { redirect } from 'next/navigation'

import { routes } from '@farmers/shared/app/constants'

export default function Page() {
  redirect(routes.main.index)
}
