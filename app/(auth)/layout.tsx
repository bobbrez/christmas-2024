import RootLayout from "@/components/Layouts/RootLayout";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <RootLayout>{children}</RootLayout>;
};

export default AuthLayout;
