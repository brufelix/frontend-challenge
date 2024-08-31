import { ProtectedRouter } from "~/components/ui/ProtectedRouter";
import { URLS } from "~/constants/urls";
import { BasketPage } from "~/pages/Basket";

export const basketRouter = [
  {
    path: URLS.basket,
    element: <>
      <ProtectedRouter>
        <BasketPage />
      </ProtectedRouter>
    </>
  },
];
