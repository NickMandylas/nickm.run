import axios from "axios";

export class Strava {
  public clientId: string;
  private accessToken: string | null = null;
  private clientSecret: string;
  private refreshToken: string;

  constructor(clientId: string, clientSecret: string, refreshToken: string) {
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
      throw Error("Unable to get strava access token");
    }
  };

  private getStravaAccessToken = async (
    client_id: string,
    client_secret: string,
    refresh_token: string
  ): Promise<string | null> => {
    const strava_res = await axios.post(
      "https://www.strava.com/api/v3/oauth/token",
      {
        client_id: client_id,
        client_secret: client_secret,
        refresh_token: refresh_token,
        grant_type: "refresh_token",
      }
    );

    return strava_res.data["access_token"];
  };

  public getActivities = async () => {};
}
