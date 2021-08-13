declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_ID: string;
    CLIENT_SECRET: string;
    CLIENT_REFRESH: string;
  }
}

declare module "@rebass/preset";
