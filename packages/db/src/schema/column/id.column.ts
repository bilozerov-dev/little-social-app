import { sql } from "drizzle-orm";
import { bigint } from "drizzle-orm/pg-core";

export const idColumns = {
  id: bigint({ mode: "bigint" })
    .primaryKey()
    .default(sql`next_id()`),
};
