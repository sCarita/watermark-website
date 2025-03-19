import ProtectedRoute from '@/components/ProtectedRoute'
import { TopNavbar } from './dashboard/components/TopNavbar'
import { Toaster } from '@/components/ui/sonner'

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen flex-col overflow-hidden bg-slate-900 text-slate-100">
        <TopNavbar />
        {children}
        <Toaster />
      </div>
    </ProtectedRoute>
  )
}
