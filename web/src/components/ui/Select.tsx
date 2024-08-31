import { forwardRef } from 'react';
import { useTheme } from '~/hooks/use-theme.hook';
import { SelectProps, Select, cn } from '@nextui-org/react';

interface Props extends SelectProps {
  emptyContent?: string;
}

export const SelectCustom = forwardRef<HTMLSelectElement, Props>(
  ({ children, emptyContent = 'Nenhuma opção encontrada.', ...props }, ref) => {
    const { isDarkMode } = useTheme();

    return (
      <Select
        {...props}
        ref={ref}
        listboxProps={{ emptyContent }}
        className={cn(props.className, isDarkMode ? 'dark' : 'light')}
        classNames={{ popoverContent: isDarkMode ? 'bg-zinc-900 text-zinc-400' : '' }}
      >
        {children}
      </Select>
    );
  }
);