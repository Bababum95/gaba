import { DashboardShell } from "@/components/dashboard/DashboardShell";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-hair px-6 py-4 bg-bg">
        <div className="mx-auto flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-semibold text-ink">
            Users
          </h1>
        </div>
      </header>

      <DashboardShell />
    </div>
  );
}
