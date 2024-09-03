import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useQuery } from '@tanstack/react-query';
import { useBasket } from '~/hooks/use-basket.hook';
import { DashboardPage } from '../Dashboard'; // ajuste o caminho conforme necessário

jest.mock('@tanstack/react-query');
jest.mock('~/hooks/use-basket.hook', () => ({
  useBasket: jest.fn(),
}));

jest.mock('@nextui-org/react', () => ({
  Spinner: () => <div data-testid="spinner">Loading...</div>,
}));

// Mock do componente Card
jest.mock('~/components/ui/Card', () => ({
  Card: ({ id, description, price, title, image }: { id: string, description: string, price: string, title: string, image: string }) => (
    <div data-testid={`product-${id}`}>
      <p>{title}</p>
      <p>{description}</p>
      <p>{price}</p>
      <img src={image} alt={title} />
    </div>
  ),
}));

describe('DashboardPage Component', () => {
  beforeEach(() => {
    (useBasket as jest.Mock).mockReturnValue({
      items: [],
    });

    (useQuery as jest.Mock).mockReturnValue({
      data: [],
      isFetching: false,
      isLoading: false,
      isPending: false,
    });
  });

  it('should render spinner when loading', () => {
    (useQuery as jest.Mock).mockReturnValue({
      isFetching: true,
      isLoading: true,
      isPending: false,
    });

    render(<DashboardPage />);
    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('should render products that are not in the basket', () => {
    const mockProducts = [
      {
        id: 1,
        title: 'Produto 1',
        description: 'Descrição do Produto 1',
        price: 100,
        image: 'url/to/image1.jpg',
      },
      {
        id: 2,
        title: 'Produto 2',
        description: 'Descrição do Produto 2',
        price: 200,
        image: 'url/to/image2.jpg',
      },
    ];

    (useQuery as jest.Mock).mockReturnValue({
      data: mockProducts,
      isFetching: false,
      isLoading: false,
      isPending: false,
    });

    (useBasket as jest.Mock).mockReturnValue({
      items: [{ id: 1 }], // Produto 1 está no carrinho
    });

    render(<DashboardPage />);

    // Produto 1 não deve ser renderizado
    expect(screen.queryByTestId('product-1')).not.toBeInTheDocument();

    // Produto 2 deve ser renderizado
    expect(screen.getByTestId('product-2')).toBeInTheDocument();
    expect(screen.getByText('Produto 2')).toBeInTheDocument();
    expect(screen.getByText('Descrição do Produto 2')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByAltText('Produto 2')).toHaveAttribute('src', 'url/to/image2.jpg');
  });
});
