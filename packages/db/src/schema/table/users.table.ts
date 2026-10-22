import { check, pgTable, varchar } from "drizzle-orm/pg-core";
import { timestampColumns } from "../column/timestamp.column";
import { idColumns } from "../column/id.column";
import { sql } from "drizzle-orm";

export const users = pgTable(
  "users",
  {
    id: idColumns.id,
    username: varchar({ length: 30 }).notNull().unique(),
    ...timestampColumns,
  },
  (t) => [
    check("users_username_format", sql`${t.username} ~ '^[a-z0-9._]{1,30}$'`),
  ],
);
