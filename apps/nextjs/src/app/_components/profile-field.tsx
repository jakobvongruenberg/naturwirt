import React, { useEffect, useState } from 'react'
import {
  CheckIcon,
  EyeClosedIcon,
  EyeOpenIcon,
  Pencil1Icon,
} from '@radix-ui/react-icons'

import type { ProfileFieldProps } from '@farmers/validators'
import { t } from '@farmers/language/i18next'

import Typography from './typography'

export const ProfileField: React.FC<ProfileFieldProps> = ({
  label,
  initialValue,
  editing,
  onEdit,
  onSave,
  type = 'text',
  edittable = true,
}) => {
  const [showPassword, setShowPassword] = useState(false)
  const [stateValue, setStateValue] = useState(initialValue)

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  useEffect(() => {
    setStateValue(initialValue)
  }, [initialValue])

  return (
    <div className='flex items-start justify-between border-b pb-4'>
      <div className='mr-4 flex-grow'>
        <Typography type='p' className='font-semibold'>
          {label}
        </Typography>
        {editing ? (
          <div className='relative'>
            <input
              type={type === 'password' && !showPassword ? 'password' : 'text'}
              value={stateValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setStateValue(e.target.value)
              }
              className='mt-1 block w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm placeholder-slate-400 shadow-sm
              focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500'
            />
            {type === 'password' && (
              <button
                type='button'
                onClick={toggleShowPassword}
                className='absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5'
              >
                {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
              </button>
            )}
          </div>
        ) : (
          <Typography type='small'>
            {type === 'password' ? '********' : initialValue}
          </Typography>
        )}
      </div>
      <button
        className='flex items-center text-blue-500'
        onClick={() => {
          if (editing) {
            onSave(stateValue)
          } else {
            onEdit()
          }
        }}
      >
        {edittable && editing ? (
          <>
            <CheckIcon className='mr-1' />
            <Typography type='small'>
              {t('Profile.Details.Button.Save')}
            </Typography>
          </>
        ) : edittable ? (
          <>
            <Pencil1Icon className='mr-1' />
            <Typography type='small'>
              {t('Profile.Details.Button.Edit')}
            </Typography>
          </>
        ) : null}
      </button>
    </div>
  )
}
