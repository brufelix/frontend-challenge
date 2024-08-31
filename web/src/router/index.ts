import { createBrowserRouter } from "react-router-dom";
import { dashboardRouter } from "./dashboard.router";
import { basketRouter } from "./basket.router";

export const router = createBrowserRouter([
  ...dashboardRouter,
  ...basketRouter,
]);
