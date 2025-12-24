'use client';

import { useTheme } from '../lib/themes';

export default function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-all duration-500 bg-gradient-to-b ${theme.colors.background} ${theme.colors.text} ${theme.styles.fontBody}`}>
      {children}
    </div>
  );
}
