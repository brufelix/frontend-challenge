import { createBrowserRouter } from "react-router-dom";
import { dashboardRouter } from "./dashboard.router";

export const router = createBrowserRouter([
  ...dashboardRouter,
]);
