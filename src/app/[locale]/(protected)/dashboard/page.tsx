'use client'

import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function Dashboard() {
  return (
    <>
      <Header />
      <div>
        <h1>Dashboard</h1>
        <p>This is a protected page. Only signed-in users can see this.</p>
      </div>
      <Footer />
    </>
  )
}
