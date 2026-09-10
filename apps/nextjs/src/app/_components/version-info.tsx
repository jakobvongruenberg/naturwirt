import type { HTMLAttributes } from 'react'

import { t } from '@farmers/language/i18next'
import { cn } from '@farmers/ui'

import { env } from '~/env'
import packageJson from '../../../package.json'

export const VersionInfo = (props: HTMLAttributes<HTMLDivElement>) => {
  const { className, ...rest } = props
  const channel = env.NEXT_PUBLIC_CHANNEL
  // const commitHashString = env.NEXT_PUBLIC_GIT_COMMIT_HASH
  //   ? ` (${env.NEXT_PUBLIC_GIT_COMMIT_HASH})`
  //   : ''
  return (
    <div {...rest} className={cn('text-gray-300', className)}>
      {t('Admin.Version')} {packageJson.version} - {channel}
      {/* {commitHashString} */}
    </div>
  )
}
