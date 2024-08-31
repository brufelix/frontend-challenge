import React, { PropsWithChildren, createContext } from "react";

interface SettingsContext {
  hideSidebar: boolean;
  sidebarCollapsed: boolean;
  onHideSidebarToggle: () => void;
  onSidebarCollapsedToggle: () => void;
}

export const SettingsContext = createContext<SettingsContext>({
  hideSidebar: false,
  sidebarCollapsed: false,
  onHideSidebarToggle: () => { },
  onSidebarCollapsedToggle: () => { },
} as SettingsContext);

export const SettingsProvider = ({ children }: PropsWithChildren) => {
  const [hideSidebar, setHideSidebar] = React.useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);

  const onSidebarCollapsedToggle = () => setSidebarCollapsed((state) => !state);
  const onHideSidebarToggle = () => setHideSidebar((state) => !state);

  return (
    <SettingsContext.Provider
      value={{
        hideSidebar,
        sidebarCollapsed,
        onHideSidebarToggle,
        onSidebarCollapsedToggle,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
