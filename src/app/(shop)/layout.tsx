import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import AdminStorefrontBar from "@/components/layout/AdminStorefrontBar";

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col relative">
      <Navbar />
      <main className="flex-1 bg-background">
        {children}
      </main>
      <Footer />
      <AdminStorefrontBar />
    </div>
  );
}
