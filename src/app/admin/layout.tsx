import { AdminSidebar } from "@/components/admin/AdminSidebar"
import { AdminTopbar } from "@/components/admin/AdminTopbar"
import { ThemeProvider } from "@/components/theme-provider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider defaultTheme="light" storageKey="admin-theme">
      <div className="min-h-screen bg-background transition-colors duration-300">
        <AdminSidebar />

        {/* Main Content Area — sidebar offset */}
        <div className="lg:pl-[260px]">
          <AdminTopbar />

          <main className="relative">
            <div className="min-h-[calc(100vh-4rem)]">
              <div className="p-5 md:p-7 lg:p-8">
                <div className="max-w-[1600px] mx-auto">
                  {children}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
