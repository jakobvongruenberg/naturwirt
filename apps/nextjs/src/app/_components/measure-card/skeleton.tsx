import { cn } from '@farmers/ui'
import { Skeleton } from '@farmers/ui/skeleton'

const MeasureSkeleton = ({
  className,
  ...rest
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <Skeleton
      className={cn(
        'flex min-h-[330px] max-w-[330px] flex-col justify-between border-2 bg-white p-4',
        className,
      )}
      {...rest}
    >
      <div className='flex flex-col justify-between gap-3'>
        <div className='flex flex-row items-start justify-between'>
          <div className='flex flex-col gap-3'>
            <Skeleton className='h-[20px] w-[80px]' />
            <Skeleton className='h-[30px] w-[200px]' />
          </div>
          <Skeleton className='h-[50px] w-[50px]' />
        </div>
        <Skeleton className='h-[20px] w-full' />
        <div className='flex flex-row flex-wrap gap-4'>
          <Skeleton className='h-[20px] w-[120px]' />
          <Skeleton className='h-[20px] w-[120px]' />
          <Skeleton className='h-[20px] w-[120px]' />
          <Skeleton className='h-[20px] w-[120px]' />
        </div>
      </div>
      <div className='flex flex-row items-end justify-between'>
        <Skeleton className='h-[30px] w-[140px]' />
        <Skeleton className='h-[30px] w-[90px]' />
      </div>
    </Skeleton>
  )
}

export default MeasureSkeleton
