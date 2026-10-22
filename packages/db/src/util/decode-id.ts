// Must match next_id() in migrations/0000_id_generator.sql
const CUSTOM_EPOCH_MS = 1767225600000n; // 2026-01-01T00:00:00Z
const TIMESTAMP_SHIFT = 22n;
const SHARD_SHIFT = 10n;
const SHARD_MASK = 0xfffn; // 12 bits
const SEQ_MASK = 0x3ffn; // 10 bits

export type DecodedId = {
    createdAt: Date;
    shardId: number;
    seq: number;
};

export function decodeId(id: bigint | string): DecodedId {
    const value = BigInt(id);
    if (value < 0n) throw new RangeError(`Invalid id: ${id}`);

    return {
        createdAt: new Date(Number((value >> TIMESTAMP_SHIFT) + CUSTOM_EPOCH_MS)),
        shardId: Number((value >> SHARD_SHIFT) & SHARD_MASK),
        seq: Number(value & SEQ_MASK),
    };
}