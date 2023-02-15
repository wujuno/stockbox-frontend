import React from 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_VERSION: string;
      CACHE_UUID: string;
      COOKIE_SECRET: string;
      HOST?: string;
      BACKEND_PORT?: string;
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

  interface TokenCookie {
    accessToken?: string;
    refreshToken?: string;
  }
}
