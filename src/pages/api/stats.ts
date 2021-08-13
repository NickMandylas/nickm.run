import type { NextApiRequest, NextApiResponse } from "next";
import { Strava } from "../../services/strava";
import rateLimit from "../../utils/rate-limit";

const limiter = rateLimit(60, 500);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const strava = new Strava(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CLIENT_REFRESH
  );

  try {
    await limiter.check(res, 5, "STATS_LIMIT");

    await strava.init();
    const stats = await strava.getStats("26756372");

    res.status(200).json(stats);
  } catch {
    res.status(429).json({ error: "Rate Limited!" });
  }
}
