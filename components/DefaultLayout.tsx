import Footer from "./Footer";
import Navbar from "./Navbar";

export function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />

      <main className="flex flex-col items-center">
        <div className="flex max-w-5xl flex-col gap-20 max-sm:p-5">
          {children}
        </div>
      </main>

      <Footer />
    </div>
  );
}
