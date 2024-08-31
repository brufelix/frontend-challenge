import { cn } from "@nextui-org/react";
import { DollarSign, } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSettings } from "~/hooks/use-settings.hook";
import { SidebarItem } from "./SideItem";
import { SidebarStyled } from "./styled";

export const Sidebar = () => {
  const location = useLocation();
  const {
    hideSidebar,
    sidebarCollapsed,
    onSidebarCollapsedToggle,
  } = useSettings();

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
          </div>

          <div className={SidebarStyled.Footer()}>
            <p className="text-center font-semibold">Frontend Challenge ©</p>
          </div>
        </div>
      </div>
    </aside>
  );
};
