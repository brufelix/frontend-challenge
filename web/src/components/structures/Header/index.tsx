import React from 'react';
import { useTheme } from '~/hooks/use-theme.hook';
import { useSettings } from '~/hooks/use-settings.hook';
import { Button, Navbar, NavbarContent } from '@nextui-org/react';
import { Menu, Moon, PanelLeftClose, PanelRightClose, Sun } from 'lucide-react';

interface Props {
  children: React.ReactNode;
}

export const Header = ({ children }: Props) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { hideSidebar, onSidebarCollapsedToggle, onHideSidebarToggle } = useSettings();

  return (
    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Navbar isBordered className="w-full" classNames={{ wrapper: 'w-full max-w-full' }}>
        <NavbarContent className="md:hidden">
          <Button isIconOnly variant="light" onClick={onSidebarCollapsedToggle}>
            <Menu />
          </Button>
        </NavbarContent>

        <NavbarContent className="w-full max-md:hidden">
          <Button isIconOnly variant="light" onClick={onHideSidebarToggle}>
            {hideSidebar ? <PanelRightClose /> : <PanelLeftClose />}
          </Button>
        </NavbarContent>

        <NavbarContent justify="end" className="w-fit data-[justify=end]:flex-grow-0">
          <NavbarContent>
            <Button isIconOnly variant="light" size="md" type="button" onClick={toggleTheme}>
              {isDarkMode ? <Sun size={24} /> : <Moon size={24} />}
            </Button>
          </NavbarContent>
        </NavbarContent>
      </Navbar>

      <main className="p-4 min-h-[89vh]">
        <div className=" p-4 h-full">{children}</div>
      </main>
    </div>
  );
};
