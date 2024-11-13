import Navbar from "@/components/navbar";
import { SelectionProvider } from "@/lib/context/selection";

export default function AdministratorLayout({
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
            <SelectionProvider>
              {children}
            </SelectionProvider>
        </div>
    </div>
  );
}
