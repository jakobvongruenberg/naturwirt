export interface ForgotPasswordLayoutProps {
  children: React.ReactNode
}

export default function ForgotPasswordLayout({
  children,
}: ForgotPasswordLayoutProps) {
  return (
    <>
      <div>{children}</div>
    </>
  )
}
