import { useContext } from "react";
import { SettingsContext } from "../providers/Settings.provider";

export const useSettings = () => useContext(SettingsContext);
