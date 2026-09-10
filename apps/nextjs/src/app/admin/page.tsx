//Make a simple page with links to /users and /measures

import { redirect } from 'next/navigation'

import { routes } from '@farmers/shared/app/constants'

const Page = () => {
  redirect(routes.admin.measures)
}
export default Page
