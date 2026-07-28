import DashboardLayout from "@/components/layout/dashboard-layout";

export default function TouristLayout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout role="tourist">{children}</DashboardLayout>;
}
