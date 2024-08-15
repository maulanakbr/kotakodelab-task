export interface StaffLayoutProps {
  children: React.ReactNode;
}

export default function StaffLayout({ children }: StaffLayoutProps) {
  return (
    <div>
      <h1>This Is Staff Layout From UI</h1>
      {children}
    </div>
  );
}
