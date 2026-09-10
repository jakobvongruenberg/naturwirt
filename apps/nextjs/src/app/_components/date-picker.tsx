import type { ControllerRenderProps, FieldValues, Path } from 'react-hook-form'
import Image from 'next/image'
import dayjs from 'dayjs'

import { cn } from '@farmers/ui'
import { Button } from '@farmers/ui/button'
import { Calendar } from '@farmers/ui/calendar'
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from '@farmers/ui/form'
import { Popover, PopoverContent, PopoverTrigger } from '@farmers/ui/popover'

import Typography from '~/app/_components/typography'

interface PublicationDateFieldProps<T extends FieldValues> {
  field: ControllerRenderProps<T, Path<T>>
  label?: string
  description?: string
  noSelectionMessage: string
  className?: string

  convertResult?: (value: Date | undefined) => string | undefined

  convertValue?: (value: string | undefined) => Date | undefined
}

const FormDatePicker = <T extends FieldValues>({
  field,
  label,
  description,
  noSelectionMessage,
  className,
  convertResult,
  convertValue,
}: PublicationDateFieldProps<T>) => (
  <FormItem className={className}>
    {label ? (
      <FormLabel>
        <Typography type='large'>{label}</Typography>
      </FormLabel>
    ) : null}
    {description ? (
      <FormDescription>
        <Typography type='small' className='my-5 flex items-center text-[18px]'>
          {description}
        </Typography>
      </FormDescription>
    ) : null}
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            type='button'
            variant={'outline'}
            className={cn(
              'h-[42px] w-[250px] pl-3 text-left font-normal',
              !field.value && 'text-muted-foreground',
            )}
          >
            {field.value ? (
              dayjs(field.value).format('DD, MMM YYYY')
            ) : (
              <span>{noSelectionMessage}</span>
            )}
            <Image
              src={'/images/icons/calendar-tearoff.svg'}
              alt=''
              width={32}
              height={32}
              className='ml-auto'
            />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={convertValue ? convertValue(field.value) : field.value}
          onSelect={(e) => {
            return field.onChange(convertResult ? convertResult(e) : e)
          }}
          // disabled={(date) => date < dayjs().subtract(1, 'day').toDate()}
          initialFocus
        />
      </PopoverContent>
    </Popover>
    <FormMessage />
  </FormItem>
)

export default FormDatePicker
