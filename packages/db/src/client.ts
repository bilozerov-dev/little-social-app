import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool, type PoolConfig } from 'pg';
import * as schema from './schema/index.ts';

export function createDb(connectionString: string, poolConfig: PoolConfig = {}) {
  // Each Postgres connection is a backend process, so keep the per-instance pool small
  const pool = new Pool({ connectionString, max: 10, ...poolConfig });
  const db = drizzle({ client: pool, schema, casing: 'snake_case' });
  return { db, pool };
}

export type Db = ReturnType<typeof createDb>['db'];
