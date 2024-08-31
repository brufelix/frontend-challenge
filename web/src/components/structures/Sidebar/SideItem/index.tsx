import clsx from 'clsx';
import React from 'react';
import { Link } from 'react-router-dom';
import { useSettings } from '~/hooks/use-settings.hook';

interface Props {
  title: string;
  href?: string;
  isActive?: boolean;
  noLink?: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const SidebarItem = ({ icon, title, isActive, noLink, href = '', onClick }: Props) => {
  const { onSidebarCollapsedToggle } = useSettings();

  const handleClick = () => {
    if (window.innerWidth < 768) {
      onSidebarCollapsedToggle();
    }
  };

  return noLink ? (
    <button className="text-default-900 active:bg-none max-w-full" onClick={onClick}>
      <div
        onClick={handleClick}
        className={clsx(
          isActive ? 'bg-primary-100 text-primary-700 font-semibold' : 'hover:bg-default-100',
          'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]'
        )}
      >
        {icon}
        <span>{title}</span>
      </div>
    </button>
  ) : (
    <Link to={href} className="text-default-900 active:bg-none max-w-full">
      <div
        onClick={handleClick}
        className={clsx(
          isActive ? 'bg-primary-100 text-primary-700 font-semibold' : 'hover:bg-default-100',
          'flex gap-2 w-full min-h-[44px] h-full items-center px-3.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98]'
        )}
      >
        {icon}
        <span>{title}</span>
      </div>
    </Link>
  );
};