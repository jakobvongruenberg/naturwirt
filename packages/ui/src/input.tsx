import type { Control, Path } from 'react-hook-form'
import * as React from 'react'

import { cn } from '.'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './form'

type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

const ControlledInput = <T extends Record<string, unknown>>({
  control,
  name,
  label,
  description,
  hidden,
  ...otherInputProps
}: {
  control: Control<T>
  name: Path<T>
  label: string
  description?: string
  hidden?: boolean
} & InputProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn({
            hidden: hidden,
          })}
        >
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {/* @ts-expect-error -- react-hook-form */}
            <Input {...field} {...otherInputProps} />
          </FormControl>
          {description ? (
            <FormDescription>{description}</FormDescription>
          ) : null}
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export { ControlledInput, Input }
