"use client";

import type { ReactElement } from "react";

import { useUsersState } from "@/hooks/useUsersState";
import { useUsersQuery } from "@/hooks/useUsersQuery";

import { StatsStrip } from "./StatsStrip";
import { Toolbar } from "./Toolbar";
import { UsersTable } from "./UsersTable";
import { UsersGrid } from "./UsersGrid";
import { Pagination } from "./Pagination";

export function DashboardShell(): ReactElement {
  const [state, actions] = useUsersState();
  const { data, isLoading, isError } = useUsersQuery(state);

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
        onQChange={actions.setQuery}
        onFilterChange={actions.setFilter}
        onFilterClear={actions.clearFilter}
        onSortChange={actions.setSort}
        onOrderChange={actions.setOrder}
        onViewChange={actions.setView}
      />

      {isError && (
        <div className="px-6 py-12 text-center" role="alert">
          <p className="font-mono text-sm text-accent">
            Failed to load users. Please try again.
          </p>
        </div>
      )}

      {!isError && (
        <>
          <main id="main-content" className="min-h-[400px]">
            {state.view === "table" ? (
              <UsersTable users={users} isLoading={isLoading} query={state.q} />
            ) : (
              <UsersGrid users={users} isLoading={isLoading} query={state.q} />
            )}
          </main>

          <Pagination
            page={state.page}
            limit={state.limit}
            total={total}
            onPageChange={actions.setPage}
            onLimitChange={actions.setLimit}
          />
        </>
      )}
    </>
  );
}
