import { useContext } from "react";
import { SettingsContext } from "../providers/Settings.provider";

// Hook para a configuração da sidebar
export const useSettings = () => useContext(SettingsContext);
