export interface User {
    accessToken(arg0: string, accessToken: any, arg2: { httpOnly: true; secure: true; path: string; }): unknown;
    email: string;
    username: string;
    avatar: string;
  }
  