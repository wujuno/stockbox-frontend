import React from 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_VERSION: string;
      CACHE_UUID: string;
      COOKIE_SECRET: string;
      HOST?: string;
      BACKEND_PORT?: string;
      DEV_API_URL?: string;
      NCP_ACCESS_KEY?: string;
      NCP_SECRET_KEY?: string;
      NCP_SMS_SERVICE_ID?: string;
      NCP_SMS_PHONE?: string;
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
