import React from 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_VERSION: string;
      CACHE_UUID: string;
      COOKIE_SECRET: string;
      HOST?: string;
      BACKEND_PORT?: string;
      API_URL?: string;
    }
  }

  interface Window {
    cacheUuid?: string;
  }

  interface DefaultProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
  }

  interface TokenBody {
    user_id: number;
    platform: string;
    nickname: string;
    token_type: string;
    exp: number;
    iat: number;
    jti: string;
  }

  interface TokenCookie {
    accessToken: string;
    refreshToken: string;
    autoSignin?: string;
    body: TokenBody;
  }
}
