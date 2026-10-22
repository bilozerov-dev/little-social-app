-- Custom SQL migration file, put your code below! --
CREATE SEQUENCE IF NOT EXISTS global_id_seq;

CREATE OR REPLACE FUNCTION next_id(OUT result bigint) AS $$
DECLARE
    custom_epoch     bigint:= 1767225600000; -- 2026-01-01T00:00:00Z in ms
    shard_id         int   := 1;             -- hardcoded: one shard for now
    seq_id           bigint;
    now_ms           bigint;
BEGIN
    seq_id := nextval('global_id_seq') % 1024;
    now_ms := floor(extract(epoch FROM clock_timestamp()) * 1000);

    result := (now_ms - custom_epoch) << 22;
    result := result | (shard_id << 10);
    result := result | seq_id;
END;
$$ LANGUAGE plpgsql;