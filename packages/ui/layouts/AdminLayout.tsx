interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div>
      <h1>This Is Admin Layout From Packages</h1>
      {children}
    </div>
  );
}
