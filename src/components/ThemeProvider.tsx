import React, { createContext, useContext } from 'react';

const ThemeContext = createContext({});

export const ThemeProvider = ({
  theme,
  children,
}: {
  theme: any;
  children: React.ReactNode;
}) => {
  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
