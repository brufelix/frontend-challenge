import { cn } from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface RowProps {
  className?: string;
  children: ReactNode;
}

export const Row: React.FC<RowProps> = ({ children, className }) => {
  return (
    <div className={cn('flex flex-col gap-3 mb-5 w-full lg:flex-row xl:flex-row', className)}>
      {children}
    </div>
  );
};
