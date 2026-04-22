import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Users Dashboard",
  description: "Browse and explore user profiles from DummyJSON",
};

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-[var(--hair)] px-6 py-4 bg-[var(--bg)]">
        <div className="max-w-screen-2xl mx-auto flex items-baseline gap-3">
          <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">
            Users
          </h1>
          <span className="font-mono text-xs text-[var(--ink-mute)]">
            dummyjson.com
          </span>
        </div>
      </header>

      <DashboardShell />
    </div>
  );
}
