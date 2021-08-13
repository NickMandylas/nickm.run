import type { NextApiRequest, NextApiResponse } from "next";
import { Strava } from "../../services/strava";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const strava = new Strava(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.CLIENT_REFRESH
  );
  await strava.init();

  res.status(200).json({ name: "Nick M" });
}
