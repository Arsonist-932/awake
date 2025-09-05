import QueryProvider from "@/services/queryProvider";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryProvider>
      <main className="min-h-screen">{children} </main>;
    </QueryProvider>
  );
}
