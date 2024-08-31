/**
 * Componente Col.
 *
 * Props:
 *   - colSpan: Define a largura da coluna em porcentagem em relação ao espaço total disponível. Por padrão, uma coluna ocupa 100% do espaço disponível.
 *   - className: Uma classe CSS opcional para estilizar a coluna.
 *   - children: Conteúdo da coluna.
 *
 * Exemplo de uso:
 *
 * ```tsx
 * <Row>
 *  <Col colSpan={2}>
 *    Conteúdo da coluna
 *  </Col>
 * </Row>
 * ```
 *
 * Neste exemplo, a coluna ocuparia 50% do espaço disponível, pois 100 / 2 = 50.
 */

import { cn } from '@nextui-org/react';
import React, { ReactNode } from 'react';

interface ColProps {
  colSpan?: number;
  className?: string;
  children: ReactNode;
}

export const Col: React.FC<ColProps> = ({ children, className = '', colSpan = 1 }) => {
  const calc = Math.ceil(100 / colSpan);
  return (
    <div className={cn(`px-1 w-full lg:w-[${calc}%] xl:w-[${calc}%]`, className)}>{children}</div>
  );
};
