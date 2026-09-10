import { Footer } from '~/app/_components/Footer/Footer'
import { Header } from '~/app/_components/Header'

export default function MainLayout(props: { children: React.ReactNode }) {
  return (
    <div className='flex min-h-screen flex-col pt-[48px] lg:pt-[80px]'>
      <Header />
      <main className='relative flex h-full min-h-screen flex-col bg-[#F9F5EE] pb-[320px] lg:pb-[400px]'>
        {props.children}
        <Footer />
      </main>
    </div>
  )
}
