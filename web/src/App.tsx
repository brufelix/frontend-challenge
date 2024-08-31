import { NextUIProvider, cn } from "@nextui-org/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useTheme } from "./hooks/use-theme.hook.ts";
import { I18nProvider } from "@react-aria/i18n";
import { router } from "./router/index.ts";

export const App = () => {
  const { isDarkMode } = useTheme();

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <NextUIProvider>
        <I18nProvider locale="pt-BR">
          <div
            className={cn(
              "text-foreground bg-background",
              isDarkMode ? "dark " : "light "
            )}
          >
            <RouterProvider router={router} />
            <ToastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </div>
        </I18nProvider>
      </NextUIProvider>
    </QueryClientProvider>
  );
};
