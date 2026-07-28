import DashboardLayout from "@/components/layout/dashboard-layout";

export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="driver">{children}</DashboardLayout>;
}
