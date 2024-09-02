import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ProtectedRouter } from '../ProtectedRouter';

jest.mock('~/components/structures/Layout', () => ({
  Layout: ({ children }: { children: any }) => <div data-testid="layout">{children}</div>,
}));

describe('ProtectedRouter Component', () => {
  it('should render children inside Layout', () => {
    render(
      <ProtectedRouter>
        <div data-testid="child">Child Content</div>
      </ProtectedRouter>
    );

    const layoutElement = screen.getByTestId('layout');
    expect(layoutElement).toBeInTheDocument();
    expect(screen.getByTestId('child')).toBeInTheDocument();

    // Verificar que o filho está dentro do Layout
    expect(layoutElement).toContainElement(screen.getByTestId('child'));
  });

  it('should render without children', () => {
    render(<ProtectedRouter><></></ProtectedRouter>);

    const layoutElement = screen.getByTestId('layout');
    expect(layoutElement).toBeInTheDocument();

    // Não deve renderizar filhos que não foram passados
    expect(layoutElement).toBeEmptyDOMElement();
  });
});
