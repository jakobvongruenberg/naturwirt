export interface ForgotPasswordLayoutProps {
  children: React.ReactNode
}

export default function ForgotPasswordLayout({
  children,
}: ForgotPasswordLayoutProps) {
  return (
    <div className=' flex min-h-screen flex-col justify-center bg-gray-200 py-12  lg:px-6 lg:px-8'>
      <div className='mx-4 rounded-lg bg-white px-4 py-8 shadow lg:mx-auto lg:w-full lg:max-w-md lg:px-10'>
        {children}
      </div>
    </div>
  )
}
