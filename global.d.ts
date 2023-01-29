import React from 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_VERSION?: string
      CACHE_UUID?: string
    }
  }

  interface Window {
    cacheUuid?: string
  }

  interface DefaultProps {
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
  }
}
