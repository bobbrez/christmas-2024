import RootLayout from "@/components/Layouts/RootLayout";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RootLayout>{children}</RootLayout>;
}
