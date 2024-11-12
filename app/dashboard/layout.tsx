import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col md:flex-col md:overflow-hidden">
        <div className="w-full flex-none md:w-full">
          <Navbar />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            {children}
        </div>
    </div>
  );
}
