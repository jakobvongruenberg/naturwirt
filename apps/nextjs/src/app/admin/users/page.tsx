'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { useState } from 'react'
import { DotsHorizontalIcon } from '@radix-ui/react-icons'
import { useForm } from 'react-hook-form'

import { t } from '@farmers/language/i18next'
import { z } from '@farmers/shared/common/zod'
import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@farmers/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@farmers/ui/dropdown-menu'
import { Form } from '@farmers/ui/form'
import { ControlledInput } from '@farmers/ui/input'
import { MDTable } from '@farmers/ui/md-table'
import { toast } from '@farmers/ui/toast'

import { api } from '~/trpc/react'
import { downloadCSV } from '~/utils/download-csv'

const formSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string().optional(),
  emailVerified: z.date().optional(),
  // image: z.string().optional(),
})

const UsersTable = () => {
  const [openEditUser, setOpenEditUser] = useState(false)
  const { data, refetch } = api.user.all.useQuery()

  const { mutateAsync: updateUser } = api.user.update.useMutation({
    onSuccess: () => {
      void refetch()
      toast.success(t('User.Toast.UpdateSuccessTitle'), {
        description: t('User.Toast.UpdateSuccessDescription'),
      })
    },
    onError: () => {
      toast.error(t('User.Toast.UpdateErrorTitle'), {
        description: t('User.Toast.UpdateErrorDescription'),
      })
    },
  })

  const columns: ColumnDef<NonNullable<typeof data>[number]>[] = [
    {
      accessorKey: 'id',
      header: () => {
        return <div className='text-xs'>{t('User.TableHeader.ID')}</div>
      },
      meta: { name: t('User.TableHeader.ID') }, // meta needed for translation
      cell: ({ row }) => {
        const value: string = row.original.id
        return <div className={cn('text-xs')}>{value}</div>
      },
    },
    {
      accessorKey: 'name',
      header: () => {
        return <div className='text-xs'>{t('User.TableHeader.Name')}</div>
      },
      meta: { name: t('User.TableHeader.Name') }, // meta needed for translation
      cell: ({ row }) => {
        const value: string = row.original.name ?? ''
        return <div className={cn('text-xs')}>{value}</div>
      },
    },
    {
      accessorKey: 'email',
      header: () => {
        return <div className='text-xs'>{t('User.TableHeader.Email')}</div>
      },
      meta: { name: t('User.TableHeader.Email') }, // meta needed for translation
      cell: ({ row }) => {
        const value = row.original.email ?? ''
        return <div className={cn('text-xs')}>{value}</div>
      },
    },
    {
      accessorKey: 'notificationsEnabled',
      header: () => {
        return (
          <div className='text-xs'>{t('User.TableHeader.Notifications')}</div>
        )
      },
      meta: { name: t('User.TableHeader.Notifications') }, // meta needed for translation
      cell: ({ row }) => {
        const value = row.original.notificationsEnabled
          ? t('UI.Table.Yes')
          : t('UI.Table.No')
        return <div className={cn('text-xs')}>{value}</div>
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      meta: { excludeFromCsv: true },
      cell: ({ row }) => {
        const user = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='h-8 w-8 p-0'>
                <span className='sr-only'>{t('User.Button.OpenMenu')}</span>
                <DotsHorizontalIcon className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                onClick={() => {
                  setOpenEditUser(true)
                  form.reset({
                    ...user,
                    name: user.name ?? '',
                    emailVerified: user.emailVerified ?? undefined,
                    password: user.password ?? '',
                  })
                }}
              >
                {t('User.Button.Edit')}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
  const form = useForm<z.infer<typeof formSchema>>({
    // resolver: zodResolver(formSchema),
  })
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })
    void updateUser({
      id: values.id!,
      name: values.name ?? t('User.DefaultName'),
    })
    setOpenEditUser(false)
    form.reset({})
  }

  return (
    <div className='container'>
      <Dialog open={openEditUser} onOpenChange={(val) => setOpenEditUser(val)}>
        <DialogTrigger asChild>
          {/* <Button onClick={() => setOpenEditUser(true)} className='h-8'>
            {t('User.Button.EditUser')}
          </Button> */}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t('User.Dialog.EditUserTitle')}</DialogTitle>
            <DialogDescription>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className='flex flex-col gap-y-4'
                >
                  <div className='grid grid-cols-1 gap-4'>
                    <ControlledInput
                      control={form.control}
                      name={'name'}
                      label={t('User.InputLabel.Name')}
                    />
                  </div>
                  <div className='flex w-full justify-center'>
                    <Button type='submit' className='w-32'>
                      {t('User.Button.Save')}
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <MDTable columns={columns} data={data ?? []} downloadCSV={downloadCSV} />
    </div>
  )
}

export default UsersTable
