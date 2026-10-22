import { timestamp } from "drizzle-orm/pg-core";

export const timestampColumns = {
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp(),
  deleted_at: timestamp(),
};
