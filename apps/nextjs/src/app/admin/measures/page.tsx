'use client'

import type { ColumnDef } from '@tanstack/react-table'
import Link from 'next/link'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import type { MeasureSelectSchemaType } from '@farmers/validators'
import { t } from '@farmers/language/i18next'
import { routes } from '@farmers/shared/app/constants'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import { Checkbox } from '@farmers/ui/checkbox'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@farmers/ui/dropdown-menu'
import { MDTable } from '@farmers/ui/md-table'

import { MEASURE_DELETE, ModalStore } from '~/store/modal'
import { api } from '~/trpc/react'

export default function MeasuresPage() {
  const { data } = api.measure.all.useQuery()
  const columns: ColumnDef<MeasureSelectSchemaType>[] = [
    {
      accessorKey: 'id',
      header: () => {
        return <div className='text-xs'>{t('Measure.TableHeader.ID')}</div>
      },
      meta: { name: t('Measure.TableHeader.ID') }, // meta needed for translation
      cell: ({ row }) => {
        const value = String(row.original.id)
        return <div className={cn('text-xs')}>{value}</div>
      },
    },
    {
      accessorKey: 'measureIdentifier',
      header: () => {
        return (
          <div className='text-xs'>
            {t('Measure.TableHeader.MeasureIdentifier')}
          </div>
        )
      },
      meta: { name: t('Measure.TableHeader.MeasureIdentifier') }, // meta needed for translation
      cell: ({ row }) => {
        const value = String(row.original.measureIdentifier) ?? ''
        return <div className={cn('text-xs')}>{value}</div>
      },
    },
    {
      accessorKey: 'isPublished',
      header: () => {
        return (
          <div className='text-xs'>{t('Measure.TableHeader.IsPublished')}</div>
        )
      },
      meta: { name: t('Measure.TableHeader.IsPublished') }, // meta needed for translation
      cell: ({ row }) => {
        return <Checkbox disabled checked={row.original.isPublished} />
      },
    },
    {
      accessorKey: 'measureTitleLong',
      header: () => {
        return <div className='text-xs'>{t('Measure.TableHeader.Title')}</div>
      },
      meta: { name: t('Measure.TableHeader.Title') }, // meta needed for translation
      cell: ({ row }) => {
        const value = String(row.original.measureTitleLong)
        return <div className={cn('text-xs')}>{value}</div>
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      cell: ({ row }) => {
        const measure = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='h-8 w-8 p-0'>
                <span className='sr-only'>{t('Measure.Button.OpenMenu')}</span>
                <DotsHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <Link href={routes.admin.editMeasure(measure.id)}>
                <DropdownMenuItem>{t('Measure.Button.Edit')}</DropdownMenuItem>
              </Link>
              <DropdownMenuItem
                onClick={() => {
                  ModalStore.update({
                    open: true,
                    type: MEASURE_DELETE,
                    options: { deleteMeasureId: measure.id },
                  })
                }}
              >
                {t('Measure.Button.Delete')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  return (
    <div className='container'>
      <MDTable
        columns={columns}
        data={data ?? []}
        filterComponent={
          <Link href={routes.admin.createMeasure}>
            <Button className='w-32'>{t('Measure.Button.Create')}</Button>
          </Link>
        }
      />
    </div>
  )
}
