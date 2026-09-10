'use client'

import Image from 'next/image'
import Link from 'next/link'

import { t } from '@farmers/language/i18next'
import { SUGGEST_UPDATES_EMAIL } from '@farmers/shared/app/constants'
import { Button } from '@farmers/ui/button'
import { toast } from '@farmers/ui/toast'

const SuggestUpdateButton = ({ measureTitle }: { measureTitle: string }) => {
  return (
    <>
      <Link
        href={`mailto:https://${SUGGEST_UPDATES_EMAIL}?subject=Update%20Suggestion&body=For%20measure%3A${encodeURIComponent(measureTitle)}`}
        onClick={() => {
          /**
           * Detect it the user has an email client.
           * If the user click on the `mailto` protocol with an email client installed, the launching of the client fires a `blur` event on the window.
           * In that case, the timeout is cleared and nothing happens on our side. Otherwise, if the timeout is not cleared, nothing was launched.
           * Therefore, copy the email address to clipboard instead.
           */
          const timeout = setTimeout(() => {
            navigator.clipboard
              .writeText(SUGGEST_UPDATES_EMAIL)
              .then(() => {
                toast.success(t('Browse.Button.CopiedToClipboard'))
              })
              .catch((error) => {
                console.error('Error copying to clipboard', error)
              })
          }, 500)

          window.addEventListener('blur', () => {
            clearTimeout(timeout)
          })
        }}
      >
        <Button variant='outline' className='px-2 font-semibold'>
          <Image
            src={'/images/icons/comments.svg'}
            alt='comments icon'
            className='mr-1 h-6 w-6'
            width={24}
            height={24}
          />
          {t('Browse.Button.SuggestUpdates')}
        </Button>
      </Link>
    </>
  )
}

export default SuggestUpdateButton
