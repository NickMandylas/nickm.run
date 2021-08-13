import { NextApiResponse } from "next";
import LRU from "lru-cache";

const rateLimit = (interval = 60, uniqueTokenPerInterval = 500) => {
  const cache: LRU<any, any> = new LRU({
    max: uniqueTokenPerInterval,
    maxAge: interval * 1000, // convert to seconds.
  });

  return {
    check: (res: NextApiResponse, limit: number, token: string) =>
      new Promise<void>((resolve, reject) => {
        const tokenCount = cache.get(token) || [0];
        if (tokenCount[0] === 0) {
          cache.set(token, tokenCount);
        }
        tokenCount[0] += 1;

        const currentUsage = tokenCount[0];
        const isRateLimited = currentUsage >= limit;
        res.setHeader("X-RateLimit-Limit", limit);
        res.setHeader(
          "X-RateLimit-Remaining",
          isRateLimited ? 0 : limit - currentUsage
        );

        return isRateLimited ? reject() : resolve();
      }),
  };
};

export default rateLimit;
