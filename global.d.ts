import React from 'react';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_VERSION?: string
    }
  }

  interface Window {
    frontendVersion?: string
  }

  interface DefaultProps {
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
  }
}
