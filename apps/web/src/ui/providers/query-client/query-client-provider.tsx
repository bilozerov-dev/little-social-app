"use client";

import { QueryClientProvider as RTKQueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/lib/query/client";
import type * as React from "react";

export default function QueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = queryClient();

  return (
    <RTKQueryClientProvider client={client}>
      {children}
      <ReactQueryDevtools />
    </RTKQueryClientProvider>
  );
}
