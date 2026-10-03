import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import r2IncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache";
import doQueue from "@opennextjs/cloudflare/overrides/queue/do-queue";
import doShardedTagCache from "@opennextjs/cloudflare/overrides/tag-cache/do-sharded-tag-cache";

// ISR needs three pieces: a place to store rendered pages (R2), a queue that re-renders stale pages
// in the background (Durable Object), and a tag store that makes revalidatePath effective (Durable Object).
export default defineCloudflareConfig({
  incrementalCache: r2IncrementalCache,
  queue: doQueue,
  // Traffic is tiny, so a single shard (one Durable Object instance) is enough.
  tagCache: doShardedTagCache({ baseShardSize: 1 }),
});
