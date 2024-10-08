import { Badge, cn } from "@nextui-org/react";
import { DollarSign, ShoppingBagIcon, } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSettings } from "~/hooks/use-settings.hook";
import { SidebarItem } from "./SideItem";
import { SidebarStyled } from "./styled";
import { URLS } from "~/constants/urls";
import { useBasket } from "~/hooks/use-basket.hook";

export const Sidebar = () => {
  const location = useLocation();
  const { hideSidebar, sidebarCollapsed, onSidebarCollapsedToggle, } = useSettings();
  const { items } = useBasket();

  const pathname = location.pathname;

  return (
    <aside
      className={cn(
        "h-screen z-50 sticky top-0 transition-width delay-100",
        hideSidebar ? "md:w-0 overflow-hidden" : ""
      )}
    >
      {sidebarCollapsed ? (
        <div
          className={SidebarStyled.Overlay()}
          onClick={onSidebarCollapsedToggle}
        />
      ) : null}

      <div className={SidebarStyled({ collapsed: sidebarCollapsed })}>
        <div className={SidebarStyled.Header()}>
          <div className="flex justify-center items-center w-full">
            <img
              className="w-10"
              alt="Frontend Challenge"
              src={`/frontend-challenge-img.png`}
            />
          </div>
        </div>

        <div className="flex flex-col justify-between h-full">
          <div className={SidebarStyled.Body()}>
            <SidebarItem
              title="Produtos"
              icon={<DollarSign />}
              isActive={pathname === "/"}
              href="/"
            />

            <SidebarItem
              title="Carrinho"
              icon={
                items.length
                  ? (
                    <Badge content={items.length || 0} color="primary">
                      <ShoppingBagIcon />
                    </Badge>
                  )
                  : <ShoppingBagIcon />
              }
              isActive={pathname === "/basket"}
              href={URLS.basket}
            />
          </div>

          <div className={SidebarStyled.Footer()}>
            <p className="text-center font-semibold">Frontend Challenge ©</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
