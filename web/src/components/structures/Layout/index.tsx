import { Header } from "../Header";
import { Sidebar } from "../Sidebar";
import { PropsWithChildren } from "react";
import { SettingsProvider } from "~/providers/Settings.provider";

export const Layout = ({ children }: PropsWithChildren) => {
  return (
    <SettingsProvider>
      <section className="flex w-full h-full dark:bg-zinc-950">
        <Sidebar />
        <Header>
          {children}
        </Header>
      </section>
    </SettingsProvider>
  );
};
