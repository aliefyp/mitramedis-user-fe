import { createContext, ReactNode, useContext, useEffect, useState } from "react";

const MOBILE_BREAKPOINT = 640;

export const AppContext = createContext({
  isMobile: false
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= MOBILE_BREAKPOINT);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  return (
    <AppContext.Provider value={{ isMobile }}>
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext);
}

export default useAppContext;