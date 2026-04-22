"use client";

import { useCallback } from "react";
import { useUsersState } from "@/hooks/useUsersState";
import { useUsersQuery } from "@/hooks/useUsersQuery";
import type { FilterKey, SortKey, SortOrder, ViewMode } from "@/lib/types";
import StatsStrip from "./StatsStrip";
import Toolbar from "./Toolbar";
import UsersTable from "./UsersTable";
import UsersGrid from "./UsersGrid";
import Pagination from "./Pagination";

export default function DashboardShell() {
  const [state, setState] = useUsersState();

  const { data, isLoading, isError } = useUsersQuery({
    q: state.q,
    filterKey: state.filterKey,
    filterValue: state.filterValue,
    sortBy: state.sortBy,
    order: state.order,
    page: state.page,
    limit: state.limit,
  });

  const handleQChange = useCallback(
    (q: string) => setState({ q, page: 1 }),
    [setState],
  );

  const handleFilterChange = useCallback(
    (key: FilterKey, value: string) =>
      setState({ filterKey: key, filterValue: value, page: 1 }),
    [setState],
  );

  const handleFilterClear = useCallback(
    () => setState({ filterKey: "", filterValue: "", page: 1 }),
    [setState],
  );

  const handleSortChange = useCallback(
    (sortBy: SortKey) => setState({ sortBy, page: 1 }),
    [setState],
  );

  const handleOrderChange = useCallback(
    (order: SortOrder) => setState({ order, page: 1 }),
    [setState],
  );

  const handleViewChange = useCallback(
    (view: ViewMode) => setState({ view }),
    [setState],
  );

  const handlePageChange = useCallback(
    (page: number) => setState({ page }),
    [setState],
  );

  const handleLimitChange = useCallback(
    (limit: number) => setState({ limit, page: 1 }),
    [setState],
  );

  const users = data?.users ?? [];
  const total = data?.total ?? 0;

  return (
    <>
      <StatsStrip />
      <Toolbar
        q={state.q}
        filterKey={state.filterKey}
        filterValue={state.filterValue}
        sortBy={state.sortBy}
        order={state.order}
        view={state.view}
        onQChange={handleQChange}
        onFilterChange={handleFilterChange}
        onFilterClear={handleFilterClear}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
        onViewChange={handleViewChange}
      />

      {isError && (
        <div className="px-6 py-12 text-center">
          <p className="font-mono text-sm text-[var(--accent)]">
            Failed to load users. Please try again.
          </p>
        </div>
      )}

      {!isError && (
        <>
          <main id="main-content" className="min-h-[400px]">
            {state.view === "table" ? (
              <UsersTable
                users={users}
                isLoading={isLoading}
                query={state.q}
              />
            ) : (
              <UsersGrid
                users={users}
                isLoading={isLoading}
                query={state.q}
              />
            )}
          </main>

          <Pagination
            page={state.page}
            limit={state.limit}
            total={total}
            onPageChange={handlePageChange}
            onLimitChange={handleLimitChange}
          />
        </>
      )}
    </>
  );
}
