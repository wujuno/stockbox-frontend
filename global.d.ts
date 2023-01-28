import React from 'react';

declare global {
  interface DefaultProps {
    className?: string
    style?: React.CSSProperties
    children?: React.ReactNode
  }
}
