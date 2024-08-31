import { ProtectedRouter } from "~/components/ui/ProtectedRouter";
import { URLS } from "~/constants/urls";
import { DashboardPage } from "~/pages/Dashboard";

export const dashboardRouter = [
  {
    path: URLS.dashboard,
    element: <>
      <ProtectedRouter>
        <DashboardPage />
      </ProtectedRouter>
    </>
  },
];
