import Navbar from "@/components/navbar";
import DialogUpdatePassword from "@/lib/actions/DialogUpdatePassword";
import { SelectionProvider } from "@/lib/context/selection";

export default function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex h-screen flex-col md:flex-col md:overflow-hidden">
            <SelectionProvider>
        <div className="w-full flex-none md:w-full">
          <Navbar />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
              {children}
        </div>
          <DialogUpdatePassword/>
            </SelectionProvider>
    </div>
  );
}
