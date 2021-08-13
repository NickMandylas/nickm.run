import type { NextApiRequest, NextApiResponse } from "next";
import { Strava } from "../../services/strava";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const strava = new Strava(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CLIENT_REFRESH
  );

  await strava.init();
  const stats = await strava.getStats("26756372");

  res.setHeader("Cache-Control", "s-maxage=600");
  res.status(200).json(stats);
}
