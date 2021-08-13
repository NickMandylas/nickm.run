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
    await limiter.check(res, 15, "ACTIVITY_LIMIT");

    await strava.init();
    const { offset } = req.query;
    const activities = await strava.getActivities(offset as string);

    res.setHeader("Cache-Control", "s-maxage=600");
    res.status(200).json(activities);
  } catch {
    res.status(429).json({ error: "Rate Limited!" });
  }
}
