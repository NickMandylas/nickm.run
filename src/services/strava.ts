import axios from "axios";

export class Strava {
  public clientId: string;
  private accessToken: string | null = null;
  private clientSecret: string;
  private refreshToken: string;

  constructor(clientId: string, clientSecret: string, refreshToken: string) {
    if (clientId === null || clientSecret === null || refreshToken === null) {
      // To remind me to set env variables in production.
      throw Error("Error - Did not set ENV variables.");
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.refreshToken = refreshToken;
  }

  public init = async (): Promise<Error | void> => {
    this.accessToken = await this.getStravaAccessToken(
      this.clientId,
      this.clientSecret,
      this.refreshToken
    );

    if (this.accessToken === null) {
      throw Error("Error - Unable to get strava access token!");
    }
  };

  private getStravaAccessToken = async (
    client_id: string,
    client_secret: string,
    refresh_token: string
  ): Promise<string | null> => {
    const res = await axios.post("https://www.strava.com/api/v3/oauth/token", {
      client_id: client_id,
      client_secret: client_secret,
      refresh_token: refresh_token,
      grant_type: "refresh_token",
    });

    return res.data["access_token"];
  };

  public getActivities = async (offset: string): Promise<any> => {
    const res = await axios.get(
      "https://www.strava.com/api/v3/athlete/activities",
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
        params: { page: offset, per_page: 100 },
      }
    );

    return res.data;
  };

  public getAthlete = async (): Promise<any> => {
    const res = await axios.get("https://www.strava.com/api/v3/athlete", {
      headers: { Authorization: `Bearer ${this.accessToken}` },
    });

    return res.data;
  };

  public getStats = async (athleteId: string): Promise<any> => {
    const res = await axios.get(
      `https://www.strava.com/api/v3/athletes/${athleteId}/stats`,
      {
        headers: { Authorization: `Bearer ${this.accessToken}` },
      }
    );

    return res.data;
  };
}
