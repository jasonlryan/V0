import React, { createContext, useContext, useState } from "react";

interface NavigationContextType {
  showAccessModal: boolean;
  setShowAccessModal: (show: boolean) => void;
}

const NavigationContext = createContext<NavigationContextType>(
  {} as NavigationContextType
);

export function NavigationProvider({ children }) {
  const [showAccessModal, setShowAccessModal] = useState(false);

  return (
    <NavigationContext.Provider value={{ showAccessModal, setShowAccessModal }}>
      {children}
      {/* Access Modal will be rendered here */}
    </NavigationContext.Provider>
  );
}

export const useNavigation = () => useContext(NavigationContext);
