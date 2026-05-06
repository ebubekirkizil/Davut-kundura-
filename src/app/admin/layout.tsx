import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminTopbar } from "@/components/admin/AdminTopbar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/20">
      {/* Background Pattern */}
      <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23f1f5f9" fill-opacity="0.4"%3E%3Ccircle cx="7" cy="7" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30" />

      <AdminSidebar />

      {/* Main Content Area */}
      <div className="lg:pl-72">
        <AdminTopbar />

        {/* Content Container */}
        <main className="relative">
          {/* Content Background */}
          <div className="min-h-[calc(100vh-4rem)] bg-white/60 backdrop-blur-sm border-l border-white/20 shadow-xl shadow-slate-200/20">
            <div className="p-6 md:p-8 lg:p-10">
              {/* Content Wrapper with Glass Effect */}
              <div className="relative">
                {children}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Floating Elements */}
      <div className="fixed top-20 right-8 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="fixed bottom-20 left-80 w-24 h-24 bg-gradient-to-br from-amber-400/10 to-orange-400/10 rounded-full blur-2xl animate-pulse delay-1000" />
    </div>
  )
}
